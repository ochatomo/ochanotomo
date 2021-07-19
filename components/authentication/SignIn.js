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

export default function SingIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (password === "" || email === "") {
      Alert.alert(
        "入力エラー",
        "メールアドレスまたはパスワードが空欄です。再入力をお願いします。",
        [{ text: "OK", onPress: () => console.log("alert closed") }]
      );
      return;
    }

    signIn();
  };

  async function signIn() {
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
    } catch (error) {
      console.log("SignIn error", error);
      Alert.alert(
        "入力エラー",
        "メールアドレスまたはパスワードが間違っています。もう一度お試しください。",
        [{ text: "OK", onPress: () => console.log("alert closed") }]
      );
    }
  }

  return (
    <View>
      <View style={[globalStyles.flexColumn, { height: "100%", width: "100%" }]}>
        <Image
          style={globalStyles.extraLargeLogo}
          source={require("../../assets/ochatomo-logo.png")}
        />
        <Text style={globalStyles.header}>ログインする</Text>
        <View style={styles.inputContainer}>
          <Text style={globalStyles.inputLabel}>メールアドレス</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="メールアドレス"
            required
          />

          <Text style={globalStyles.inputLabel}>パスワード</Text>

          <TextInput
            style={globalStyles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="パスワード"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={handleSignIn}>
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
            サインインする
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
            🔰 初めての方
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PasswordReset")}>
          <Text style={globalStyles.textLink}>パスワードを忘れた</Text>
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
