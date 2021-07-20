import * as ImagePicker from "expo-image-picker";
import AWS from "aws-sdk";
import * as FileSystem from "expo-file-system";
import Amplify, { Storage } from "aws-amplify";

// import fs from 'react-native-fs';
import { decode } from "base64-arraybuffer";
import config from "../src/aws-exports";

const S3_BUCKET = config.aws_user_files_s3_bucket;
const REGION = config.aws_user_files_s3_bucket_region;

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

// AWS.config.update({
//   accessKeyId:,
//   secretAccessKey:
// });

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

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

export const uploadFile = async (uri, filename) => {
  //   console.log("+++++++++++++++", uri, id);

  // const base64 = await FileSystem.readFile(selectedFile.uri, 'base64');
  let base64;

  try {
    base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // console.log("*************", base64);
    // console.log("starting decoding");
    // const arrayBuffer = await decode(base64);
    const arrayBuffer = await decode(base64);

    Storage.put(filename, arrayBuffer, { ACL: "public-read" })
      .then((res) => console.log("successful upload", res))
      .catch((err) => console.log("error in uploading", err));
    // const params = {
    //   ACL: "public-read",
    //   Body: arrayBuffer,
    //   Bucket: S3_BUCKET,
    //   Key: filename, //user_idに変える
    // };

    // const res = await myBucket
    //   .putObject(params)
    //   .on("httpUploadProgress", (evt) => {
    //     // setProgress(Math.round((evt.loaded / evt.total) * 100));
    //   })
    //   .send((err) => {
    //     if (err) console.log(err);
    //   });
    // console.log("@@@@@@@@@@@@@", arrayBuffer.byteLength);
    // return res;
  } catch (e) {
    console.log(e);
  }
};
