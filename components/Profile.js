// TODO
// * data validation for textInput
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import { UserContext } from "../contexts/UserContext";

import { createCustomer, updateCustomer } from "../src/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default function Profile({ setNewUser, navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;

  console.log("This is userData from Context", userData);
  console.log("isNewUser from Context", isNewUser);
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [location, setLocation] = useState("");
  const [profileText, setProfileText] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    console.log("Profile loading");
  }, []);

  const saveUserInfo = async () => {
    // databaseに保存
    const user = {
      id: userId,
      name,
      interests: [interest],
      location,
      profileText,
    };
    if (isNewUser) {
      const userData = await API.graphql(
        graphqlOperation(createCustomer, { input: user })
      );
      console.log({ userData });
    } else {
      // 本当は変更があるfieldのみを投げる。
      const query = { id: userId, name, location, profileText };
      const userData = await API.graphql(
        graphqlOperation(updateCustomer, { input: query })
      );
    }
    navigation.navigate("MatchPage");
  };

  return (
    <SafeAreaView>
      <Text>isNewUser: {String(isNewUser)}</Text>
      <Text>This is name{name}</Text>
      <Text>This is location{location}</Text>
      <Text>This is interest{interest}</Text>
      <Text>This is profileText{profileText}</Text>
      <Text>This is gender{gender}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={userData.name || name}
        placeholder="名前（ニックネーム）"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInterest}
        value={interest}
        placeholder="趣味"
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
          { label: "北海道", value: "北海道" },
          { label: "青森県", value: "青森県" },
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
      {/* <option value="1">北海道</option>
        <option value="2">青森県</option>
        <option value="3">岩手県</option>
        <option value="4">宮城県</option>
        <option value="5">秋田県</option>
        <option value="6">山形県</option>
        <option value="7">福島県</option>
        <option value="8">茨城県</option>
        <option value="9">栃木県</option>
        <option value="10">群馬県</option>
        <option value="11">埼玉県</option>
        <option value="12">千葉県</option>
        <option value="13">東京都</option>
        <option value="14">神奈川県</option>
        <option value="15">新潟県</option>
        <option value="16">富山県</option>
        <option value="17">石川県</option>
        <option value="18">福井県</option>
        <option value="19">山梨県</option>
        <option value="20">長野県</option>
        <option value="21">岐阜県</option>
        <option value="22">静岡県</option>
        <option value="23">愛知県</option>
        <option value="24">三重県</option>
        <option value="25">滋賀県</option>
        <option value="26">京都府</option>
        <option value="27">大阪府</option>
        <option value="28">兵庫県</option>
        <option value="29">奈良県</option>
        <option value="30">和歌山県</option>
        <option value="31">鳥取県</option>
        <option value="32">島根県</option>
        <option value="33">岡山県</option>
        <option value="34">広島県</option>
        <option value="35">山口県</option>
        <option value="36">徳島県</option>
        <option value="37">香川県</option>
        <option value="38">愛媛県</option>
        <option value="39">高知県</option>
        <option value="40">福岡県</option>
        <option value="41">佐賀県</option>
        <option value="42">長崎県</option>
        <option value="43">熊本県</option>
        <option value="44">大分県</option>
        <option value="45">宮崎県</option>
        <option value="46">鹿児島県</option>
        <option value="47">沖縄県</option> */}
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
