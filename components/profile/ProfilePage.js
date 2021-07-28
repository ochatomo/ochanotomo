import React, { useContext, useState } from "react";
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
import { handleTakePhoto } from "../../utils/photohelper";
import moment from "moment";

export default function ProfilePage({ navigation }) {
  const { userDataInfo, premiumData, signInState } = useContext(UserContext);
  const [userData] = userDataInfo;
  const [isPremium, setIsPremium] = premiumData;
  const [loading, setLoading] = useState(false);
  const [setSignedIn] = signInState;

  async function signOut() {
    try {
      await Auth.signOut();
      setSignedIn(false);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function hanldeCancel() {
    Alert.alert("確認", "本当にプレミアム会員を止めますか", [
      {
        text: "いいえ",
        style: "cancel",
      },
      {
        text: "はい",
        onPress: cancelSubscription,
      },
    ]);
  }

  async function cancelSubscription() {
    if (!isPremium) return;

    setLoading(true);
    console.log("cancel subscription");
    try {
      const response = await API.post("ochatomoStripe", "/payment/cancel-subscription", {
        body: { subscriptionID: userData.subscriptionID },
      });
      const { status, current_period_end } = response;
      console.log(response);
      const premiumUntil = moment.unix(current_period_end).format("YYYY-MM-DD");
      if (status === "canceled") {
        console.log({ premiumUntil });
        const query = {
          id: userData.id,
          subscriptionID: null,
          premiumUntil: premiumUntil,
        };
        await API.graphql(graphqlOperation(updateCustomer, { input: query }));
        // setIsPremium(false);
        Alert.alert(
          "完了",
          `プレミアム会員がキャンセルされました。\n現在のメンバーシップは${premiumUntil}まで有効です。`,
          [
            {
              text: "OK",
              onPress: () => {},
            },
          ]
        );
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
          onPress={hanldeCancel}
          style={{ display: userData.subscriptionID ? "flex" : "none" }}
          disabled={loading}
        >
          <Text style={globalStyles.textLink}>プレミアム会員をやめる</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Tutorial");
          }}
        >
          <Text style={[globalStyles.textLink]}>御茶ノ友の使い方</Text>
        </TouchableOpacity> */}
      </View>
      <View style={globalStyles.flexRow}>
        <Profile userData={userData} isPremium={isPremium} />
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

const Profile = ({ userData, isPremium }) => {
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
        <View style={[globalStyles.flexRow]}>
          <Text style={[globalStyles.header, styles.username]}>{userData.name}</Text>
          {isPremium && (
            <Image
              style={styles.badge}
              source={require("../../assets/premium-user-r.png")}
            />
          )}
        </View>
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
    width: "100%",
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
  badge: {
    width: 45,
    height: 45,
    position: "absolute",
    right: 10,
  },
});
