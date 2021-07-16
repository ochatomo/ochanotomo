import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createChatRoom } from "../src/graphql/mutations";
import { getFullChatRoomInfo } from "../src/graphql/customQueries";
import { globalStyles } from "../styles/globalStyle";
import { AntDesign } from "@expo/vector-icons";
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

    try
    {
      // 1. check if the chatroom already exists
      console.log({ chatRoomId });
      const res = await API.graphql(
        graphqlOperation(getFullChatRoomInfo, { id: chatRoomId, sortDirection: "DESC" })
      );
      // console.log("Here is chatroomData", res);
      let chatRoomData = res.data.getChatRoom;
      // 2. if it doesn't exist, create a new Chatroom by the chatRoomId
      if (!chatRoomData)
      {
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: { id: chatRoomId },
          })
        );
        // console.log(newChatRoomData);
        chatRoomData = newChatRoomData.data.createChatRoom;
      }
      // console.log({ chatRoomData });

      // 3. move to Chat page
      navigation.navigate("Chat", {
        user2: match,
        chatRoomData: chatRoomData,
      });
    } catch (e)
    {
      console.log(e);
    }
  }

  return (
    <View>
      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            // return
          }}
          style={globalStyles.flexColumn}
        >
          <AntDesign name="leftcircle" size={50} color="#F3B614" />
          <Text style={globalStyles.iconLabel}>戻る</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // view my profile page
            navigation.navigate("Profile");
          }}
          style={globalStyles.flexColumn}>
          <Image source={require("../assets/edit.png")} style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>プロフィール編集</Text>
        </TouchableOpacity>
      </View>
      
     
      <View>
        <Text style={globalStyles.header}>マイお茶とも</Text>
      </View>

      {matches.map((match, index) => {
        return (
          <View style={styles.friendsListContainer} key={index}>
              
            <View style={styles.avatarBox}>
              <Image source={require("../assets/user.png")} style={styles.matchAvatar} />
            </View>
              
            <View style={styles.matchedUserContainer}>
              <Text style={globalStyles.name}>{match.name}</Text>
            </View>
              
            <View style={styles.chatButtonContainer}>
              <TouchableOpacity
                onPress={() => startChat(match)}
              >
                <Text style={styles.chatButton}>お話をする
                </Text>
              </TouchableOpacity>
            </View>
        
          </View>
        )
      })
      }
    </View>
  )
}

      {/* <Text>
        Logged in as {userData.name} ID:{userId}{" "}
      </Text>
      <Button
        onPress={() => {
          navigation.navigate("MatchPage");
        }}
        title="戻る"
        color="#841584"
      />
      {matches.map((match, index) => {
        return (
          <View key={index}>
            <Text>{match.name}</Text>
            <Text>{match.profileText}</Text>
            <Button onPress={() => startChat(match)} title="お話をする" color="#841584" />
          </View>
        );
      } */}


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
  friendsListContainer: {
    flexDirection: 'row',
  },
  chatButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchedUserContainer: {
    flex: 1.5,
    padding: 10,
    height: 90,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  avatarBox: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  matchAvatar: {
    width: 70,
    height: 70,
    borderRadius: 30,
  },
  chatButton: {
    borderRadius: 44,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#0094CE",
  },
});