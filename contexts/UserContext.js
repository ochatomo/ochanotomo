import React, { useState, createContext, useEffect } from "react";
import { Auth } from "aws-amplify";

import { listCustomers } from "../src/graphql/queries";

import {
  getCustomerWithMatches,
  onUpdateCustomerWithMatches,
} from "../src/graphql/customQueries";
import { API, graphqlOperation } from "aws-amplify";

export const UserContext = createContext();

export function UserProvider(props) {
  const [isNewUser, setIsNewUser] = useState();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    gender: "",
    location: "",
    photo: "",
    profileText: "",
    likes: [],
    matches: [],
  });
  const [matches, setMatches] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  async function getCurrentAuthenticatedUser() {
    const userInfo = await Auth.currentUserInfo();
    const id = userInfo.username;
    setUserId(id);

    // console.log(`%c user_id : ${id} `, consoleStyle2);
    return id;
  }
  async function getCurrentUserInfo(userId) {
    try {
      // check Customer table to find the current user
      const res = await API.graphql(
        graphqlOperation(getCustomerWithMatches, { id: userId })
      );
      const userData = res.data.getCustomer;
      if (userData) {
        setUserData(userData);
        const matches = userData.matches.items.map((item, index) => {
          // console.log({ index, item });
          return {
            name: item.customer.name,
            id: item.customer.id,
            photo: item.customer.photo,
          };
        });
        setMatches(matches);
        // setMatches(userData.matches.items);
        setIsNewUser(false);

        // console.log("setting userdata", userData);
        // console.log(`%c username: ${userData.name}`, consoleStyle2);
      } else {
        setIsNewUser(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchAllCustomers() {
    const allCustomersData = await API.graphql(graphqlOperation(listCustomers));
    setAllCustomers(allCustomersData.data.listCustomers.items);
  }

  useEffect(() => {
    getCurrentAuthenticatedUser().then(async (id) => {
      await fetchAllCustomers();
      await getCurrentUserInfo(id);

      // subscribe to realtime database, listen to onUpdateCustomer
    });
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateCustomerWithMatches)
    ).subscribe({
      next: (data) => {
        // console.log("updateCustomer", data.value.data.onUpdateCustomer);

        const newUserData = data.value.data.onUpdateCustomer;
        if (newUserData.id === userId) {
          // update everything except the matches
          const update = {
            id: newUserData.id,
            name: newUserData.name,
            gender: newUserData.gender,
            location: newUserData.location,
            interests: newUserData.interests,
            photo: newUserData.photo,
            profileText: newUserData.profileText,
            likes: newUserData.likes,
            matches: userData.matches,
          };
          // console.log("updateCustomer", update);

          setUserData(update);
        }
      },
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [userData]);

  return (
    <UserContext.Provider
      value={{
        isNewUserInfo: [isNewUser, setIsNewUser],
        userIdInfo: [userId, setUserId],
        userDataInfo: [userData, setUserData],
        allCustomerData: [allCustomers, setAllCustomers],
        matchesData: [matches, setMatches],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

const consoleStyle =
  "font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)";

const consoleStyle2 = "background:red;color:white;font-size:20px";
