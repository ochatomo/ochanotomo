import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});
import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

import { UserProvider } from "./contexts/UserContext";
import { useFonts, KosugiMaru_400Regular } from "@expo-google-fonts/kosugi-maru";

import AppNavigator from "./routes/AppNavigator";
import AuthNavigator from "./routes/AuthNavigator";

function App() {
  LogBox.ignoreAllLogs();
  const [userChecked, setUserChecked] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  let [fontsLoaded] = useFonts({
    KosugiMaru_400Regular,
  });

  const checkUser = async () => {
    // check if the user is already signedIn
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

  // if signedin, show AppNavigator, if not show AuthNavigator
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
