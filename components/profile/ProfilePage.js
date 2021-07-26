import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Dimensions,
  Button,
} from "react-native";
import { Colors } from "../../styles/color";

import { UserContext } from "../../contexts/UserContext";
import { AntDesign } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { globalStyles } from "../../styles/globalStyle";
import { generateInterestLabel, prefectureList } from "../../utils/helper";
import { ScrollView } from "react-native-gesture-handler";
import { API, graphqlOperation } from "aws-amplify";
import { updateCustomer } from "../../src/graphql/mutations";

export default function ProfilePage({ navigation }) {
  const { userDataInfo, premiumData } = useContext(UserContext);
  const [userData] = userDataInfo;
  const [isPremium, setIsPremium] = premiumData;

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function cancelSubscription() {
    if (!userData.subscriptionID) return;
    const response = await API.post("ochatomoStripe", "/payment/cancel-subscription", {
      body: { subscriptionID: userData.subscriptionID },
    });
    console.log(response);
    if (response.status === "canceled") {
      const query = {
        id: userData.id,
        subscriptionID: null,
      };
      await API.graphql(graphqlOperation(updateCustomer, { input: query }));
      setIsPremium(false);
      alert("subscriptionが中止されました。");
    }
  }
  return (
    <SafeAreaView style={globalStyles.viewContainer}>
      <View style={globalStyles.iconContainer}>
        <TouchableOpacity style={globalStyles.flexColumn} onPress={signOut}>
          <AntDesign name="logout" size={30} color="#F3B614" style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>ログアウトする</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.flexColumn}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image source={require("../../assets/edit.png")} style={globalStyles.logo} />
          <Text style={globalStyles.iconLabel}>プロフィール編集</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.iconContainer}>
        <TouchableOpacity
          onPress={cancelSubscription}
          style={{ display: isPremium ? "flex" : "none" }}
        >
          <Text style={globalStyles.textLink}>プレミアム会員をやめる</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tutorial");
          }}
        >
          <Text style={[globalStyles.textLink]}>御茶ノ友の使い方</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.flexRow}>
        <Profile userData={userData} />
      </View>

      <TouchableOpacity
        onPress={() => {
          // pass matches to MatchList
          navigation.navigate("MatchPage");
        }}
      >
        <Text style={globalStyles.label}>お茶トモを探そう！</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const Profile = ({ userData }) => {
  return (
    <View
      style={[
        globalStyles.profileContainer,
        globalStyles.flexColumn,
        globalStyles.boxShadow,
        { backgroundColor: Colors.bg2 },
      ]}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollviewContainer, globalStyles.flexColumn]}
      >
        <Image
          source={{ uri: `${userData.photo}?+${new Date()}` }}
          style={globalStyles.profilePhoto}
        />
        <Text style={[globalStyles.header, styles.username]}>{userData.name}</Text>
        <Text style={[globalStyles.smallTextLabel, { alignSelf: "flex-start" }]}>
          都道府県
        </Text>
        <Text style={globalStyles.infoText}>{prefectureList[userData.location]}</Text>
        <Text style={[globalStyles.smallTextLabel, { alignSelf: "flex-start" }]}>
          趣味・関心事
        </Text>
        <View style={styles.interests}>{generateInterestLabel(userData.interests)}</View>
        <Text style={[globalStyles.smallTextLabel, { alignSelf: "flex-start" }]}>
          自己紹介
        </Text>
        {/* <ScrollView style={styles.scrollviewContainer}> */}
        <View style={[styles.profileTextContainer, globalStyles.boxShadow]}>
          <Text style={globalStyles.profileText}>{userData.profileText}</Text>
        </View>
        {/* </ScrollView> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  username: {
    color: Colors.secondary2,
  },
  profileTextContainer: {
    width: "100%",
    backgroundColor: "#F8F4F4",
    borderRadius: 19,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollviewContainer: {
    width: "100%",
    maxHeight: Dimensions.get("window").height * 2,
  },
});
