import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";

import { dateObject } from "../../utils/data/birthdate";

import { Picker } from "@react-native-picker/picker";

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
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

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

    if (!birthdateAuthentication(year, month, date)) {
      console.log("birthdate error");
      errors.push("* Ochatomoは50歳以上の方のみご利用いただけます。");
      return;
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
        <Text style={globalStyles.header}>登録する</Text>
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
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <Picker style={styles.picker} selectedValue={year} onValueChange={setYear}>
                <Picker.Item
                  label={"年"}
                  value={""}
                  color="#0094CE"
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.year.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color="#0094CE"
                    key={index}
                    style={styles.pickerlabel}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.pickersContainer2}>
              <Picker
                style={styles.picker}
                selectedValue={month}
                onValueChange={setMonth}
              >
                <Picker.Item
                  label={"月"}
                  value={""}
                  color="#0094CE"
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.month.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color="#0094CE"
                    key={index}
                    style={styles.pickerlabel}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.pickersContainer2}>
              <Picker style={styles.picker} selectedValue={date} onValueChange={setDate}>
                <Picker.Item
                  label={"日"}
                  value={""}
                  color="#0094CE"
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.date.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color="#0094CE"
                    key={index}
                    style={styles.pickerlabel}
                  />
                ))}
              </Picker>
            </View>
          </View>
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
            登録する
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text
            style={[
              globalStyles.textBtn,
              {
                backgroundColor: "#27AE60",
                width: 220,
                marginVertical: 5,
                textAlign: "center",
              },
            ]}
          >
            {"アカウントを\nすでに持っている"}
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
  picker: {
    width: "100%",
    height: 50,
  },
  pickerContainer: {
    width: "38%",
    borderWidth: 2,
    borderColor: "#0094CE",
    textAlign: "center",
    borderRadius: 16,
    marginHorizontal: 1,
    marginBottom: 5,
  },
  pickersContainer2: {
    width: "33%",
    justifyContent: "space-around",
    flexDirection: "column",
    borderWidth: 2,
    borderColor: "#0094CE",
    textAlign: "center",
    borderRadius: 16,
    marginHorizontal: 1,
    marginBottom: 5,
  },
  pickerlabel: {
    textAlign: "center",
  },
  container: {
    justifyContent: "center",
    flexDirection: "row",
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

const birthdateAuthentication = (year, month, date) => {
  const birthdate = year + "-" + month + "-" + date;
  const age = moment().diff(birthdate, "years");
  // console.log({ age });

  if (age < 50) return false;
  else {
    return true;
  }
};

const generateLabel = (start, end) => {
  const array = [];
  for (let i = start; i < end; i++) {
    array.push({ label: i, value: i });
  }
  return array;
};
