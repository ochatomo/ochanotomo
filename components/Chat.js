import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";

import { API, graphqlOperation } from "aws-amplify";

import { createMessage, updateChatRoom } from "../src/graphql/mutations";
import { UserContext } from "../contexts/UserContext";

export default function Chat({ route, navigation }) {
  const { userDataInfo } = useContext(UserContext);
  const [userData] = userDataInfo;
  const { user2, chatRoomData } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function renderItem(message) {
    return <Message message={message} />;
  }

  useEffect(() => {
    if (chatRoomData.messages) setMessages(chatRoomData.messages.items);

    console.log("this is chatroom messages", chatRoomData.messages.items);
  }, []);

  return (
    <View>
      <Button
        onPress={() => {
          navigation.navigate("MatchList");
        }}
        title="戻る"
        color="#841584"
      />
      <Text style={styles.header}>
        {user2.name}とお話しましょう！　あなた：{userData.name}
      </Text>

      <FlatList data={messages} renderItem={renderItem} />

      <TextInput
        placeholder="this is text input"
        onChangeText={setInput}
        value={input}
        style={styles.input}
      />
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
                  sender_id: userData.id,
                  receiver_id: user2.id,
                },
              })
            );

            const newMessage = newMessageData.data.createMessage;
            console.log(
              "Data from message table",
              newMessageData.data.createMessage.content
            );
          } catch (e) {
            console.log(e);
          }
        }}
      />
    </View>
  );
}

const Message = (message) => {
  const sender_name = message.message.item.sender.name;
  const content = message.message.item.content;
  const timestamp = message.message.item.createdAt;
  console.log({ message });
  return (
    <>
      <Text>
        {sender_name}: {content} @ {timestamp}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "orange",
    padding: 10,
  },
});
