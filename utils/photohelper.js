import * as ImagePicker from "expo-image-picker";
import AWS from "aws-sdk";
import * as FileSystem from "expo-file-system";

// import fs from 'react-native-fs';
import { decode } from "base64-arraybuffer";

const S3_BUCKET = "photo101957-production";
const REGION = "ap-northeast-1";

AWS.config.update({
  accessKeyId: "AKIAVHOKQNOERIAHSXXG",
  secretAccessKey: "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",
});
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
  //   console.log("------------", result.uri);
  //   const extension  = getExtensionn(result.uri);
  return result.uri;
  //   setSelectedFile(result);
};

export const getExtension = (uri) => {
  const ext = uri.split(".").pop();
  return ext;
  // const extension = uri.slice(uri.length - 4, uri.length);
  // if (extension.includes(".")) {
  //   return extension.slice(1);
  // } else {
  //   return extension;
  // }
};

export const handleTakePhoto = async (userId) => {
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: "Images",
    aspect: [4, 3],
    quality: 1,
  });
  //   console.log("------------", result.uri);
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
    console.log("starting decoding");
    // const arrayBuffer = await decode(base64);
    const arrayBuffer = await decode(base64);
    const params = {
      ACL: "public-read",
      Body: arrayBuffer,
      Bucket: S3_BUCKET,
      Key: filename, //user_idに変える
    };

    const res = await myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
    console.log("@@@@@@@@@@@@@", arrayBuffer.byteLength);
    return res;
  } catch (e) {
    console.log(e);
  }
};
