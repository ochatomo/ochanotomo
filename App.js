import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import { withAuthenticator } from "aws-amplify-react-native";

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withAuthenticator(App, {
  usernameAttributes: "email",
  signUpConfig: {
    hideAllDefaults: true,
    signUpFields: [
      {
        label: "Birthdate",
        key: "birthdate",
        placeholder: "生年月日を入力してください（例：1960-01-20）",
        required: true,
        displayOrder: 3,
        type: "date",
      },
      {
        label: "Email",
        key: "username",
        placeholder: "Enter your email",
        required: true,
        displayOrder: 1,
        type: "string",
      },
      {
        label: "Password",
        key: "password",
        placeholder: "Enter password",
        required: true,
        displayOrder: 2,
        type: "password",
      },
    ],
  },
});
