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

      console.log(`%c user_id : ${id} `, consoleStyle2);
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

const consoleStyle =
  "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)";

const consoleStyle2 = "background:red;color:white;font-size:20px";
