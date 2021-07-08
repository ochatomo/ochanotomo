import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createChatRoom } from "../src/graphql/mutations";
import { getChatRoom, getChatRoomData } from "../src/graphql/queries";

import { UserContext } from "../contexts/UserContext";

const dummie1 = "lion";
const dummie2 = "mouse";

export default function MatchList({ navigation }) {
  const { userIdInfo, userDataInfo } = useContext(UserContext);
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;

  const [matches, setMatches] = useState([
    {
      id: "f83d15c9-4d43-40e8-b30a-4c97621a439f",
      name: "ゆりこ2",
    },
    {
      id: "d5d4d62b-3f0e-45fb-a11f-4d0d7fc46685",
      name: "ゆりこ1",
    },
  ]);
  useEffect(() => {}, []);

  // const [chatRoom, setChatRoom] = useState();

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
        graphqlOperation(getChatRoom, { id: chatRoomId, sortDirection: "DESC" })
      );
      console.log("Here is chatroomData", res);
      let chatRoomData = res.data.getChatRoom;
      // 2. if it doesn't exist, create a new Chatroom by chatRoomId
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
          // router go back to matchpage
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
