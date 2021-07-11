import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createChatRoom } from "../src/graphql/mutations";
import { getFullChatRoomInfo } from "../src/graphql/customQueries";

import { UserContext } from "../contexts/UserContext";

export default function MatchList({ route, navigation }) {
  const { userIdInfo, userDataInfo } = useContext(UserContext);
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;
  const { matches } = route.params;

  function generateChatRoomId(id1, id2) {
    const array = [id1, id2];
    const chatRoomId = array.sort().join("_");
    return chatRoomId;
  }

  async function startChat(match) {
    const chatRoomId = generateChatRoomId(userId, match.id);

    try {
      // 1. check if the chatroom already exists
      console.log({ chatRoomId });
      const res = await API.graphql(
        graphqlOperation(getFullChatRoomInfo, { id: chatRoomId, sortDirection: "DESC" })
      );
      console.log("Here is chatroomData", res);
      let chatRoomData = res.data.getChatRoom;
      // 2. if it doesn't exist, create a new Chatroom by the chatRoomId
      if (!chatRoomData) {
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: { id: chatRoomId },
          })
        );
        console.log(newChatRoomData);
        chatRoomData = newChatRoomData.data.createChatRoom;
      }
      console.log({ chatRoomData });

      // 3. move to Chat page
      navigation.navigate("Chat", {
        user2: match,
        chatRoomData: chatRoomData,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Text>
        Logged in as {userData.name} ID:{userId}{" "}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("MatchPage");
        }}
        title="戻る"
        color="#841584"
      />
      {matches.map((match) => {
        return (
          <View key={match.name}>
            <Text>{match.name}</Text>
            <Text>{match.profileText}</Text>
            <Button onPress={() => startChat(match)} title="お話をする" color="#841584" />
          </View>
        );
      })}
    </View>
  );
}
