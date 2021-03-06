import { Auth } from "aws-amplify";
import React, { useState } from "react";

import { globalStyles } from "../../styles/globalStyle";
import { Colors } from "../../styles/color";
import { createAlert } from "../../utils/helper";

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function SignIn({ navigation, setSignedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (password === "" || email === "") {
      createAlert(
        "入力エラー",
        "メールアドレスまたはパスワードが空欄です。再入力をお願いします。"
      );
      return;
    }

    signIn();
  };

  async function signIn() {
    try {
      await Auth.signIn(email, password);
      setSignedIn(true);
    } catch (error) {
      createAlert(
        "入力エラー",
        "メールアドレスまたはパスワードが間違っています。もう一度お試しください。"
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
            keyboardType="email-address"
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
                backgroundColor: Colors.primary1,
                width: 200,
                marginVertical: 5,
                textAlign: "center",
              },
            ]}
          >
            ログインする
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("OnBoarding")}>
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
