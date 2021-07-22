import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import Confirmation from "../components/authentication/Confirmation";
import PasswordReset from "../components/authentication/PasswordReset";
import PasswordConfirmation from "../components/authentication/PasswordConfirmation";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigator() {
  // console.log("Auth navigator");
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

export default AuthNavigator;
