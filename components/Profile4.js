// TODO
// *  editしたプロフィールなどがリアルタイムで見れるようにする。
// * only update the modified field in updateCustomer

import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Alert,
  Button,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import {
  handleChoosePhoto,
  uploadFile,
  getExtension,
  handleTakePhoto,
} from "../utils/photohelper";

import { UserContext } from "../contexts/UserContext";

import { createCustomer, updateCustomer } from "../src/graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

import { globalStyles } from "../styles/globalStyle.js";

export default function Profile4({ route, navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData, setUserData] = userDataInfo;
  const { name, location, profileText, gender, category, hobby } = route.params;
  const [uri, setUri] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);

  const validateInput = () => {
    //data validation あれば
    return true;
  };

  const saveUserInfo = async (photoUrl) => {
    console.log("saving to database", photoUrl);

    if (isNewUser) {
      const user = {
        id: userId,
        name: name,
        interests: [{ category, hobby }],
        location,
        profileText,
        likes: [],
        gender,
        photo: photoUrl,
      };
      setUserData(user);

      await API.graphql(graphqlOperation(createCustomer, { input: user }));
      // console.log({ userData });
    } else {
      // 本当は変更があるfieldのみを投げる。

      const query = {
        id: userId,
        name,
        location,
        profileText,
        interests: [{ category, hobby }],
        gender,
        photo: photoUrl,
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
    }
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.imgContainer}>
        <Image style={globalStyles.largeLogo} source={require("../assets/photo.png")} />
      </View>
      <Text style={globalStyles.header}>写真をアップロードする</Text>

      {photoSelected && (
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: `${uri}`,
          }}
        />
      )}

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          onPress={async () => {
            setPhotoSelected(false);
            const result = await handleTakePhoto();

            if (result !== undefined) {
              setUri(result);
              setPhotoSelected(true);
            }
          }}
        >
          <Image
            style={globalStyles.largeLogo}
            source={require("../assets/photo-upload.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            setPhotoSelected(false);

            const result = await handleChoosePhoto();
            console.log({ result });
            if (result !== undefined) {
              setUri(result);
              setPhotoSelected(true);
            }
          }}
        >
          <Image
            style={globalStyles.largeLogo}
            source={require("../assets/cellphone.png")}
          />
        </TouchableOpacity>
      </View>

      <Button
        onPress={async () => {
          if (!photoSelected) return;
          const extension = getExtension(uri);
          console.log({ extension });
          const photoUrl = `https://photo152330-dev.s3.ap-northeast-1.amazonaws.com/${userData.id}.${extension}`;
          //   setUrl(
          //     `https://photo152330-dev.s3.ap-northeast-1.amazonaws.com/${userData.id}.${extension}`
          //   );
          console.log(photoUrl);
          const res = await uploadFile(uri, userData.id, extension);
          console.log("response------", res.error);
          if (!res.error) {
            saveUserInfo(photoUrl);
          }
        }}
        title="保存する"
      />

      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile3");
          }}
        >
          <AntDesign name="leftcircle" size={56} color="#F3B614" />
        </TouchableOpacity>
        <Text style={globalStyles.header}> 4 of 4 </Text>

        <TouchableOpacity
          onPress={() => {
            // photo validation
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

const styles = StyleSheet.create({});
