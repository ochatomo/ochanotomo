import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";

import AuthNavigator from "../../routes/AuthNavigator";
import config from "../../src/aws-exports";

import { View } from "react-native";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

export default function Authenticator() {
  useEffect(() => {
    console.log("Inside Authenticator");
    (async () => {
      try {
        const user = await Auth.currentUserInfo();
        console.log("user-----", user);
        if (user) return;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <AuthNavigator />
    </View>
  );
}
