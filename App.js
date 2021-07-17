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
import AuthNavigator from "./routes/AuthNavigator";

import Authenticator from "./components/authentication/Authenticator";
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
import { useEffect } from "react/cjs/react.development";

function App({ Component, PageProps }) {
  // const [currentUser, setCurrentUser] = useState();

  useEffect(() => {});
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
    return (
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    );
  }
}

export default withAuthenticator(App, false, [<Authenticator />]);
