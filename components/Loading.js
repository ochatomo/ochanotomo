// TODO
// * improve styling

import React from "react";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../styles/style";

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
