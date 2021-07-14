// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import s from "../styles/style.js";

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
      <View style={s.iconContainer}>
        <TouchableOpacity
          style={s.flexColumn}
          onPress={() => {
            // logout
            signOut();
          }}
        >
          <AntDesign name="logout" size={50} color="#F3B614" style={s.logo} />
          <Text style={s.iconLabel}>ログアウトする</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s.flexColumn}
          onPress={() => {
            // view my profile page
            navigation.navigate("Profile");
          }}
        >
          <Image source={require("../assets/edit.png")} style={s.logo} />
          <Text style={s.iconLabel}>プロフィールを編集する</Text>
        </TouchableOpacity>
      </View>
      <View style={s.flexRow}>
        <View style={[s.profileContainer, s.flexColumn]}>
          <Image source={require("../assets/testphoto.jpeg")} style={s.photo} />
        </View>
      </View>

      <Text style={s.header}>{userData.name}</Text>

      <View style={s.flexColumn}>
        <TouchableOpacity
          onPress={() => {
            // pass matches to MatchList
            navigation.navigate("MatchPage");
          }}
        >
          <Text style={s.label}>お茶ともを探そう！</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
