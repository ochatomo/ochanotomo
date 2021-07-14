// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";

import { updateCustomer, createMatch } from "../src/graphql/mutations";
import { onCreateMatch } from "../src/graphql/subscriptions";
import { getLikesByCustomerID } from "../src/graphql/customQueries";
import { API, graphqlOperation } from "aws-amplify";
import { useEffect } from "react/cjs/react.development";
import { calcLocation } from "../utils/location";
import { calcCategory } from "../utils/category ";
import { calcHobby } from "../utils/hobby";

export default function MatchPage({ userInfo, setNewUser, navigation }) {
  const { allCustomerData, userDataInfo } = useContext(UserContext);
  const [allCustomers] = allCustomerData;
  const [userData] = userDataInfo;
  const [likes, setLikes] = useState(userData.likes);
  const [currentIdx, setIdx] = useState(0);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // console.log("Component loading", { allCustomers });
    // filter out customers whose id is already registered in the likes of currentUser
    // && also exclude youself

    const filteredCustomers = allCustomers.filter(
      (customer) =>
        !userData.likes.some((like) => like.id === customer.id) &&
        customer.id !== userData.id
    );
    // console.log("before calculation", filteredCustomers);

    // matching algorithmによるsorting
    // console.log({ filteredCustomers });

    const calculatedCustomers = calcScore(filteredCustomers);
    calculatedCustomers.sort((a, b) => b.score - a.score);
    // console.log("after calculation", calculatedCustomers);

    setFilteredCustomers(calculatedCustomers);
  }, []);

  useEffect(() => {
    if (userData.matches !== undefined) {
      // console.log("Matches", userData.matches.items);
      const matches = userData.matches.items.map((item) => ({
        name: item.customer.name,
        id: item.customer.id,
        photo: item.customer.photo,
      }));
      setMatches(matches);
    }
    const subscription = API.graphql(graphqlOperation(onCreateMatch)).subscribe({
      next: (data) => {
        // console.log("onCreateMatch", data);
        const owner_id = data.value.data.onCreateMatch.owner_id;
        console.log("newMatch firing with", data);
        console.log("currentState of matches", userData.matches);
        if (owner_id === userData.id) {
          console.log("updating matches");
          const matchedCustomerData = data.value.data.onCreateMatch.customer;

          const newMatch = {
            name: matchedCustomerData.name,
            id: matchedCustomerData.id,
            photo: matchedCustomerData.photo,
          };
          setMatches((matches) => [...matches, newMatch]);
        }
      },
    });

    // console.log("this is chatroom messages", chatRoomData.messages.items);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calcScore = (customers) => {
    // console.log("CALC-----", userData);
    const myLocation = userData.location; // int
    const myCategory = userData.interests[0].category; // int
    const myHobby = userData.interests[0].hobby; // int
    const customerWithScore = customers.map((customer) => {
      const locationScore = calcLocation(myLocation, customer.location);
      const customerCategory = customer.interests[0].category;

      const categoryScore = calcCategory(myCategory, customerCategory);

      const hobbyScore =
        Number(myCategory) === Number(customerCategory)
          ? calcHobby(myCategory, myHobby, customer.interests[0].hobby)
          : 0;

      const totalScore = locationScore + categoryScore + hobbyScore;
      const customerName = customer.name;
      console.log({ customerName, locationScore, categoryScore, hobbyScore, totalScore });
      customer.score = totalScore;
      return customer;
    });

    // console.log({ customerWithScore });
    return customerWithScore;
  };

  const incrementIdx = () => {
    const max = filteredCustomers.length - 1;
    if (currentIdx >= max) {
      return;
    }
    setIdx(currentIdx + 1);
  };

  const saveLike = async (user2Info, user1Preference) => {
    const newLike = { id: user2Info.id, like: user1Preference };
    // update the current likes so we don't lose the previous state
    setLikes((likes) => [...likes, newLike]);
    const query = { id: userData.id, likes: [...likes, newLike] };
    try {
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
      console.log("successfuly saved the like");
    } catch (e) {
      console.log(e);
    }
  };

  const saveMatch = async (user1ID, user2ID) => {
    try {
      const query = {
        owner_id: user1ID,
        customer_id: user2ID,
      };
      const query2 = {
        owner_id: user2ID,
        customer_id: user1ID,
      };
      console.log("creating a match with ", query, query2);
      await API.graphql(graphqlOperation(createMatch, { input: query }));
      await API.graphql(graphqlOperation(createMatch, { input: query2 }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async (user2Info) => {
    const max = filteredCustomers.length - 1;

    if (currentIdx >= max) {
      Alert.alert(
        "新しいユーザーがいません。",
        "すべてのユーザーをチェックしました。現在のお茶トモと話してみましょう。",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MatchList", { matches: matches }),
          },
        ]
      );
      return;
    }
    await saveLike(user2Info, true);
    const isMatch = await checkLike(userData.id, user2Info.id);
    console.log({ isMatch });

    // if successful match, save to the database
    if (isMatch) {
      console.log("saving match");
      await saveMatch(userData.id, user2Info.id);
    }

    incrementIdx();
  };

  const handleDislike = async (user2Info) => {
    const max = filteredCustomers.length - 1;

    if (currentIdx >= max) {
      Alert.alert(
        "新しいユーザーがいません。",
        "すべてのユーザーをチェックしました。現在のお茶トモと話してみましょう。",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MatchList", { matches: matches }),
          },
        ]
      );
      return;
    }
    await saveLike(user2Info, false);
    incrementIdx();
  };

  const checkLike = async (user1ID, user2ID) => {
    // get likes of user2, filter by currentUserId
    console.log("checking like with", user1ID, user2ID);

    const res = await API.graphql(
      graphqlOperation(getLikesByCustomerID, { id: user2ID })
    );
    const likes = res.data.getCustomer.likes;

    if (likes.length === 0) return false;
    const filteredLikes = likes.filter((like) => like.id === user1ID);
    if (filteredLikes.length === 0) return false;
    else {
      console.log("like?", filteredLikes);
      return filteredLikes[0].like;
    }
  };

  return (
    <View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            // view my profile page
          }}
        >
          <AntDesign name="leftcircle" size={50} color="#F3B614" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // view my profile page
            navigation.navigate("Profile");
          }}
        >
          <Image source={require("../assets/edit.png")} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            // pass matches to MatchList
            navigation.navigate("MatchList", { matches: matches });
          }}
        >
          <Text style={styles.label}>お茶トモをチェックする</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flexRow}>
        <View style={[styles.profileContainer, styles.flexColumn]}>
          <Image source={require("../assets/testphoto.jpeg")} style={styles.photo} />
          <Text style={styles.name}>
            {filteredCustomers.length > 0
              ? filteredCustomers[currentIdx].name
              : "全員をスワイプしました"}{" "}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleDislike(filteredCustomers[currentIdx]);
          }}
        >
          <Text style={[styles.textBtn, { backgroundColor: "#EC5E56" }]}>ちょっと……</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // view my profile page
            handleLike(filteredCustomers[currentIdx]);
          }}
        >
          <Text style={[styles.textBtn, { backgroundColor: "#27AE60" }]}>
            お茶したい！
          </Text>
        </TouchableOpacity>
      </View>

      <Text>{message !== "" && message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    paddingVertical: 20,
    backgroundColor: "white",
    width: 309,
  },
  textBtn: {
    borderRadius: 44,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    color: "#004DA9",
    fontWeight: "bold",
  },
  photo: {
    width: 236,
    height: 195,
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    marginVertical: 5,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rightContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: "#004DA9",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
    // marginHorizontal: "auto",
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 2,
    padding: 8,
    paddingHorizontal: 20,
    borderColor: "#0093ED",
    color: "#0093ED",
    fontSize: 20,
    borderRadius: 16,
  },
  inputLabel: {
    margin: 12,
    color: "#0094CE",
    fontSize: 24,
    fontWeight: "bold",
  },
  miltiInput: {
    height: 200,
    // backgroundColor: "pink",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 10,
  },
});
