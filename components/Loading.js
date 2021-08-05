// TODO
// * improve styling

import React from "react";
import { View, Image } from "react-native";
import { globalStyles } from "../styles/globalStyle";

export default function Loading() {
  return (
    <View style={[globalStyles.flexColumn, { height: "100%" }]}>
      <Image
        style={globalStyles.extraLargeLogo}
        source={require("../assets/ochatomo-logo.png")}
      />
    </View>
  );
}
