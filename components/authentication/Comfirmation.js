import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";

import { globalStyles } from "../../styles/globalStyle";

import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function Comfirmation({ setShowSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setErrors] = useState([]);
  const [hasSignedUp, setSignedUp] = useState(false);
  const [code, setCode] = useState("");

  const validateInput = () => {
    const errors = [];

    if (!birthdateAuthentication(birthdate)) {
      errors.push("* Ochatomoは50歳以上の方のみご利用いただけます。");
    }

    if (!validateEmail(email)) {
      errors.push("* 正しいメールアドレスを入力してください。");
    }
    if (password === "") {
      errors.push("* パスワードを入力してください。");
    }

    if (password.length < 8) {
      errors.push("* 8文字以上のパスワードを入力してください。");
    }
    setErrors(errors);

    if (errors.length > 0) return false;
    return true;
  };
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, code);
      console.log("successfully confirmed");
      setShowSignIn(true);
    } catch (error) {
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
      <View>
        <Text style={globalStyles.inputLabel}>
          登録済みのメールアドレスに認証コードを送付しました。
        </Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={setCode}
          value={code}
          placeholder="認証コードをご入力ください"
        />
        <TouchableOpacity onPress={() => confirmSignUp()}>
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
            送信
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resendConfirmationCode()}>
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
            認証コードを再送する
          </Text>
        </TouchableOpacity>
      </View>
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

const createAlert = (title, message) => {
  Alert.alert(title, message, [
    { text: "OK", onPress: () => console.log("alert closed") },
  ]);
};
