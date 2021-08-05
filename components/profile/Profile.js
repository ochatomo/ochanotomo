import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  View,
  StyleSheet,
} from "react-native";

import { globalStyles } from "../../styles/globalStyle";
import { Colors } from "../../styles/color";

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../../contexts/UserContext";

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
    <View style={globalStyles.viewContainer}>
      <View>
        <View style={globalStyles.imgContainer}>
          <Image
            style={globalStyles.largeLogo}
            source={require("../../assets/profile_logo.png")}
          />
        </View>

        <Text style={globalStyles.header}>
          {isNewUser ? "初めまして！" : "プロフィールを編集する"}
        </Text>
      </View>
      <View style={globalStyles.flexColumn}>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.inputLabel}>お名前は……</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={setName}
            value={name}
            placeholder="名前（ニックネーム）"
            required
          />
          <Text style={globalStyles.inputLabel}>自己紹介しましょう！</Text>

          <TextInput
            style={[globalStyles.input, globalStyles.multiInput]}
            onChangeText={setProfileText}
            value={profileText}
            placeholder="自己紹介しましょう！"
            multiline={true}
          />
        </View>
      </View>
      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home", { screen: "ProfilePage" });
          }}
        >
          <AntDesign
            name="leftcircle"
            size={56}
            color={Colors.secondary1}
            style={{ opacity: isNewUser ? 0 : 1 }}
          />
        </TouchableOpacity>
        <Text style={globalStyles.header}> 1 of 4 </Text>

        <TouchableOpacity
          onPress={() => {
            const errors = validateInput();

            if (errors.length > 0) {
              Alert.alert("入力エラー", errors.join("\n"), [
                { text: "OK", onPress: () => console.log("alert closed") },
              ]);
            } else {
              // console.log({ name, profileText });
              navigation.navigate("Profile2", { name, profileText });
            }
          }}
        >
          <AntDesign name="rightcircle" size={56} color={Colors.primary2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
});
