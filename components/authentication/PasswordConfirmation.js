import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";

import { globalStyles } from "../../styles/globalStyle";

import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { createAlert } from "../../utils/helper";

export default function PasswordComfirmation({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const validateInput = () => {
    if (newPassword.length < 8) {
      createAlert("入力エラー", "8文字以上のパスワードを入力してください。");
      return false;
    }
    return true;
  };
  async function forgotPasswordSubmit() {
    if (!validateInput()) return;
    try {
      await Auth.forgotPasswordSubmit(email, code, newPassword);
      createAlert(
        "パスワードがリセットされました",
        "新しいパスワードでサインインしましょう。",
        () => navigation.navigate("SignIn")
      );
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }
  return (
    <View
      style={[
        globalStyles.flexColumn,
        { width: "100%", height: "100%", marginVertical: 20 },
      ]}
    >
      <View style={styles.inputContainer}>
        <Text style={globalStyles.inputLabel}>
          登録済みのメールアドレスに認証コードを送付しました。
        </Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={setCode}
          value={code}
          placeholder="認証コード"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={globalStyles.inputLabel}>新しいパスワードをご入力ください。</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="新しいパスワード"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={() => forgotPasswordSubmit()}>
        <Text
          style={[
            globalStyles.textBtn,
            {
              backgroundColor: "#27AE60",
              width: 200,
              marginVertical: 5,
              textAlign: "center",
            },
          ]}
        >
          {"パスワードを\n再設定する"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={globalStyles.textLink}>サインインページへ</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  extraLargeLogo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 280,
  },
});
