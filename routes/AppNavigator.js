import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../components/Profile";
import Chat from "../components/Chat";
import MatchList from "../components/MatchList";
import MatchPage from "../components/MatchPage";
import Loading from "../components/Loading";
import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => {
  const { isNewUserInfo, userIdInfo, userDataInfo } = useContext(UserContext);
  const [isNewUser] = isNewUserInfo;
  const [userId] = userIdInfo;
  const [userData] = userDataInfo;

  if (isNewUser === undefined) {
    return <Loading />;
  }

  return (
    <Navigator headerMode="float">
      {isNewUser ? (
        <>
          <Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
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
            name="MatchPage"
            component={MatchPage}
            options={{ title: "MatchPage" }}
          />
          <Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
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

  //   if (isNewUser) {
  //     return (
  //       <Navigator headerMode="float">
  //         <>
  //           <Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
  //           <Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
  //           <Screen
  //             name="MatchList"
  //             component={MatchList}
  //             options={{ title: "MatchList" }}
  //           />
  //           <Screen
  //             name="MatchPage"
  //             component={MatchPage}
  //             options={{ title: "MatchPage" }}
  //           />
  //         </>
  //       </Navigator>
  //     );
  //   }

  //   if (!isNewUser || userData.id !== "") {
  //     return (
  //       <Navigator headerMode="float">
  //         <>
  //           <Screen
  //             name="MatchPage"
  //             component={MatchPage}
  //             options={{ title: "MatchPage" }}
  //           />
  //           <Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
  //           <Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
  //           <Screen
  //             name="MatchList"
  //             component={MatchList}
  //             options={{ title: "MatchList" }}
  //           />
  //         </>
  //       </Navigator>
  //     );
  //   }
};

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
