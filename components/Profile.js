// Profile1 : NAME & PROFILETEXT

// TODO
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  View,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";

export default function Profile({ navigation }) {
  const { isNewUserInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userData] = userDataInfo;

  const [name, setName] = useState(userData.name);
  const [profileText, setProfileText] = useState(userData.profileText);

  const validateInput = () => {
    const errors = [];
    if (name === "") {
      errors.push("* お名前を入力してください。");
    }
    if (profileText === "") {
      errors.push("* プロフィールを入力してください。");
    }
    return errors;
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image style={styles.logo} source={require("../assets/profile_logo.png")} />
        </View>

        <Text style={styles.header}>
          {isNewUser ? "初めまして！" : "プロフィールを編集する"}
        </Text>
        <Text style={styles.inputLabel}>お名前は……</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="名前（ニックネーム）"
          required
        />

        <Text style={styles.inputLabel}>自己紹介しましょう！</Text>

        <TextInput
          style={[styles.input, styles.miltiInput]}
          onChangeText={setProfileText}
          value={profileText}
          placeholder="自己紹介しましょう！"
          multiline={true}
        />
        <View style={styles.iconContainer}>
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
          <Text style={styles.header}> 1 of 4 </Text>

          <TouchableOpacity
            onPress={() => {
              const errors = validateInput();

              if (errors.length > 0) {
                Alert.alert("入力エラー", errors.join("\n"), [
                  { text: "OK", onPress: () => console.log("alert closed") },
                ]);
              } else {
                navigation.navigate("Profile2", { name, profileText });
              }
            }}
          >
            <AntDesign name="rightcircle" size={56} color="#27AE60" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    marginVertical: 5,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 100,
    height: 100,
    marginHorizontal: "auto",
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
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0094CE",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginHorizontal: 3,
    marginVertical: 5,
  },
});
