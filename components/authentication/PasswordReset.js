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

export default function PasswordReset({ navigation }) {
  const [email, setEmail] = useState("");

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
      await Auth.forgotPassword(email);
      createAlert("認証コードを送信しました", "メールをご確認ください。");
    } catch (error) {
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
        </View>
        <TouchableOpacity onPress={handleReset}>
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
            送信する
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
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
