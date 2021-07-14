import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";

import AWS from "aws-sdk";

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

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = (file) => {
    console.log(file);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name, //user_idに変える
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: "https://photo152330-dev.s3.ap-northeast-1.amazonaws.com/Screen+Shot+2021-07-13+at+9.24.47+AM.png",
        }}
      />
    </div>
  );
}
