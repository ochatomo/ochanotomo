import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";

import { API, graphqlOperation } from "aws-amplify";

import { createMessage, updateChatRoom } from "../src/graphql/mutations";

export default function Chat({ route, navigation }) {
  const { user2, chatRoomData } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function renderItem(item) {
    return <Text>{item.item.content}</Text>;
  }

  useEffect(() => {
    if (chatRoomData.messages) setMessages(chatRoomData.messages.items);

    console.log("this is chatroom messages", chatRoomData.messages.items);
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          // router go back to matchlist
          navigation.navigate("MatchList");
        }}
        title="戻る"
        color="#841584"
      />
      <Text>{user2.name}とお話しましょう！</Text>

      <FlatList data={messages} renderItem={renderItem} inverted />

      <Text>Input: {input}</Text>
      <TextInput placeholder="this is text input" onChangeText={setInput} value={input} />
      <Button
        title="チャット送信"
        onPress={async () => {
          try {
            // 1. create a Message
            const newMessageData = await API.graphql(
              graphqlOperation(createMessage, {
                input: {
                  chatRoomId: chatRoomData.id,
                  content: input,
                },
              })
            );
            // TODO: set sender_id to my own & set receiver_id to the other person's

            const newMessage = newMessageData.data.createMessage;
            console.log(
              "Data from message table",
              newMessageData.data.createMessage.content
            );

            // 2. add to chatroom
            // const res = await API.graphql(
            //   graphqlOperation(updateChatRoom, {
            //     input: {
            //       id: chatRoomId,
            //       messages: [...messages, newMessage],
            //     },
            //   })
            // );
            // console.log("---------", res)
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </View>
  );
}
