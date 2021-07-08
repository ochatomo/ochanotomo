import React, { useState, createContext, useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";

import { getCustomer } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export const UserContext = createContext();

export function UserProvider(props) {
  const [isNewUser, setIsNewUser] = useState();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    gender: "",
    profileText: "",
    likes: [],
    matches: [],
  });

  useEffect(() => {
    async function getCurrentAuthenticatedUser() {
      const userInfo = await Auth.currentUserInfo();
      const id = userInfo.username;
      setUserId(id);

      console.log("this is user id", id);
      return id;
    }

    // getuserInfo from backend using Auth-id
    async function getCurrentUserInfo(userId) {
      try {
        const res = await API.graphql(graphqlOperation(getCustomer, { id: userId }));
        const userData = res.data.getCustomer;
        if (userData) {
          setIsNewUser(false);
          setUserData(userData);
        } else {
          setIsNewUser(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCurrentAuthenticatedUser().then((id) => {
      getCurrentUserInfo(id);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        isNewUserInfo: [isNewUser, setIsNewUser],
        userIdInfo: [userId, setUserId],
        userDataInfo: [userData, setUserData],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
