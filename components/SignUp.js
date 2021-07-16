import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";

import { globalStyles } from "../styles/globalStyle";

import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function SingUp({ setShowSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setErrors] = useState([]);
  const [hasSignedUp, setSignedUp] = useState(false);
  const [code, setCode] = useState("");

  const handleSignUp = () => {
    const isValid = validateInput();
    if (!isValid) {
      console.log({ error });
      Alert.alert("入力エラー", error.join("\n"), [
        { text: "OK", onPress: () => console.log("alert closed") },
      ]);
      setErrors([]);
      return;
    } else {
      signUp();
      setSignedUp(true);
    }
  };

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
  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        email: email,
        attributes: {
          birthdate,
        },
      });

      console.log(user);
    } catch (error) {
      createAlert(
        "登録エラー",
        "申し訳ございません。しばらく経ってから再度お試しください。"
      );
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
      {!hasSignedUp ? (
        <View style={[globalStyles.flexColumn]}>
          <Image
            style={styles.extraLargeLogo}
            source={require("../assets/ochatomo-logo.png")}
          />
          <Text style={globalStyles.header}>サインアップ</Text>
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
            <Text style={globalStyles.inputLabel}>生年月日</Text>
            <TextInput
              style={globalStyles.input}
              onChangeText={setBirthdate}
              value={birthdate}
              placeholder="例：1962-12-03"
              required
            />
          </View>
          <TouchableOpacity onPress={handleSignUp}>
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
              サインアップ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSignIn(true)}>
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
              アカウントをすでに持っている
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
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

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

function birthdateAuthentication(birthdate) {
  const age = moment().diff(birthdate, "years");
  console.log({ age });

  if (age < 50) return false;
  else {
    return true;
  }
}
