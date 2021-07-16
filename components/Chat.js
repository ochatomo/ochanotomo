import { View, Text, StyleSheet, TextInput, Button, FlatList, StatusBar, ScrollView, TouchableOpacity, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import moment from "moment";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import React, { useEffect, useState, useContext } from "react";

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
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const odai = [
    "最近ハマっているものは？",
    "お気に入りのスイーツある？",
    "休日は何をしてる？",
    "出身地ってどこ？",
    "最近映画観た？",
    "昨日の晩御飯は？",
    "犬派と猫派？",
    "お酒飲む？飲まない？",
    "好きなアーティストは？",
    "遺書ってもう書いた？",
    "あなたが持っていたいと思うスーパーパワーは何ですか？",
    "今までで一番好きな本は何ですか？"
  ]

  return (
    <View style={styles.container}>
         <Text style={styles.header}>{user2.name}とお話しましょう
        </Text>
      <ScrollView
      >
        
        <View style={styles.chatContainer}>
        
        <FlatList
          data={messages}
            renderItem={renderItem}
            />
        </View>
      </ScrollView>

      <View style={styles.chatInputContainer}>
      <View style={styles.chatInputElements}>
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
            }} >
            <MaterialCommunityIcons name="send-circle" size={80} color="#0094CE" alignItems ='center'/>
          </TouchableOpacity>
          </View>
        <View style={styles.topicContainer}>
        <TouchableOpacity
            
            
          onPress={async () => {
              try {
                const rndInt = Math.floor(Math.random() * 11) + 1
                setInput(odai[rndInt]);
              } catch (e) {
                console.log(e);
              }
              }} >
              <Text style={styles.topicButton}>何について話すかな</Text> 
        </TouchableOpacity>
          
      </View>
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
    <View >
    <View style={styles.messageBox,{
      borderRadius: 8,
      marginLeft: isMyMessage() ? 90 : 0,
      marginRight: isMyMessage() ? 0 : 90,
      margin: 2,
      }}>
        <View style={styles.avatar}>
        <Image source={require("../assets/user.png")} style={styles.user, {
          width: 40,
          height: 40,
          borderRadius: 30,
          marginRight: 15,
          marginLeft: isMyMessage() ? 5 : 0,
          marginRight: isMyMessage() ? 0 : 5,
        }} />
          <Text style={styles.sender, {
            fontFamily: "Roboto",
            fontSize: 20,
            fontWeight: "700",
            color: "#B725D4",
            paddingLeft: 5
          }}>{sender_name}</Text>
           </View>
        <Text style={styles.message, {
          backgroundColor: isMyMessage() ? '#D6F5FF' : 'white',
          fontSize: 20,
          borderRadius: 16,
          color: "#004DA9",
          fontWeight: "700",
          padding: 10
          }}>{content}</Text>
         
      </View>
      <Text style={styles.time, {
        textAlign: isMyMessage() ? 'right' : 'left',
        color: 'grey',
        fontSize: 16
      }}>{timestamp}</Text>
      </View>

   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    textAlign: "center",
    color: "#B725D4",
    fontSize: 28,
    fontWeight: "bold",
    fontWeight: "700",
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 150,
  },
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topicButton: {
    borderRadius: 44,
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#004DA9",
  },
  chatInputElements: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chatInputContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    padding: 5,
  
  },
  messageBox: {
    flexDirection: "row",
  },
  message: {},
  inputBox: {
    width: 270,
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
  },
  avatar: {
    flexDirection: 'row',
  },

});
