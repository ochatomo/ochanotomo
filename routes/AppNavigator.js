import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Entypo } from "@expo/vector-icons";

import Profile from "../components/profile/Profile";
import Profile2 from "../components/profile/Profile2";
import Profile3 from "../components/profile/Profile3";
import Profile4 from "../components/profile/Profile4";
import ProfilePreview from "../components/profile/ProfilePreview";
import ProfilePage from "../components/profile/ProfilePage";
import Chat from "../components/Chat";
import MatchList from "../components/MatchList";
import MatchPage from "../components/MatchPage";
import Loading from "../components/Loading";
import Payment from "../components/Payment";
import Tutorial from "../components/Tutorial";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Colors } from "../styles/color";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.primary1,
      style: { height: 65, paddingBottom: 5 },
      labelStyle: { fontSize: 10, fontWeight: "bold" },
    }}
  >
    <Tab.Screen
      name="ProfilePage"
      component={ProfilePage}
      options={{
        tabBarLabel: "プロフィール",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="MatchPage"
      component={MatchPage}
      options={{
        tabBarLabel: "探す",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cup" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="MatchList"
      component={MatchList}
      options={{
        tabBarLabel: "チャット",
        tabBarIcon: ({ color, size }) => <Entypo name="chat" size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isNewUserInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;

  if (isNewUser === undefined) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isNewUser ? "Profile" : "Home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />

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
        <Stack.Screen
          name="ProfilePreview"
          component={ProfilePreview}
          options={{ title: "ProfilePreview" }}
        />
        <Stack.Screen name="Payment" component={Payment} options={{ title: "Payment" }} />
        <Stack.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
          options={{ title: "Tutorial" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
