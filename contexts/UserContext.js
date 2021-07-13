import React, { useState, createContext, useEffect } from "react";
import { Auth } from "aws-amplify";

import { getCustomer, listCustomers } from "../src/graphql/queries";
import { getCustomerWithMatches } from "../src/graphql/customQueries";
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
  const [allCustomers, setAllCustomers] = useState([]);

  async function getCurrentAuthenticatedUser() {
    const userInfo = await Auth.currentUserInfo();
    const id = userInfo.username;
    setUserId(id);

    console.log(`%c user_id : ${id} `, consoleStyle2);
    return id;
  }
  async function getCurrentUserInfo(userId) {
    try {
      console.log("exportできてるかな？", getCustomerWithMatches);
      // check Customer table to find the current user
      const res = await API.graphql(
        graphqlOperation(getCustomerWithMatches, { id: userId })
      );
      const userData = res.data.getCustomer;
      if (userData) {
        console.log("------Context userData", userData);
        setUserData(userData);
        setIsNewUser(false);

        console.log("setting userdata", userData);
        console.log(`%c username: ${userData.name}`, consoleStyle2);
      } else {
        setIsNewUser(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchAllCustomers() {
    const allCustomersData = await API.graphql(graphqlOperation(listCustomers));
    // console.count(
    //   "Fetching all customer info---",
    //   allCustomersData.data.listCustomers.items
    // );
    setAllCustomers(allCustomersData.data.listCustomers.items);
  }

  useEffect(() => {
    getCurrentAuthenticatedUser().then(async (id) => {
      await fetchAllCustomers();
      await getCurrentUserInfo(id);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        isNewUserInfo: [isNewUser, setIsNewUser],
        userIdInfo: [userId, setUserId],
        userDataInfo: [userData, setUserData],
        allCustomerData: [allCustomers, setAllCustomers],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

const consoleStyle =
  "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)";

const consoleStyle2 = "background:red;color:white;font-size:20px";
