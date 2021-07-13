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

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";

import { createCustomer, updateCustomer } from "../src/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import { interestTable } from "../utils/helper";
// import { BackgroundButton } from "../styles/BackgroundButton";

export default function Profile3({ route, navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;
  const { name, location, profileText, gender } = route.params;

  const [hobby, setHobby] = useState("");
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
    console.log("validating");
    switch (true) {
      case category === "":
        setError((error) => [...error, "趣味を教えてください。"]);
        break;

      case hobby === "":
        setError((error) => [...error, "趣味を教えてください。"]);
        break;

      default:
        return true;
    }
  };

  const saveUserInfo = async () => {
    console.log("saving to database", category, hobby);

    if (isNewUser) {
      const user = {
        id: userId,
        name: name,
        interests: [{ category, hobby }],
        location,
        profileText,
        likes: [],
        gender,
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
        gender,
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
    }
    navigation.navigate("MatchPage");
  };
  const handleCategory = (value) => {
    let interestList = interestTable[value].map((interest, index) => {
      if (interest === "その他") return { label: interest, value: 99 };
      return { label: interest, value: index };
    });
    setInterestList(interestList);
    console.log("setting interest with", interestList);
    setCategory(value);
  };

  const handleHobby = (hobby) => {
    console.log("setting hobby with ", hobby);
    setHobby(hobby);
  };

  return (
    <SafeAreaView>
      {error.length > 0 &&
        error.map((error, index) => {
          return <Text key="index">{error}</Text>;
        })}

      <View style={styles.imgContainer}>
        <Image style={styles.logo} source={require("../assets/active_icon.png")} />
      </View>
      <Text style={styles.header}>
        {isNewUser ? "趣味を教えてください" : "趣味を編集する"}
      </Text>

      {category === "" ? (
        <View>
          <FlatList
            numColumns={3}
            data={categories}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCategory(item.value)}>
                <Text style={styles.categoryLabel}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View>
          <View style={styles.iconRight}>
            <TouchableOpacity
              onPress={() => {
                setHobby("");
                setCategory("");
              }}
            >
              <AntDesign name="closecircle" size={56} color="#EC5E56" />
            </TouchableOpacity>
          </View>
          <FlatList
            numColumns={3}
            data={interestList}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleHobby(item.value);
                  // saveUserInfo();
                }}
              >
                <Text
                  style={hobby === item.value ? styles.selectedLabel : styles.hobbyLabel}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile2");
          }}
        >
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
        </TouchableOpacity>
        <Text style={styles.header}> 3 of 4 </Text>

        <TouchableOpacity
          onPress={() => {
            const isValid = validateInput();
            if (isValid) {
              console.log("data is valid, saving to database");
              saveUserInfo();
              console.log("successfully saved the data");

              navigation.navigate("MatchPage");
            }
          }}
        >
          <AntDesign name="rightcircle" size={56} color="#27AE60" />
        </TouchableOpacity>
      </View>
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
  iconRight: {
    alignItems: "flex-end",
    marginHorizontal: 15,
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
  categoryLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0094CE",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  hobbyLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#B725D4",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
    marginHorizontal: 3,
    marginVertical: 5,
  },
  selectedLabel: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#004DA9",
    borderRadius: 44,
    paddingBottom: 12,
    paddingTop: 12,
    paddingRight: 24,
    paddingLeft: 24,
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

const categories = [
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
];
