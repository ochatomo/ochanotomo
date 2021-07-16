import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import user from "../assets/user.png";

import { API, graphqlOperation } from "aws-amplify";
import { createMessage } from "../src/graphql/mutations";
import { onCreateMessage } from "../src/graphql/subscriptions";

export default function Chat({ route, navigation }) {
  const { userDataInfo } = useContext(UserContext);
  const [userData] = userDataInfo;
  const { user2, chatRoomData } = route.params;
  const [messages, setMessages] = useState(chatRoomData.messages.items);
  const [input, setInput] = useState("");

  function renderItem(message) {
    return <Message message={message} />;
  }

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
      next: (data) => {
        console.log("subscribe---", data);
        const newMessage = data.value.data.onCreateMessage;
        // console.log("newMessage :", newMessage);
        if (newMessage.chatRoomId === chatRoomData.id) {
          setMessages((messages) => [...messages, newMessage]);
        }
      },
    });

    // console.log("this is chatroom messages", chatRoomData.messages.items);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
      <Text style={styles.header}> 　{user2.name}とお話しましょう</Text>
      <ScrollView>
        <View style={styles.chatContainer}>
          <FlatList data={messages} renderItem={renderItem} />
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          onChangeText={setInput}
          multiline={true}
          value={input}
          placeholder="メッセージを入力してください。"
        />
        <TouchableOpacity
          title="チャット送信"
          style={styles.button}
          onPress={async () => {
            try {
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
              setInput("");
              const newMessage = newMessageData.data.createMessage;
              console.log(
                "Data from message table",
                newMessageData.data.createMessage.content
              );
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <MaterialCommunityIcons
            name="send-circle"
            size={80}
            color="#0094CE"
            alignItems="center"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Message = (message) => {
  const { userDataInfo } = useContext(UserContext);
  const [userData] = userDataInfo;
  const isMyMessage = () => {
    if (sender_name === userData.name) return true;
  };

  console.log({ message });
  const sender_name = message.message.item.sender.name;
  const content = message.message.item.content;
  const timestamp = moment(message.message.item.createdAt).fromNow();
  console.log(message.message.item.content);
  return (
    <View>
      <View
        style={
          (styles.messageBox,
          {
            borderRadius: 8,
            marginLeft: isMyMessage() ? 90 : 0,
            marginRight: isMyMessage() ? 0 : 90,
            margin: 2,
          })
        }
      >
        <Text
          style={
            (styles.sender,
            {
              fontFamily: "Roboto",
              fontSize: 18,
              fontWeight: "700",
              color: "#B725D4",
            })
          }
        >
          {sender_name}
        </Text>
        <Text
          style={
            (styles.message,
            {
              backgroundColor: isMyMessage() ? "#D6F5FF" : "white",
              fontSize: 20,
              borderRadius: 16,
              color: "#004DA9",
              fontWeight: "700",
              padding: 10,
            })
          }
        >
          {content}
        </Text>
      </View>
      <Text
        style={
          (styles.time,
          {
            textAlign: isMyMessage() ? "right" : "left",
            color: "grey",
            fontSize: 16,
          })
        }
      >
        {timestamp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    color: "#B725D4",
    fontSize: 28,
    fontWeight: "bold",
    fontWeight: "700",
    padding: 10,
  },
  chatContainer: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 200,
    backgroundColor: "#ddd",
    flex: 1,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 55,
    padding: 25,
  },
  messageBox: {
    flexDirection: "row",
  },
  message: {},
  inputBox: {
    width: 280,
    height: 80,
    justifyContent: "center",
    borderRadius: 16,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "rgba(0, 147, 237, 1.0)",
    fontSize: 18,
  },
  sender: {
    padding: 12,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "700",
    color: "#B725D4",
  },
  time: {},
  user: {
    width: 66,
    height: 58,
  },
});
