import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from "react-native";

import { API, graphqlOperation } from "aws-amplify";
import { createChatRoom } from "../src/graphql/mutations";
import { getFullChatRoomInfo } from "../src/graphql/customQueries";
import { globalStyles } from "../styles/globalStyle";
import { UserContext } from "../contexts/UserContext";
import BannerAd from "./ads/Banner";

export default function MatchList({ navigation }) {
  const { userIdInfo, userDataInfo, matchesData, premiumData } = useContext(UserContext);
  const [userId] = userIdInfo;
  const [matches, setMatches] = matchesData;
  const [message, setMessage] = useState("");
  const [isPremium] = premiumData;

  useEffect(() => {
    if (matches.length === 0) {
      setMessage(
        `まだお茶トモがいません。\n「探す」メニューでお茶トモを見つけましょう！`
      );
    } else {
      setMessage("");
    }
  }, [matches]);

  function generateChatRoomId(id1, id2) {
    const array = [id1, id2];
    const chatRoomId = array.sort().join("_");
    return chatRoomId;
  }

  async function startChat(match) {
    const chatRoomId = generateChatRoomId(userId, match.id);

    try {
      // 1. check if the chatroom already exists
      const res = await API.graphql(
        graphqlOperation(getFullChatRoomInfo, { id: chatRoomId, sortDirection: "DESC" })
      );
      let chatRoomData = res.data.getChatRoom;
      // 2. if it doesn't exist, create a new Chatroom by the chatRoomId
      if (!chatRoomData) {
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: { id: chatRoomId },
          })
        );

        chatRoomData = newChatRoomData.data.createChatRoom;
      }
      navigation.navigate("Chat", {
        user2: match,
        chatRoomData: chatRoomData,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={globalStyles.viewContainer}>
      {!isPremium && <BannerAd />}
      <View>
        <Text style={styles.header}>Myお茶トモ</Text>
        {message !== "" && (
          <Text style={[globalStyles.text, { textAlign: "center" }]}>{message}</Text>
        )}
      </View>
      <View style={{ width: "100%", height: 500 }}>
        <ScrollView>
          {matches.map((match, index) => {
            return (
              <View style={styles.container}>
                <View style={styles.friendsListContainer} key={index}>
                  <View style={styles.avatarBox}>
                    <Image source={{ uri: match.photo }} style={styles.matchAvatar} />
                  </View>

                  <View style={styles.matchedUserContainer}>
                    <Text style={globalStyles.name}>{match.name}</Text>
                  </View>

                  <View style={styles.chatButtonContainer}>
                    <TouchableOpacity onPress={() => startChat(match)}>
                      <Text style={styles.chatButton}>お話をする</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: "100%",
  },
  header: {
    textAlign: "center",
    color: "#D64F32",
    fontSize: 28,
    fontWeight: "bold",
    fontWeight: "700",
    padding: 10,
  },
  friendsListContainer: {
    flexDirection: "row",
    flex: 1,
  },
  chatButtonContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  matchedUserContainer: {
    flex: 1.5,
    padding: 10,
    height: 90,
    flexDirection: "column",
    justifyContent: "center",
  },
  avatarBox: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  matchAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  chatButton: {
    borderRadius: 44,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#8B8C14",
  },
});
