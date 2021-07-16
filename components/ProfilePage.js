// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { globalStyles } from "../styles/globalStyle";
import { generateInterestLabel } from "../utils/helper";

export default function ProfilePage({ navigation }) {
  const { userDataInfo } = useContext(UserContext);
  const [userData] = userDataInfo;

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <View>
      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          style={globalStyles.flexColumn}
          onPress={() => {
            // logout
            signOut();
          }}
        >
          <AntDesign name="logout" size={50} color="#F3B614" style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>ログアウトする</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.flexColumn}
          onPress={() => {
            // view my profile page
            navigation.navigate("Profile");
          }}
        >
          <Image source={require("../assets/edit.png")} style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>プロフィール編集</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.flexRow}>
        <Profile userData={userData} />
      </View>

      <View style={globalStyles.flexColumn}>
        <TouchableOpacity
          onPress={() => {
            // pass matches to MatchList
            navigation.navigate("MatchPage");
          }}
        >
          <Text style={globalStyles.label}>お茶ともを探そう！</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Profile = ({ userData }) => {
  return (
    <View style={[globalStyles.profileContainer, globalStyles.flexColumn]}>
      <Image source={{ uri: userData.photo }} style={styles.profilePhoto} />
      <Text style={globalStyles.header}>{userData.name}</Text>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        趣味・関心事
      </Text>
      <View style={styles.interests}>{generateInterestLabel(userData.interests)}</View>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        自己紹介
      </Text>
      <View style={[styles.profileTextContainer, globalStyles.boxShadow]}>
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "#0094CE" }}>
          {userData.profileText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  profileTextContainer: {
    width: "100%",
    backgroundColor: "#F8F4F4",
    borderRadius: 19,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
