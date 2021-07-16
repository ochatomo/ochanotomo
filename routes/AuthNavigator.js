import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigator() {
  console.log("Auth navigator");
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Navigator headerMode="float">
        <Screen name="SignIn" component={SignIn} />
        <Screen name="SignUp" component={SignUp} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
