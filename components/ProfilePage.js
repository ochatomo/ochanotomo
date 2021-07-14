// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { globalStyles } from "../styles/style";

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
        <View style={[globalStyles.profileContainer, globalStyles.flexColumn]}>
          <Image
            source={require("../assets/testphoto.jpeg")}
            style={globalStyles.photo}
          />
        </View>
      </View>

      <Text style={globalStyles.header}>{userData.name}</Text>

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
