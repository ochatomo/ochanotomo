import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyle";
import { generateInterestLabel, prefectureList } from "../utils/helper";
import { UserContext } from "../contexts/UserContext";

import { createCustomer, updateCustomer } from "../src/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";


import { uploadFile } from "../utils/photohelper";

export default function ProfilePreview({ route, navigation }) {
  const { name, profileText, location, gender, category, hobby, photo, uri, filename } =
    route.params;
  const currentUserData = {
    name,
    profileText,
    location,
    gender,
    interests: [{ category, hobby }],
    photo,
  };
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser, setIsNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData, setUserData] = userDataInfo;

  const saveUserInfo = async () => {
    if (isNewUser) {
      const user = {
        ...currentUserData,
        id: userId,
        likes: [],
      };
      setUserData(user);

      await API.graphql(graphqlOperation(createCustomer, { input: user }));
      setIsNewUser(false);
    } else {
      const query = {
        id: userId,
        ...currentUserData,
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
    }
  };

  return (
    <View style={globalStyles.viewContainer}>
      
      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          style={globalStyles.flexColumn}
          onPress={() => navigation.goBack()}
        >
          <AntDesign
            name="leftcircle"
            size={50}
            color="#F3B614"
            style={globalStyles.logo}
          />
          <Text style={globalStyles.iconLabel}>やり直す</Text>
        </TouchableOpacity>

       

        <TouchableOpacity
          style={globalStyles.flexColumn}
          onPress={async () => {
            await uploadFile(uri, filename);

            await saveUserInfo();

            Alert.alert(
              "ユーザー情報が保存されました",
              "チュートリアルを見てみませんか？",
              [
                {
                  text: "Start Tutorial",
                  onPress: () => navigation.navigate("Tutorial")
                },
                {
                  text: "Start Ochanotomo",
                  onPress: () => navigation.navigate("Home", { screen: "MatchPage" }),
                },
              ]


              // "ユーザー情報が保存されました",
              // "早速お茶トモを探しにいきましょう！",
              // [
              //   {
              //     text: "OK",
              //     onPress: () => navigation.navigate("Home", { screen: "MatchPage" }),
              //   },
              // ]
            );
          }}
        >
          <Image source={require("../assets/save.png")} style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>保存する</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={globalStyles.header}>確認画面</Text>
        <Text style={globalStyles.text}>保存してよろしいですか？</Text>
      </View>
      <View style={globalStyles.flexRow}>
        <Profile userData={currentUserData} uri={uri} />
      </View>
    </View>
  );
}

const Profile = ({ userData, uri }) => {
  return (
    <View style={[globalStyles.profileContainer, globalStyles.flexColumn]}>
      <Image source={{ uri: uri }} style={styles.profilePhoto} />
      <Text style={globalStyles.header}>{userData.name}</Text>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        性別
      </Text>
      <Text style={globalStyles.text}>{userData.gender}</Text>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        都道府県
      </Text>
      <Text style={globalStyles.text}>{prefectureList[userData.location]}</Text>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        趣味・関心事
      </Text>
      <View style={styles.interests}>{generateInterestLabel(userData.interests)}</View>
      <Text style={[globalStyles.smallTextLabel, { textAlign: "left", width: "100%" }]}>
        自己紹介
      </Text>
      <View style={[styles.profileTextContainer, globalStyles.boxShadow]}>
        <Text style={globalStyles.text}>{userData.profileText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: 236,
    height: 195,

    // borderRadius: 100,
  },
  profileTextContainer: {
    width: "100%",
    backgroundColor: "#F8F4F4",
    borderRadius: 19,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
