import React from "react";
import { Platform, View, Alert } from "react-native";
import { AdMobInterstitial } from "expo-ads-admob";

async function Interstitial() {
  if (__DEV__) {
    Alert.alert("devだよ", "ｓだｈｋｊｓｄｈさｊｋ");

    AdMobInterstitial.setAdUnitID("ca-app-pub-3940256099942544/1033173712"); // テスト広告
  } else {
    if (Platform.OS === "ios") {
      Alert.alert("iOSです", "ｓだｈｋｊｓｄｈさｊｋ");

      AdMobInterstitial.setAdUnitID("ca-app-pub-4269855195582744/7445874741"); //iOS
    } else {
      Alert.alert("アンドロイドです", "ｓだｈｋｊｓｄｈさｊｋ");
      AdMobInterstitial.setAdUnitID("ca-app-pub-4269855195582744/7445874741"); //android
    }
  }
  await AdMobInterstitial.requestAdAsync();
  await AdMobInterstitial.showAdAsync();
}

export default Interstitial;
