import React, { useState, useEffect } from "react";

import AuthNavigator from "../../routes/AuthNavigator";

import { View } from "react-native";

import Loading from "../Loading";

import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black,
} from "@expo-google-fonts/noto-sans-jp";

export default function Authenticator() {
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
    return <Loading />;
  } else {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <AuthNavigator />
      </View>
    );
  }
}
