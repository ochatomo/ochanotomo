import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";
import Comfirmation from "./Comfirmation";

import { globalStyles } from "../../styles/globalStyle";

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
import { useEffect } from "react/cjs/react.development";

export default function SingUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");

  // useEffect(() => {
  //   if (birthdate.length === 4　&& ) setBirthdate((prev) => prev + "-");
  //   if (birthdate.length === 7) setBirthdate((prev) => prev + "-");
  // }, [birthdate]);

  const handleSignUp = async () => {
    const errors = validateInput();
    if (errors.length > 0) {
      Alert.alert("入力エラー", errors.join("\n"), [
        { text: "OK", onPress: () => console.log("alert closed") },
      ]);
      return;
    } else {
      await signUp();
      navigation.navigate("Confirmation");
    }
  };

  const validateInput = () => {
    const errors = [];

    if (!birthdateAuthentication(birthdate)) {
      console.log("birthdate error");
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
    console.log({ errors });

    return errors;
  };

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

  return (
    <View
      style={[
        globalStyles.flexColumn,
        { width: "100%", height: "100%", marginVertical: 20 },
      ]}
    >
      <View style={[globalStyles.flexColumn]}>
        <Image
          style={globalStyles.extraLargeLogo}
          source={require("../../assets/ochatomo-logo.png")}
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
            アカウントをすでに持っている
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
