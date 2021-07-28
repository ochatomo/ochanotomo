import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

// LogBox.ignoreAllLogs(disbale);

import { UserProvider } from "./contexts/UserContext";

import AppLoading from "expo-app-loading";
import { useFonts, KosugiMaru_400Regular } from "@expo-google-fonts/kosugi-maru";

import "react-native-gesture-handler";
import { AppNavigator } from "./routes/AppNavigator";

import Authenticator from "./components/authentication/Authenticator";
import { withAuthenticator } from "aws-amplify-react-native";

import React from "react";

function App() {
  console.disableYellowBox = true;
  let [fontsLoaded] = useFonts({
    KosugiMaru_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    );
  }
}

export default withAuthenticator(App, false, [<Authenticator />]);
