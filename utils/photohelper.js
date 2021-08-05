import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

import Amplify, { Storage } from "aws-amplify";

import { decode } from "base64-arraybuffer";
import config from "../src/aws-exports";

export const handleChoosePhoto = async (userId) => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
    aspect: [4, 3],
    quality: 1,
  });

  return result.uri;
};

export const getExtension = (uri) => {
  const ext = uri.split(".").pop();
  return ext;
};

export const handleTakePhoto = async (userId) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: "Images",
    aspect: [4, 3],
    quality: 1,
  });
  return result.uri;
};

const resizePhoto = async (uri) => {
  try {
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: "jpeg" }
    );
    return resizedPhoto.uri;
  } catch (e) {
    console.log("error in resizing photo", e);
  }
};

export const uploadFile = async (uri, filename) => {
  const resizedUri = await resizePhoto(uri);
  let base64;
  try {
    base64 = await FileSystem.readAsStringAsync(resizedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const arrayBuffer = await decode(base64);
    const res = Storage.put(filename, arrayBuffer, { ACL: "public-read" });
    return res;
  } catch (error) {
    return error;
  }
};
