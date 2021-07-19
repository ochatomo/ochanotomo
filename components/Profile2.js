// TODO
// PROFILE 2 : LOCATION & GENDER
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";
import { globalStyles } from "../styles/globalStyle";

export default function Profile2({ route, navigation }) {
  const { userDataInfo, isNewUserInfo } = useContext(UserContext);
  const [userData] = userDataInfo;
  const [isNewUser] = isNewUserInfo;
  const { name, profileText } = route.params;

  const [location, setLocation] = useState(userData.location);
  const [gender, setGender] = useState(userData.gender);
  console.log({ location, gender });

  const validateInput = () => {
    const errors = [];
    if (name === "") {
      errors.push("* 性別を教えてください。");
    }
    if (profileText === "") {
      errors.push("* 都道府県を選んでください。");
    }
    return errors;
  };

  return (
    <View style={globalStyles.viewContainer}>
      <View style={globalStyles.imgContainer}>
        <Image
          style={globalStyles.largeLogo}
          source={require("../assets/profile_logo.png")}
        />
      </View>

      <Text style={globalStyles.header}>プロフィールを編集する</Text>

      <Text style={globalStyles.inputLabel}>お住まいは……</Text>

      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={Number(location) || ""}
            onValueChange={setLocation}
          >
            {isNewUser && (
              <Picker.Item
                label={"都道府県"}
                value={""}
                color="#0094CE"
                key={"placeholder"}
                enabled={false}
                style={styles.pickerlabel}
              />
            )}
            {prefectures.map((data, index) => (
              <Picker.Item
                label={data.label}
                value={data.value}
                color="#0094CE"
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>
      <Text style={globalStyles.inputLabel}>性別を教えてください。</Text>

      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={gender || ""}
            onValueChange={setGender}
          >
            {isNewUser && (
              <Picker.Item
                label={"性別"}
                value={""}
                color="#0094CE"
                key={"placeholder"}
                enabled={false}
                style={styles.pickerlabel}
              />
            )}
            {genderOptions.map((data, index) => (
              <Picker.Item
                label={data.label}
                value={data.value}
                color="#0094CE"
                key={index}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
        </TouchableOpacity>
        <Text style={globalStyles.header}> 2 of 4 </Text>

        <TouchableOpacity
          onPress={() => {
            const errors = validateInput();
            // console.log({ errors });

            if (errors.length > 0) {
              Alert.alert("入力エラー", errors.join("\n"), [
                { text: "OK", onPress: () => console.log("alert closed") },
              ]);
            } else {
              navigation.navigate("Profile3", {
                name,
                location,
                gender,
                location,
                profileText,
              });
            }
          }}
        >
          <AntDesign name="rightcircle" size={56} color="#27AE60" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const genderOptions = [
  { label: "女性", value: "女性" },
  { label: "男性", value: "男性" },
  { label: "その他", value: "その他" },
  { label: "回答しない", value: "回答しない" },
];
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

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    height: 50,
  },
  pickerContainer: {
    width: 280,
    borderWidth: 2,
    borderColor: "#0094CE",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  container: {
    alignItems: "center",
  },
});
