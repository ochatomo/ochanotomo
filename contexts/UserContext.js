import React, { useState, createContext, useEffect } from "react";
import { Auth } from "aws-amplify";

import { listCustomers } from "../src/graphql/queries";

import {
  getCustomerWithMatches,
  onUpdateCustomerWithMatches,
} from "../src/graphql/customQueries";
import { API, graphqlOperation } from "aws-amplify";
import moment from "moment";

export const UserContext = createContext();

export function UserProvider(props) {
  const setSignedIn = props.setSignedIn;
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
    premiumUntil: "",
  });
  const [isPremium, setIsPremium] = useState(false);
  const [matches, setMatches] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  async function getCurrentAuthenticatedUser() {
    const id = (await Auth.currentUserInfo()).username;
    setUserId(id);
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
        console.log({ userData });
        if (userData.subscriptionID) {
          // check premium until date
          setIsPremium(true);
        } else if (userData.premiumUntil) {
          const a = moment(userData.premiumUntil);
          const b = moment(new Date());
          const diff = b.diff(a);

          if (diff < 0) {
            setIsPremium(true);
          }
        }

        const matches = userData.matches.items.map((item, index) => {
          return {
            name: item.customer.name,
            id: item.customer.id,
            photo: item.customer.photo,
          };
        });
        setMatches(matches);
        setIsNewUser(false);
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
            subscriptionID: newUserData.subscriptionID,
          };

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
        premiumData: [isPremium, setIsPremium],
        signInState: [setSignedIn],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
