import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Input,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AWS from "aws-sdk";
import * as FileSystem from "expo-file-system";

// import fs from 'react-native-fs';
import { decode } from "base64-arraybuffer";

const S3_BUCKET = "photo152330-dev";
const REGION = "ap-northeast-1";

AWS.config.update({
  accessKeyId: "AKIAVHOKQNOERIAHSXXG",
  secretAccessKey: "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",
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default function Photo({ route, navigation }) {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const { userIdInfo } = useContext(UserContext);
  const [userId] = userIdInfo;

  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      aspect: [4, 3],
      quality: 1,
    });
    console.log("------------", result.uri);
    setSelectedFile(result);
  };

  const uploadFile = async () => {
    console.log("+++++++++++++++", selectedFile);

    // const base64 = await FileSystem.readFile(selectedFile.uri, 'base64');
    let base64;

    try {
      base64 = await FileSystem.readAsStringAsync(selectedFile.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // console.log("*************", base64);
      console.log("starting decoding");
      // const arrayBuffer = await decode(base64);
      const arrayBuffer = await decode(base64);
      const params = {
        ACL: "public-read",
        Body: arrayBuffer,
        Bucket: S3_BUCKET,
        Key: `${userId}.png`, //user_idに変える
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) console.log(err);
        });
      console.log("@@@@@@@@@@@@@", arrayBuffer.byteLength);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>Native SDK File Upload Progress is {progress}%</Text>
      <TouchableOpacity onPress={() => handleChoosePhoto()}>
        <Text>写真を選んでね</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => uploadFile()}>
        <Text>決定！</Text>
      </TouchableOpacity>
    </View>
  );
}
