// TODO
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  Alert,
  StyleSheet,
  Modal,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { UserContext } from "../contexts/UserContext";

import { interestTable } from "../utils/helper";
import { globalStyles } from "../styles/globalStyle.js";

export default function Profile3({ route, navigation }) {
  const { isNewUserInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const { name, location, profileText, gender } = route.params;

  const [hobby, setHobby] = useState("");
  const [category, setCategory] = useState("");
  const [interestList, setInterestList] = useState([{ label: "", value: "" }]);
  const [error, setError] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (category === "") return;
    let interestList = interestTable[category].map((interest, index) => {
      if (interest === "その他") return { label: interest, value: 99 };
      return { label: interest, value: index };
    });
    setInterestList(interestList);
  }, [category]);

  const validateInput = () => {
    // console.log("validating");
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

  const handleCategory = (value) => {
    let interestList = interestTable[value].map((interest, index) => {
      if (interest === "その他") return { label: interest, value: 99 };
      return { label: interest, value: index };
    });
    setInterestList(interestList);
    setCategory(value);
    setShowModal(true);
  };

  return (
    <View style={globalStyles.viewContainer}>
      <View>
        <View style={globalStyles.imgContainer}>
          <Image
            style={globalStyles.largeLogo}
            source={require("../assets/active_icon.png")}
          />
        </View>
        <Text style={globalStyles.header}>
          {isNewUser ? "趣味を教えてください" : "趣味を編集する"}
        </Text>
      </View>
      <View style={[styles.container, globalStyles.flexColumn]}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={categories}
          keyExtractor={(item) => item.label}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCategory(item.value)}>
              <Text
                style={
                  category === item.value
                    ? globalStyles.selectedCategoryLabel
                    : globalStyles.categoryLabel
                }
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={globalStyles.modalContainer}>
          <View style={[styles.labelContainer, globalStyles.boxShadow]}>
            <View style={[styles.largeContainer, globalStyles.flexColumn]}>
              <View style={globalStyles.iconRight}>
                <TouchableOpacity
                  onPress={() => {
                    setHobby("");
                    setCategory("");
                    setShowModal(false);
                  }}
                >
                  <AntDesign name="closecircle" size={56} color="#EC5E56" />
                </TouchableOpacity>
              </View>

              <FlatList
                contentContainerStyle={[styles.flatListContainer, globalStyles.boxShadow]}
                data={interestList}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setShowModal(false);
                      setHobby(item.value);

                      if (category === "") {
                        Alert.alert("入力エラー", "趣味を選んでください。", [
                          { text: "OK", onPress: () => console.log("alert closed") },
                        ]);
                        return;
                      }

                      Alert.alert(
                        "趣味はこちらよろしいですか？",
                        `カテゴリー：${categories[category].label}\n趣味：${
                          interestTable[category][item.value] || "その他"
                        }`,
                        [
                          {
                            text: "やり直す",
                            onPress: () => {
                              setCategory("");
                              setHobby("");
                            },
                            style: "cancel",
                          },
                          {
                            text: "これでいい",
                            onPress: () => {
                              navigation.navigate("Profile4", {
                                name,
                                profileText,
                                gender,
                                location,
                                hobby,
                                category,
                              });
                            },
                          },
                        ]
                      );
                    }}
                  >
                    <Text
                      style={
                        hobby === item.value
                          ? globalStyles.selectedLabel
                          : globalStyles.hobbyLabel
                      }
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile2");
          }}
        >
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
        </TouchableOpacity>
        <Text style={globalStyles.header}> 3 of 4 </Text>

        <TouchableOpacity
          onPress={() => {
            if (category === "" || hobby == "") {
              Alert.alert("入力エラー", "趣味を選んでください。", [
                { text: "OK", onPress: () => console.log("alert closed") },
              ]);
            }
            const isValid = validateInput();
            if (isValid) {
              // console.log("moving to profile4");
              // saveUserInfo();
              // console.log("successfully saved the data");

              navigation.navigate("Profile4", {
                name,
                profileText,
                gender,
                location,
                hobby,
                category,
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

const styles = StyleSheet.create({
  flatListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  labelContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginHorizontal: 10,

    paddingVertical: 10,
  },
  container: {
    height: 300,
    width: "100%",
  },
  largeContainer: {
    minHeight: 200,
    maxHeight: "100%",
    width: "100%",
  },
});
