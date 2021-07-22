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
  Modal,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import {
  handleChoosePhoto,
  uploadFile,
  getExtension,
  handleTakePhoto,
} from "../utils/photohelper";

import { UserContext } from "../contexts/UserContext";

import { globalStyles } from "../styles/globalStyle.js";

import config from "../src/aws-exports";

const S3_BUCKET = config.aws_user_files_s3_bucket;

export default function Profile4({ route, navigation }) {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData, setUserData] = userDataInfo;
  const { name, location, profileText, gender, category, hobby } = route.params;
  const [uri, setUri] = useState("");
  const [photoSelected, setPhotoSelected] = useState(false);

  return (
    <View style={globalStyles.viewContainer}>
      <View>
        <View style={globalStyles.imgContainer}>
          <Image style={globalStyles.largeLogo} source={require("../assets/photo.png")} />
        </View>
        <Text style={globalStyles.header}>写真をアップロードする</Text>
        <Text style={globalStyles.text}>ご自身の顔写真をアップロードしてください。</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={photoSelected}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={[globalStyles.modalContainer, { backgroundColor: "rgba(0,0,0,0.5)" }]}
        >
          <Text style={[globalStyles.categoryLabel, styles.prompt]}>
            この写真でよろしいですか？
          </Text>
          <View style={styles.photoPreviewContainer}>
            <View style={[globalStyles.iconRight, styles.cancelIcon]}>
              <TouchableOpacity
                onPress={() => {
                  setPhotoSelected(false);
                }}
              >
                <AntDesign name="closecircle" size={56} color="#EC5E56" />
              </TouchableOpacity>
            </View>
            <Image
              style={styles.photoPreview}
              source={{
                uri: `${uri}`,
              }}
            />
          </View>
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setPhotoSelected(false);
              }}
            >
              <Text style={[styles.textBtn, { backgroundColor: "#EC5E56" }]}>
                やり直す
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                if (!photoSelected) return;
                const extension = getExtension(uri);
                //   console.log({ extension });
                const photoUrl = `https://${S3_BUCKET}.s3.ap-northeast-1.amazonaws.com/public/${userId}.${extension}`;
                // console.log("photourl", photoUrl);
                // const res = await uploadFile(uri, userData.id, extension);
                //   console.log("response------", res.error);

                navigation.navigate("ProfilePreview", {
                  name,
                  profileText,
                  location,
                  gender,
                  photo: photoUrl,
                  uri,
                  filename: `${userId}.${extension}`,
                  category,
                  hobby,
                });
              }}
            >
              <Text style={[styles.textBtn, { backgroundColor: "#27AE60" }]}>
                これにする！
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={[globalStyles.flexColumn, styles.logoContainer]}
          onPress={async () => {
            setPhotoSelected(false);

            const result = await handleChoosePhoto();
            // console.log({ result });
            if (result !== undefined) {
              setUri(result);
              setPhotoSelected(true);
            }
          }}
        >
          <Image style={styles.cameraLogo} source={require("../assets/cellphone.png")} />
          <Text style={styles.label}>携帯から</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.flexColumn, styles.logoContainer]}
          onPress={async () => {
            // console.log("handle take photo running");
            setPhotoSelected(false);
            const result = await handleTakePhoto();
            // console.log("take photo result", result);

            if (result !== undefined) {
              setUri(result);
              setPhotoSelected(true);
            }
          }}
        >
          <Image
            style={styles.cameraLogo}
            source={require("../assets/photo-upload.png")}
          />
          <Text style={styles.label}>今写真を撮る</Text>
        </TouchableOpacity>
      </View>

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
            // move to profile preview for final confirmation
            // const isValid = validateInput();
            // if (isValid) {
            //   console.log("data is valid, saving to database");
            //   saveUserInfo();
            //   console.log("successfully saved the data");
            //   navigation.navigate("Home", { screen: "MatchPage" });
            // }
          }}
        >
          <AntDesign name="rightcircle" size={56} style={{ opacity: 0 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBtn: {
    borderRadius: 44,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    paddingVertical: 13,
    paddingHorizontal: 24,
    marginHorizontal: 10,
  },
  cancelIcon: {
    position: "absolute",
    zIndex: 1,
    right: 5,
    backgroundColor: "white",
    borderRadius: 35,
  },

  photoPreview: {
    width: "100%",
    height: "100%",
  },
  photoSmallPreview: {
    height: 100,
    width: 100,
  },
  photoPreviewContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 350,
    width: 350,
  },
  cameraLogo: {
    width: 80,
    height: 80,
    marginHorizontal: "auto",
  },
  label: {
    backgroundColor: "#004DA9",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 44,
    color: "white",
    fontWeight: "bold",
  },
  logoContainer: {
    height: 150,
    justifyContent: "space-evenly",
  },
});
