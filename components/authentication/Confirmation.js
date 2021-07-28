import { Auth } from "aws-amplify";
import React, { useState } from "react";

import { globalStyles } from "../../styles/globalStyle";
import { Colors } from "../../styles/color";
import { createAlert } from "../../utils/helper";

import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function Comfirmation({ route, navigation }) {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [emailInput, setEmailInput] = useState(email);

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(emailInput, code);
      createAlert(
        "アカウントが作成されました",
        "早速御茶ノ友にサインインしましょう。",
        () => {
          navigation.navigate("SignIn");
        }
      );
    } catch (error) {
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
    <View style={[globalStyles.flexColumn, styles.container]}>
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
          style={[globalStyles.textBtn, styles.btn, { backgroundColor: Colors.primary1 }]}
        >
          送信
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => resendConfirmationCode()}>
        <Text
          style={[globalStyles.textBtn, styles.btn, { backgroundColor: Colors.primary2 }]}
        >{`認証コードを\n再送する`}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={globalStyles.textLink}>サインインページへ</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    width: 200,
    marginVertical: 5,
    textAlign: "center",
  },
  extraLargeLogo: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    width: 280,
  },
  container: { width: "100%", height: "100%", marginVertical: 20 },
});
