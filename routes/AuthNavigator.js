import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import Confirmation from "../components/authentication/Confirmation";
import PasswordReset from "../components/authentication/PasswordReset";
import PasswordConfirmation from "../components/authentication/PasswordConfirmation";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigator() {
  console.log("Auth navigator");
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Confirmation" component={Confirmation} />
        <Screen name="PasswordReset" component={PasswordReset} />
        <Screen name="PasswordConfirmation" component={PasswordConfirmation} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
