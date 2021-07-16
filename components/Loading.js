// TODO
// * improve styling

import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/globalStyle";

export default function Loading() {
  return (
    <View style={[globalStyles.flexColumn, { height: "100%" }]}>
      <Image
        style={globalStyles.largeLogo}
        source={require("../assets/ochatomo-logo.png")}
      />
      <Text style={globalStyles.header}>Ochatomo</Text>
    </View>
  );
}
