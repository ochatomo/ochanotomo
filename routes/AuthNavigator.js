import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Loading from "../components/Loading";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import { View } from "react-native";

const { Navigator, Screen } = createStackNavigator();

const SignInNavigator = ({ navigation }) => {
  console.log("SignIn Navigator rendering");
  return (
    <Navigator
    //   headerMode="float"
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
};

// const Drawer = createDrawerNavigator();

export const AuthNavigator = () => (
  <View style={{ flex: 1 }}>
    <NavigationContainer>
      <SignInNavigator />
    </NavigationContainer>
  </View>
);
