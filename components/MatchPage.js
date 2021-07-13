// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { UserContext } from "../contexts/UserContext";

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
    console.log("Component loading", { allCustomers });
    // filter out customers whose id is already registered in the likes of currentUser
    // && also exclude youself

    const filteredCustomers = allCustomers.filter(
      (customer) =>
        !userData.likes.some((like) => like.id === customer.id) &&
        customer.id !== userData.id
    );

    // matching algorithmによるsorting
    console.log({ filteredCustomers });
    const calculatedCustomers = calcScore(filteredCustomers);
    calculatedCustomers.sort((a, b) => b.score - a.score);
    console.log({ calculatedCustomers });

    setFilteredCustomers(calculatedCustomers);
  }, []);

  useEffect(() => {
    console.log("Matches", userData.matches.items);
    const matches = userData.matches.items.map((item) => ({
      name: item.customer.name,
      id: item.customer.id,
      photo: item.customer.photo,
    }));
    setMatches(matches);
    const subscription = API.graphql(graphqlOperation(onCreateMatch)).subscribe({
      next: (data) => {
        console.log("onCreateMatch", data);
        const matchedCustomerData = data.value.data.onCreateMatch.customer;
        const newMatch = {
          name: matchedCustomerData.name,
          id: matchedCustomerData.id,
          photo: matchedCustomerData.photo,
        };
        setMatches((matches) => [...matches, newMatch]);
      },
    });

    // console.log("this is chatroom messages", chatRoomData.messages.items);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const calcScore = (customers) => {
    const myLocation = userData.location; // int
    const myCategory = userData.interests[0].category; // int
    const myHobby = userData.interests[0].hobby; // int
    const customerWithScore = customers.map((customer) => {
      console.log(customer);
      const locationScore = calcLocation(myLocation, customer.location);
      const customerCategory = customer.interests[0].category;

      const categoryScore = calcCategory(myCategory, customerCategory);
      const hobbyScore =
        myCategory === customerCategory
          ? calcHobby(myCategory, myHobby, customer.interests[0].hobby)
          : 0;

      const totalScore = locationScore + categoryScore + hobbyScore;
      console.log({ locationScore, categoryScore, hobbyScore, totalScore });
      customer.score = totalScore;
      return customer;
    });

    console.log({ customerWithScore });
    return customerWithScore;
  };

  const incrementIdx = () => {
    const max = filteredCustomers.length - 1;
    if (currentIdx >= max) {
      setMessage("全員をスワイプしました");
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
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        title="プロフィールを編集する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
      <Button
        onPress={() => {
          // pass matches to MatchList
          navigation.navigate("MatchList", { matches: matches });
        }}
        title="マッチを確認する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
      <Text>{message !== "" && message}</Text>
      <Text>
        {filteredCustomers.length > 0
          ? filteredCustomers[currentIdx].name
          : "全員をスワイプしました"}{" "}
      </Text>
      <Button
        onPress={() => handleLike(filteredCustomers[currentIdx])}
        title="○"
        color="#841584"
      />
      <Button
        onPress={() => handleDislike(filteredCustomers[currentIdx])}
        title="X"
        color="#841584"
      />
    </View>
  );
}
