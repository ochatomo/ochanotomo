import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Profile from "../components/Profile";
import Profile2 from "../components/Profile2";
import Profile3 from "../components/Profile3";
import Photo from "../components/Photo";
import Chat from "../components/Chat";
import MatchList from "../components/MatchList";
import MatchPage from "../components/MatchPage";
import ProfilePage from "../components/ProfilePage";
import Loading from "../components/Loading";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = ({ navigation }) => {
  const { isNewUserInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;

  if (isNewUser === undefined) {
    return <Loading />;
  }

  return (
    <Navigator
      headerMode="float"
      // screenOptions={{
      //   headerShown: false,
      // }}
    >
      {isNewUser ? (
        <>
          <Screen
            name="Profile"
            component={Profile}
            options={{ headerOption: <Header navigation={navigation} /> }}
          />
          <Screen name="Profile2" component={Profile2} options={{ title: "Profile2" }} />
          <Screen name="Profile3" component={Profile3} options={{ title: "Profile3" }} />
          <Screen name="Photo" component={Photo} options={{ title: "Photo" }} />
          <Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ title: "プロフィール" }}
          />

          <Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
          <Screen
            name="MatchList"
            component={MatchList}
            options={{ title: "MatchList" }}
          />

          <Screen
            name="MatchPage"
            component={MatchPage}
            options={{ title: "MatchPage" }}
          />
        </>
      ) : (
        <>
          <Screen
            name="Photo"
            component={Photo}
            options={{ headerTitle: () => <Header /> }}
          />
          <Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ headerTitle: () => <Header /> }}
          />

          <Screen
            name="MatchPage"
            component={MatchPage}
            // options={{ headerTitle: () => <Header /> }}
          />
          <Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
          <Screen name="Profile2" component={Profile2} options={{ title: "Profile2" }} />
          <Screen name="Profile3" component={Profile3} options={{ title: "Profile3" }} />
          {/* <Screen name="Photo" component={Photo} options={{ title: "Photo" }} /> */}

          <Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
          <Screen
            name="MatchList"
            component={MatchList}
            options={{ title: "MatchList" }}
          />
        </>
      )}
    </Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
    </Drawer.Navigator>
  </NavigationContainer>
);
