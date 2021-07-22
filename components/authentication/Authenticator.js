import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";

import AuthNavigator from "../../routes/AuthNavigator";
import config from "../../src/aws-exports";
import Loading from "../Loading";
import { View, Dimensions } from "react-native";

import { globalStyles } from "../../styles/globalStyle";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

export default function Authenticator() {
  const [userChecked, setUserChecked] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const user = await Auth.currentUserInfo();
        // console.log("user-----", user);
        setUserChecked(true);
        if (user) return;
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  if (!userChecked) {
    return <Loading />;
  } else {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
      >
        <AuthNavigator />
      </View>
    );
  }
}
