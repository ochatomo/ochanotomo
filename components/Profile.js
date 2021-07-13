// Profile1 : NAME & PROFILETEXT

// TODO
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";

import { API, graphqlOperation } from "aws-amplify";


export default function Profile({ navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;

  const [name, setName] = useState(userData.name);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [profileText, setProfileText] = useState(userData.profileText);
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [interestList, setInterestList] = useState([{ label: "", value: "" }]);
  const [error, setError] = useState([]);

  useEffect(() => {
   


  }, []);

  const validateInput = () => {
    if (name === "") {
      console.log("if statement with name");
      setError((errors) => [...errors, "お名前を入力してください。"]);
    }
    if (profileText === "")
      setError((error) => [...error, "プロフィールを入力してください。"]);
    else {
      return true;
    }
  };

  return (
    <SafeAreaView>
      {error.length > 0 &&
        error.map((error, index) => {
          return <Text key="index">{error}</Text>;
        })}

      <ScrollView>
        <View style={styles.imgContainer}>
          <Image style={styles.logo} source={require("../assets/profile_logo.png")} />
        </View>

        <Text style={styles.header}>
          {isNewUser ? "初めまして！" : "プロフィールを編集する"}
        </Text>
        <Text style={styles.inputLabel}>お名前は……</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="名前（ニックネーム）"
          required
        />

        <Text style={styles.inputLabel}>自己紹介しましょう！</Text>

        <TextInput
          style={[styles.input, styles.miltiInput]}
          onChangeText={setProfileText}
          value={profileText}
          placeholder="自己紹介しましょう！"
          multiline={true}
        />
        <View style={styles.iconContainer}>
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
          <Text style={styles.header}> 1 of 4 </Text>

          <TouchableOpacity
            onPress={() => {
              setError([]);

              const isValid = validateInput();
              if (isValid) navigation.navigate("Profile2", { name, profileText });
            }}
          >
            <AntDesign name="rightcircle" size={56} color="#27AE60" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    marginVertical: 5,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    color: "#004DA9",
    fontWeight: "bold",
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
  },
  input: {
    height: 40,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 2,
    padding: 8,
    paddingHorizontal: 20,
    borderColor: "#0093ED",
    color: "#0093ED",
    fontSize: 20,
    borderRadius: 16,
  },
  inputLabel: {
    margin: 12,
    color: "#0094CE",
    fontSize: 24,
    fontWeight: "bold",
  },
  miltiInput: {
    height: 200,
    // backgroundColor: "pink",
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0094CE",
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginHorizontal: 3,
    marginVertical: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 100,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#0093ED",
    borderRadius: 4,
    color: "#0093ED",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    marginLeft: 30,
  },
  inputAndroid: {
    fontSize: 100,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#0093ED",
    borderRadius: 8,
    color: "#0093ED",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
  },
  placeholder: { color: "#0093ED" },
});

const prefectures = [
  { label: "北海道", value: 1 },
  { label: "青森県", value: 2 },
  { label: "岩手県", value: 3 },
  { label: "宮城県", value: 4 },
  { label: "秋田県", value: 5 },
  { label: "山形県", value: 6 },
  { label: "福島県", value: 7 },
  { label: "茨城県", value: 8 },
  { label: "栃木県", value: 9 },
  { label: "群馬県", value: 10 },
  { label: "埼玉県", value: 11 },
  { label: "千葉県", value: 12 },
  { label: "東京都", value: 13 },
  { label: "神奈川県", value: 14 },
  { label: "新潟県", value: 15 },
  { label: "富山県", value: 16 },
  { label: "石川県", value: 17 },
  { label: "福井県", value: 18 },
  { label: "山梨県", value: 19 },
  { label: "長野県", value: 20 },
  { label: "岐阜県", value: 21 },
  { label: "静岡県", value: 22 },
  { label: "愛知県", value: 23 },
  { label: "三重県", value: 24 },
  { label: "滋賀県", value: 25 },
  { label: "京都府", value: 26 },
  { label: "大阪府", value: 27 },
  { label: "兵庫県", value: 28 },
  { label: "奈良県", value: 29 },
  { label: "和歌山県", value: 30 },
  { label: "鳥取県", value: 31 },
  { label: "島根県", value: 32 },
  { label: "岡山県", value: 33 },
  { label: "広島県", value: 34 },
  { label: "山口県", value: 35 },
  { label: "徳島県", value: 36 },
  { label: "香川県", value: 37 },
  { label: "愛媛県", value: 38 },
  { label: "高知県", value: 39 },
  { label: "福岡県", value: 40 },
  { label: "佐賀県", value: 41 },
  { label: "長崎県", value: 42 },
  { label: "熊本県", value: 43 },
  { label: "大分県", value: 44 },
  { label: "宮崎県", value: 45 },
  { label: "鹿児島県", value: 46 },
  { label: "沖縄県", value: 47 },
];
