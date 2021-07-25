import React from "react";
import { Platform, View } from "react-native";
import { AdMobInterstitial } from "expo-ads-admob";

async function Interstitial() {
  if (__DEV__) {
    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // テスト広告
  } else {
    if (Platform.OS === "ios") {
      AdMobInterstitial.setAdUnitID("ca-app-pub-4269855195582744/7445874741"); //iOS
    } else {
      AdMobInterstitial.setAdUnitID("ca-app-pub-4269855195582744/7445874741"); //android
    }
  }
  await AdMobInterstitial.requestAdAsync();
  await AdMobInterstitial.showAdAsync();
}

export default Interstitial;
