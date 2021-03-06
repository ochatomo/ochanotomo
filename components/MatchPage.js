import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { globalStyles } from "../styles/globalStyle";
import { Colors } from "../styles/color";
import { generateInterestLabel } from "../utils/helper";
import { updateCustomer, createMatch } from "../src/graphql/mutations";
import { onCreateMatch } from "../src/graphql/subscriptions";
import { getLikesByCustomerID } from "../src/graphql/customQueries";
import { API, graphqlOperation } from "aws-amplify";
import { calcLocation } from "../utils/location";
import { calcCategory } from "../utils/category ";
import { calcHobby } from "../utils/hobby";
import { ScrollView } from "react-native-gesture-handler";
import Interstitial from "./ads/Interstitial";

export default function MatchPage({ navigation }) {
  const { allCustomerData, userDataInfo, matchesData, premiumData } =
    useContext(UserContext);
  const [allCustomers] = allCustomerData;
  const [userData] = userDataInfo;
  const [isPremium] = premiumData;
  const [likes, setLikes] = useState(userData.likes);
  const [currentIdx, setIdx] = useState(0);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [matches, setMatches] = matchesData;

  useEffect(() => {
    if (currentIdx % 5 === 0 && currentIdx !== 0 && !isPremium) {
      Interstitial();
    }
  }, [currentIdx]);

  useEffect(() => {
    // filter out customers whose id is already registered in the likes of currentUser
    // && also exclude youself
    const filteredCustomers = allCustomers.filter(
      (customer) =>
        !userData.likes.some((like) => like.id === customer.id) &&
        customer.id !== userData.id
    );
    const calculatedCustomers = calcScore(filteredCustomers);
    calculatedCustomers.sort((a, b) => b.score - a.score);
    setFilteredCustomers(calculatedCustomers);
  }, []);

  useEffect(() => {
    if (userData.matches !== undefined) {
      const matches = userData.matches.items.map((item, index) => {
        return {
          name: item.customer.name,
          id: item.customer.id,
          photo: item.customer.photo,
        };
      });
      setMatches(matches);
    }
    const subscription = API.graphql(graphqlOperation(onCreateMatch)).subscribe({
      next: (data) => {
        const owner_id = data.value.data.onCreateMatch.owner_id;
        if (owner_id === userData.id) {
          const matchedCustomerData = data.value.data.onCreateMatch.customer;
          const newMatch = {
            name: matchedCustomerData.name,
            id: matchedCustomerData.id,
            photo: matchedCustomerData.photo,
          };
          setMatches((matches) => [...matches, newMatch]);
          Alert.alert(
            "??????????????????????????????????????????",
            "???????????????????????????????????????????????????????????????????????????",
            [{ text: "OK" }]
          );
        }
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calcScore = (customers) => {
    const myLocation = userData.location;
    const myCategory = userData.interests[0].category;
    const myHobby = userData.interests[0].hobby;
    const customerWithScore = customers.map((customer) => {
      const locationScore = calcLocation(myLocation, customer.location);
      const customerCategory = customer.interests[0].category;
      const categoryScore = calcCategory(myCategory, customerCategory);
      const hobbyScore =
        Number(myCategory) === Number(customerCategory)
          ? calcHobby(myCategory, myHobby, customer.interests[0].hobby)
          : 0;
      const totalScore = locationScore + categoryScore + hobbyScore;
      customer.score = totalScore;
      return customer;
    });
    return customerWithScore;
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
      Alert.alert(
        "??????????????????????????????????????????",
        "???????????????????????????????????????????????????????????????????????????",
        [{ text: "OK" }]
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async (user2Info) => {
    const max = filteredCustomers.length - 1;
    if (currentIdx > max) {
      Alert.alert(
        "???????????????????????????????????????",
        "?????????????????????????????????????????????????????????????????????????????????????????????????????????",
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
    setIdx(currentIdx + 1);
  };

  const handleDislike = async (user2Info) => {
    const max = filteredCustomers.length - 1;
    if (currentIdx > max) {
      Alert.alert(
        "???????????????????????????????????????",
        "?????????????????????????????????????????????????????????????????????????????????????????????????????????",
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
    setIdx(currentIdx + 1);
  };

  const checkLike = async (user1ID, user2ID) => {
    // get likes of user2, filter by currentUserId
    const res = await API.graphql(
      graphqlOperation(getLikesByCustomerID, { id: user2ID })
    );
    const likes = res.data.getCustomer.likes;

    if (likes.length === 0) return false;
    const filteredLikes = likes.filter((like) => like.id === user1ID);
    if (filteredLikes.length === 0) return false;
    else {
      return filteredLikes[0].like;
    }
  };

  return (
    <View style={[globalStyles.viewContainer, { justifyContent: "space-evenly" }]}>
      {!isPremium && (
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <Text style={globalStyles.textLink}>??????????????????????????????????????????</Text>
        </TouchableOpacity>
      )}

      <View style={globalStyles.rightContainer}>
        <TouchableOpacity
          onPress={() => {
            // pass matches to MatchList
            navigation.navigate("MatchList", { matches: matches });
          }}
        >
          <Text style={globalStyles.label}>?????????????????????????????????</Text>
        </TouchableOpacity>
      </View>
      {filteredCustomers.length > currentIdx ? (
        <>
          <CustomerProfile customer={filteredCustomers[currentIdx]} />
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleDislike(filteredCustomers[currentIdx]);
              }}
            >
              <Text
                style={[globalStyles.textBtn, { backgroundColor: Colors.secondary2 }]}
              >
                ??????????????????
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // view my profile page
                handleLike(filteredCustomers[currentIdx]);
              }}
            >
              <Text style={[globalStyles.textBtn, { backgroundColor: Colors.primary2 }]}>
                ??????????????????
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={[globalStyles.text, { textAlign: "center" }]}>
          {`???????????????????????????????????????\n?????????????????????????????????????????????????????????`}
        </Text>
      )}
    </View>
  );
}

const CustomerProfile = ({ customer }) => {
  return (
    <View style={globalStyles.flexColumn}>
      <View
        style={[
          globalStyles.profileContainer,
          globalStyles.flexColumn,
          globalStyles.boxShadow,
          { backgroundColor: Colors.bg1 },
        ]}
      >
        <Image
          style={globalStyles.profilePhoto}
          source={{
            uri: customer.photo,
          }}
        />
        <Text style={globalStyles.header}>{customer.name}</Text>
        <View style={styles.interests}>{generateInterestLabel(customer.interests)}</View>
        <ScrollView style={styles.scrollviewContainer}>
          <Text style={globalStyles.profileText}>{customer.profileText}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollviewContainer: {
    maxHeight: "40%",
  },
  smallLabel: {
    width: 50,
  },

  name: {
    fontSize: 24,
    color: "#004DA9",
    fontWeight: "bold",
  },
  photo: {
    width: 236,
    height: 195,
    marginVertical: 5,
  },
  profileText: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary1,
  },
});
