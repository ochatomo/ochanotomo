// TODO
// * allusersからlikeにidがないユーザーだけを抽出
// * 評価関数を走らせる

//　全員スワイプしちゃったときの画面 or 文言

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import { UserContext } from "../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { Auth } from "aws-amplify";

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
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.flexColumn}
          onPress={() => {
            // logout
            signOut();
          }}
        >
          <AntDesign name="logout" size={50} color="#F3B614" style={styles.logo} />
          <Text style={styles.iconLabel}>ログアウトする</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flexColumn}
          onPress={() => {
            // view my profile page
            navigation.navigate("Profile");
          }}
        >
          <Image source={require("../assets/edit.png")} style={styles.logo} />
          <Text style={styles.iconLabel}>プロフィールを編集する</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flexRow}>
        <View style={[styles.profileContainer, styles.flexColumn]}>
          <Image source={require("../assets/testphoto.jpeg")} style={styles.photo} />
        </View>
      </View>

      <Text style={styles.header}>{userData.name}</Text>

      <View style={styles.flexColumn}>
        <TouchableOpacity
          onPress={() => {
            // pass matches to MatchList
            navigation.navigate("MatchPage");
          }}
        >
          <Text style={styles.label}>お茶ともを探そう！</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconLabel: {
    fontSize: 12,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    paddingVertical: 20,
    backgroundColor: "white",
    width: 309,
  },
  textBtn: {
    borderRadius: 44,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 24,
    color: "#004DA9",
    fontWeight: "bold",
  },
  photo: {
    width: 236,
    height: 195,
  },
  flexColumn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    marginVertical: 5,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rightContainer: {
    marginTop: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: "#004DA9",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 5,
    // marginHorizontal: "auto",
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 2,
    padding: 8,
    paddingHorizontal: 20,
    borderColor: "#0093ED",
    color: "#0093ED",
    fontSize: 20,
    borderRadius: 16,
  },
  inputLabel: {
    margin: 12,
    color: "#0094CE",
    fontSize: 24,
    fontWeight: "bold",
  },
  miltiInput: {
    height: 200,
    // backgroundColor: "pink",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 10,
  },
});
