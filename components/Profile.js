// TODO
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import { Text, StyleSheet, TextInput, Button, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { UserContext } from "../contexts/UserContext";

import { createCustomer, updateCustomer } from "../src/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import { interestTable } from "../utils/helper";

export default function Profile({ setNewUser, navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;

  const [name, setName] = useState(userData.name);
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");
  const [profileText, setProfileText] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [interestList, setInterestList] = useState([{ label: "", value: "" }]);
  const [error, setError] = useState([]);

  useEffect(() => {
    if (category === "") return;
    let interestList = interestTable[category].map((interest, index) => {
      if (interest === "その他") return { label: interest, value: 99 };
      return { label: interest, value: index };
    });
    setInterestList(interestList);
  }, [category]);

  const validateInput = () => {
    if (name === "") {
      console.log("if statement with name");
      setError((errors) => [...errors, "お名前を入力してください。"]);
    }

    if (hobby === "") setError((error) => [...error, "趣味を選んでください。"]);

    if (location === "") setError((error) => [...error, "都道府県を選んでください。"]);
    if (profileText === "")
      setError((error) => [...error, "プロフィールを入力してください。"]);
    else {
      return true;
    }
  };

  const saveUserInfo = async () => {
    // databaseに保存
    setError("");
    const isValid = validateInput();
    console.log(error);

    if (!isValid) {
      console.log(error);
      return;
    }

    console.log("saving to database", category, hobby);

    if (isNewUser) {
      const user = {
        id: userId,
        name: name,
        interests: [{ category, hobby }],
        location,
        profileText,
        likes: [],
      };
      const userData = await API.graphql(
        graphqlOperation(createCustomer, { input: user })
      );
      console.log({ userData });
    } else {
      // 本当は変更があるfieldのみを投げる。

      const query = {
        id: userId,
        name,
        location,
        profileText,
        interests: [{ category, hobby }],
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
    }
    navigation.navigate("MatchPage");
  };

  return (
    <SafeAreaView>
      {error.length > 0 &&
        error.map((error, index) => {
          return <Text key="index">{error}</Text>;
        })}
      <Text>isNewUser: {String(isNewUser)}</Text>
      <Text>This is name{name}</Text>
      <Text>This is location{location}</Text>
      <Text>This is interest{hobby}</Text>
      <Text>This is profileText{profileText}</Text>
      <Text>This is gender{gender}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="名前（ニックネーム）"
        required
      />
      <RNPickerSelect
        onValueChange={setCategory}
        items={[
          { label: "音楽系", value: 0 },
          { label: "鑑賞系", value: 1 },
          { label: "美容系", value: 2 },
          { label: "旅行系", value: 3 },
          { label: "スポーツ系", value: 4 },
          { label: "アウトドア系", value: 5 },
          { label: "ゲーム系", value: 6 },
          { label: "制作系", value: 7 },
          { label: "育成系", value: 8 },
          { label: "飲食系", value: 9 },
          { label: "スキル系", value: 10 },
          { label: "乗り物系", value: 11 },
          { label: "芸術系", value: 12 },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "趣味を教えてください", value: "" }}
        Icon={() => (
          <Text
            style={{
              position: "absolute",
              right: 95,
              top: 10,
              fontSize: 18,
              color: "#789",
            }}
          >
            ▼
          </Text>
        )}
      />
      <RNPickerSelect
        onValueChange={setHobby}
        items={interestList}
        style={pickerSelectStyles}
        placeholder={{ label: "趣味を教えてください", value: "" }}
        Icon={() => (
          <Text
            style={{
              position: "absolute",
              right: 95,
              top: 10,
              fontSize: 18,
              color: "#789",
            }}
          >
            ▼
          </Text>
        )}
      />

      <TextInput
        style={styles.input}
        onChangeText={setProfileText}
        value={userData.profileText || profileText}
        placeholder="自己紹介"
      />
      <RNPickerSelect
        onValueChange={setLocation}
        items={[
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
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "都道府県を選択してください", value: "" }}
        Icon={() => (
          <Text
            style={{
              position: "absolute",
              right: 95,
              top: 10,
              fontSize: 18,
              color: "#789",
            }}
          >
            ▼
          </Text>
        )}
      />
      <RNPickerSelect
        onValueChange={setGender}
        items={[
          { label: "女性", value: "女性" },
          { label: "男性", value: "男性" },
          { label: "秘密", value: "秘密" },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "性別を教えてください", value: "" }}
        Icon={() => (
          <Text
            style={{
              position: "absolute",
              right: 95,
              top: 10,
              fontSize: 18,
              color: "#789",
            }}
          >
            ▼
          </Text>
        )}
      />
      <Button
        onPress={saveUserInfo}
        title="保存する"
        color="#841584"
        accessibilityLabel="保存ボタン"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#789",
    borderRadius: 4,
    color: "#789",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 300,
    marginLeft: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#789",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: 280,
    marginLeft: 30,
    backgroundColor: "#eee",
  },
});
