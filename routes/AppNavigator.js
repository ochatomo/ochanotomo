import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../components/Profile";
import Profile2 from "../components/Profile2";
import Profile3 from "../components/Profile3";
import Profile4 from "../components/Profile4";
import Chat from "../components/Chat";
import MatchList from "../components/MatchList";
import MatchPage from "../components/MatchPage";
import ProfilePage from "../components/ProfilePage";
import Loading from "../components/Loading";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator>
    <Tab.Screen name="ProfilePage" component={ProfilePage} />
    <Tab.Screen name="MatchPage" component={MatchPage} />
    <Tab.Screen name="MatchList" component={MatchList} />
  </Tab.Navigator>
);

export const AppNavigator = () => {
  const { isNewUserInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;

  if (isNewUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isNewUser ? "Profile" : "Home"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MatchPage" component={MatchPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
        <Stack.Screen
          name="Profile2"
          component={Profile2}
          options={{ title: "Profile2" }}
        />
        <Stack.Screen
          name="Profile3"
          component={Profile3}
          options={{ title: "Profile3" }}
        />
        <Stack.Screen
          name="Profile4"
          component={Profile4}
          options={{ title: "Profile4" }}
        />
        <Stack.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
        <Stack.Screen
          name="MatchList"
          component={MatchList}
          options={{ title: "MatchList" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
