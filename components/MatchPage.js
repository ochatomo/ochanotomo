// TODO
// * implement handleLike

import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import MatchList from "./MatchList";

import { UserContext } from "../contexts/UserContext";

import { updateCustomer } from "../src/graphql/mutations";
import { getCustomer } from "../src/graphql/queries";
import { getLikesByCustomerID } from "../src/graphql/customQueries";
import { API, graphqlOperation } from "aws-amplify";

export default function MatchPage({ userInfo, setNewUser, navigation }) {
  const { allCustomerData, userDataInfo } = useContext(UserContext);
  const [allCustomers] = allCustomerData;
  const [userData] = userDataInfo;
  const [likes, setLikes] = useState(userData.likes);

  console.log({ allCustomers });

  const [currentIdx, setIdx] = useState(0);

  const incrementIdx = () => {
    const max = allCustomers.length - 1;
    if (currentIdx >= max) return;
    setIdx(currentIdx + 1);
  };

  const saveLike = async (user2Info, user1Like) => {
    incrementIdx();
    // save like or dislike
    // 1. check if the user2ID already exists in likes of current user
    let index = -1;
    let isMatch = false;

    likes.forEach((likeObj, i) => {
      if (likeObj.id === user2Info.id) index = i;
    });

    // 2. if exists, update with the current preference
    if (index !== -1) {
      likes[index] = user1Like;
    } else {
      // otherwise, update state to include the newLike
      const newLike = { id: user2Info.id, like: user1Like };
      setLikes((likes) => [...likes, newLike]);
      const query = { id: userData.id, likes: [...likes, newLike] };
      console.log("Updating customer table with ", query);
      const res = await API.graphql(graphqlOperation(updateCustomer, { input: query }));
      console.log("data receiver with ", res.data.updateCustomer);
    }

    // check user2's likes
    if (user1Like) {
      isMatch = await checkLike(userData.id, user2Info.id);
      console.log("Match successful: ", isMatch);
    }

    // あれば、お互いのマッチに相手のidを追記
    if (isMatch.isMatch) {
      // write to my own table
      const matches1 = userData.matches ? userData.matches : [];
      const query1 = { id: userData.id, matches: [...matches1, user2Info.id] };
      await API.graphql(graphqlOperation(updateCustomer, { input: query1 }));

      // write to the other person's table
      const matches2 = isMatch.matches ? isMatch.matches : [];
      const query2 = { id: user2Info.id, matches: [...matches2, userData.id] };
      await API.graphql(graphqlOperation(updateCustomer, { input: query2 }));
    }
  };

  const checkLike = async (currentUserID, user2ID) => {
    console.log("calling checkLike with user2ID", user2ID);

    // get likes of user2, filter by currentUserId
    const res = await API.graphql(
      graphqlOperation(getLikesByCustomerID, { id: user2ID })
    );
    console.log("inside checklist res", res);
    const likes = res.data.getCustomer.likes;
    const matches = res.data.getCustomer.matches;
    if (!likes) return false;
    const isMatch = likes.filter((like) => like.id === currentUserID)[0].like;

    return {
      isMatch,
      matches,
    };
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
          navigation.navigate("MatchList");
        }}
        title="マッチを確認する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
      <Text>{allCustomers[currentIdx].name} </Text>
      <Button
        onPress={() => saveLike(allCustomers[currentIdx], true)}
        title="○"
        color="#841584"
      />
      <Button
        onPress={() => saveLike(allCustomers[currentIdx], false)}
        title="X"
        color="#841584"
      />
    </View>
  );
}
