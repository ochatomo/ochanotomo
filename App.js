import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import { UserProvider } from "./contexts/UserContext";

import AppLoading from "expo-app-loading";

import { useFonts, KosugiMaru_400Regular } from "@expo-google-fonts/kosugi-maru";

import "react-native-gesture-handler";
import { AppNavigator } from "./routes/AppNavigator";

import AuthNavigator from "./routes/AuthNavigator";
import Authenticator from "./components/authentication/Authenticator";
import { withAuthenticator } from "aws-amplify-react-native";
import { Text, View, LogBox } from "react-native";

import React, { useState, useEffect } from "react";

function App() {
  LogBox.ignoreAllLogs();
  const [userChecked, setUserChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  let [fontsLoaded] = useFonts({
    KosugiMaru_400Regular,
  });

  const checkUser = async () => {
    const user = await Auth.currentUserInfo();
    user ? setSignedIn(true) : setSignedIn(false);
    setUserChecked(true);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (!userChecked || !fontsLoaded) {
    return <AppLoading />;
  }

  if (!signedIn) {
    return <AuthNavigator setSignedIn={setSignedIn} />;
  } else {
    return (
      <UserProvider setSignedIn={setSignedIn}>
        <AppNavigator />
      </UserProvider>
    );
  }
}

export default App;
