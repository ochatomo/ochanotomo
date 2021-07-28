import { Auth } from "aws-amplify";
import React, { useState } from "react";

import moment from "moment";

import { dateObject } from "../../utils/data/birthdate";
import { validateEmail } from "../../utils/helper";
import { createAlert } from "../../utils/helper";

import { Picker } from "@react-native-picker/picker";

import { globalStyles } from "../../styles/globalStyle";
import { Colors } from "../../styles/color";

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  const handleSignUp = async () => {
    setBirthdate(year + "-" + month + "-" + date);
    const errors = validateInput();
    if (errors.length > 0) {
      Alert.alert("入力エラー", errors.join("\n"), [
        { text: "OK", onPress: () => console.log("alert closed") },
      ]);
      return;
    } else {
      const isSuccess = await signUp();
      if (isSuccess) {
        navigation.navigate("Confirmation", { email });
      }
    }
  };

  const validateInput = () => {
    const errors = [];

    if (!birthdateAuthentication(year, month, date)) {
      // console.log("birthdate error");
      errors.push("* 御茶ノ友は50歳以上の方のみご利用いただけます。");
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
      return true;
    } catch (error) {
      console.log("SignUp error", error);
      if (error.name === "UsernameExistsException") {
        createAlert("登録エラー", "このメールアドレスはすでに登録されています。");
        navigation.navigate("SignIn");
      } else {
        createAlert(
          "登録エラー",
          "申し訳ございません。しばらく経ってから再度お試しください。"
        );
      }
      return false;
    }
  }

  return (
    <View
      style={[
        globalStyles.flexColumn,
        { width: "100%", height: "100%", marginVertical: 10 },
      ]}
    >
      <View style={[globalStyles.flexColumn]}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../../assets/ochanotomo-logo-without-text.png")}
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
          <Text style={globalStyles.inputLabel}>生年月日</Text>
          <View style={styles.container}>
            <View style={styles.pickerContainer}>
              <Picker style={styles.picker} selectedValue={year} onValueChange={setYear}>
                <Picker.Item
                  label={"年"}
                  value={""}
                  color={Colors.primary1}
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.year.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color={Colors.primary1}
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
                  color={Colors.primary1}
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.month.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color={Colors.primary1}
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
                  color={Colors.primary1}
                  key={"placeholder"}
                  enabled={false}
                  style={styles.pickerlabel}
                />
                {dateObject.date.map((data, index) => (
                  <Picker.Item
                    label={data.label}
                    value={data.value}
                    color={Colors.primary1}
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
                backgroundColor: Colors.primary1,
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
            style={{
              borderRadius: 44,
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              paddingVertical: 8,
              paddingHorizontal: 24,
              backgroundColor: Colors.primary2,
              width: 200,
              textAlign: "center",
            }}
          >
            {"アカウントを\n既に持っている"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Confirmation", { email: "" })}
        >
          <Text style={globalStyles.textLink}>認証コードを入力する</Text>
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
    borderColor: Colors.primary1,
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
    borderColor: Colors.primary1,
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

const birthdateAuthentication = (year, month, date) => {
  const birthdate = year + "-" + month + "-" + date;
  const age = moment().diff(birthdate, "years");
  // console.log({ age });

  if (age < 50) return false;
  else {
    return true;
  }
};
