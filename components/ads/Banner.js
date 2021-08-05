import React from "react";
import { Platform, View } from "react-native";
import { AdMobBanner } from "expo-ads-admob";

export default function BannerAd() {
  const bannerError = () => {
    console.log("Ad Fail error");
  };

  return (
    <View>
      <AdMobBanner
        adSize="fullbanner"
        adUnitID={
          __DEV__
            ? "ca-app-pub-3940256099942544/6300978111"
            : Platform.select({
                ios: "ca-app-pub-4269855195582744/7177215774",
                android: "ca-app-pub-4269855195582744/7177215774",
              })
        }
        onDidFailToReceiveAdWithError={bannerError}
      />
    </View>
  );
}
