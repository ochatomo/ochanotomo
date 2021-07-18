import Amplify, { Auth } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

import { UserProvider } from "./contexts/UserContext";

import "react-native-gesture-handler";
import { AppNavigator } from "./routes/AppNavigator";

import Authenticator from "./components/authentication/Authenticator";
import { withAuthenticator } from "aws-amplify-react-native";

import React from "react";

function App() {
  return (
    <UserProvider>
      <AppNavigator />
    </UserProvider>
  );
}

export default withAuthenticator(App, false, [<Authenticator />]);
