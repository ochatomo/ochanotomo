import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createChatRoom } from "../src/graphql/mutations";
import { getChatRoom, getChatRoomData } from "../src/graphql/queries";

const dummie1 = "lion";
const dummie2 = "mouse";

export default function MatchList({ navigation }) {
  const [matches, setMatches] = useState([
    {
      name: "tanuki",
      profileText: "helloo my name is tanuki",
    },
    {
      name: "kitsune",
      profileText: "helloo my name is kitsune",
    },
  ]);
  const [user2, setUser2] = useState({});
  useEffect(() => {}, []);

  // const [chatRoom, setChatRoom] = useState();

  function generateChatRoomId(id1, id2) {
    const array = [id1, id2];
    const chatRoomId = array.sort().join("_");
    return chatRoomId;
  }

  return (
    <View>
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
            <Button
              onPress={async () => {
                // 相手のidをセットする
                setUser2(match);

                const chatRoomId = generateChatRoomId(dummie1, dummie2);

                try {
                  // 1. check if the chatroom already exists
                  const res = await API.graphql(
                    graphqlOperation(getChatRoomData, { id: "quiet_place" })
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

                // const newChatRoom = newChatRoomData.data.createChatRoom;
                // console.log({ newChatRoom });

                console.log(match);
              }}
              title="お話をする"
              color="#841584"
            />
          </View>
        );
      })}
    </View>
  );
}
