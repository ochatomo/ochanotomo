import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";
import OnBoarding from "../components/authentication/OnBoarding";
import Tutorial from "../components/Tutorial";
import Confirmation from "../components/authentication/Confirmation";
import PasswordReset from "../components/authentication/PasswordReset";
import PasswordConfirmation from "../components/authentication/PasswordConfirmation";

const { Navigator, Screen } = createStackNavigator();

function AuthNavigator({ setSignedIn }) {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="SignIn">
          {(props) => <SignIn {...props} setSignedIn={setSignedIn} />}
        </Screen>
        <Screen name="OnBoarding" component={OnBoarding} />
        <Screen name="Tutorial" component={Tutorial} />
        <Screen name="SignUp" component={SignUp} />
        <Screen name="Confirmation" component={Confirmation} />
        <Screen name="PasswordReset" component={PasswordReset} />
        <Screen name="PasswordConfirmation" component={PasswordConfirmation} />
      </Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
