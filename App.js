import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import { UserProvider } from "./contexts/UserContext";

import "react-native-gesture-handler";
import { AppNavigator } from "./routes/AppNavigator";

import { withAuthenticator } from "aws-amplify-react-native";

import React from "react";
import { View, StyleSheet } from "react-native";

import AppLoading from "expo-app-loading";
import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black,
} from "@expo-google-fonts/noto-sans-jp";

function App() {
  let [fontsLoaded] = useFonts({
    NotoSansJP_100Thin,
    NotoSansJP_300Light,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    NotoSansJP_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    <UserProvider>
      <AppNavigator />
    </UserProvider>;
  }
}

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
