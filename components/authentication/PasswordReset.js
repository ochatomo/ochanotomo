import { Auth } from "aws-amplify";
import React, { useState } from "react";

import { globalStyles } from "../../styles/globalStyle";

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function PasswordReset({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = () => {
    if (email === "") {
      Alert.alert("入力エラー", "メールアドレスが空欄です。再入力をお願いします。", [
        { text: "OK", onPress: () => console.log("alert closed") },
      ]);
      return;
    }
    reset();
  };

  async function reset() {
    try {
      console.log("input email", email);
      const res = await Auth.forgotPassword(email);
      console.log(res);
      Alert.alert("認証コードを送信しました", "メールをご確認ください。", [
        {
          text: "OK",
          onPress: () => navigation.navigate("PasswordConfirmation", { email }),
        },
      ]);
    } catch (error) {
      console.log(error);
      if (error.name === "LimitExceededException") {
        createAlert(
          "認証エラー",
          "認証回数制限をオーバーしました。しばらく経ってから再度お試しください。"
        );
        return;
      } else {
        createAlert("入力エラー", "メールアドレスが無効です。もう一度お試しください。");
      }
    }
  }

  return (
    <View>
      <View style={[globalStyles.flexColumn, { height: "100%", width: "100%" }]}>
        <Image
          style={globalStyles.extraLargeLogo}
          source={require("../../assets/ochatomo-logo.png")}
        />
        <Text style={globalStyles.header}>パスワードを変更する</Text>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.inputLabel}>メールアドレス</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="メールアドレス"
            required
          />
          {/* 
          <Text style={globalStyles.inputLabel}>パスワード</Text>

          <TextInput
            style={globalStyles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="パスワード"
            secureTextEntry={true}
          /> */}
        </View>
        <TouchableOpacity onPress={handleReset}>
          <Text
            style={[
              globalStyles.textBtn,
              {
                backgroundColor: "#004DA9",
                width: 200,
                marginVertical: 5,
                textAlign: "center",
              },
            ]}
          >
            送信する
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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
            戻る
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 280,
  },
});
const createAlert = (title, message) => {
  Alert.alert(title, message, [
    { text: "OK", onPress: () => console.log("alert closed") },
  ]);
};
