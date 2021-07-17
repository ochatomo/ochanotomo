import { Auth } from "aws-amplify";
import React, { useState } from "react";

import AuthNavigator from "../../routes/AuthNavigator";

import { View } from "react-native";

export default function Authenticator() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <AuthNavigator />
    </View>
  );
}
