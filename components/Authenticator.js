import { Auth } from "aws-amplify";
import React, { useState } from "react";

import { globalStyles } from "../styles/globalStyle";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { View } from "react-native";

export default function Authenticator({ navigation }) {
  const [showSignIn, setShowSignIn] = useState(true);
  //   console.count("Authenticator loading,");

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {showSignIn ? (
        <SignIn setShowSignIn={setShowSignIn} />
      ) : (
        <SignUp setShowSignIn={setShowSignIn} />
      )}
    </View>
  );
}
