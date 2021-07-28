import React, { useState, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";

import AuthNavigator from "../../routes/AuthNavigator";
import config from "../../src/aws-exports";
import Loading from "../Loading";
import { View, Dimensions, LogBox } from "react-native";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

export default function Authenticator() {
  LogBox.ignoreAllLogs();
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    console.log({ userChecked });
    (async () => {
      try {
        const user = await Auth.currentUserInfo();
        if (user) return;
        setUserChecked(true);
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
