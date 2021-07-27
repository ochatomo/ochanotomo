import { Auth } from "aws-amplify";
import React, { useState } from "react";

import { globalStyles } from "../../styles/globalStyle";
import { Colors } from "../../styles/color";
import { createAlert } from "../../utils/helper";

import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function Comfirmation({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [emailInput, setEmailInput] = useState(email);

  async function confirmSignUp() {
    try {
      // console.log("email---", email);
      await Auth.confirmSignUp(emailInput, code);
      createAlert(
        "アカウントが作成されました",
        "早速御茶ノ友にサインインしましょう。",
        () => {
          navigation.navigate("SignIn");
        }
      );
    } catch (error) {
      // console.log("equality check", error.name === "NotAuthorizedException");
      if (error.name === "NotAuthorizedException") {
        createAlert(
          "認証済み",
          "こちらのアカウントはすでに認証済みです。サインインページより御茶ノ友へお進みください。",
          () => navigation.navigate("SignIn")
        );
      }
      console.log("error confirming sign up", error);
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(email);
      console.log("code resent successfully");
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
          keyboardType="number-pad"
        />
      </View>
      {email === "" && (
        <View style={styles.inputContainer}>
          <Text style={globalStyles.inputLabel}>メールアドレス</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={setEmailInput}
            value={emailInput}
            placeholder="メールアドレス"
          />
        </View>
      )}
      <TouchableOpacity onPress={() => confirmSignUp()}>
        <Text
          style={[
            globalStyles.textBtn,
            {
              backgroundColor: Colors.primary1,
              width: 200,
              marginVertical: 5,
              textAlign: "center",
            },
          ]}
        >
          送信
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => resendConfirmationCode()}>
        <Text
          style={[
            globalStyles.textBtn,
            {
              backgroundColor: Colors.primary2,
              width: 200,
              marginVertical: 5,
              textAlign: "center",
            },
          ]}
        >
          認証コードを再送する
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
