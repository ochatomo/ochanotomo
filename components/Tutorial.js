import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  View,
  StyleSheet,
} from "react-native";
import { globalStyles } from "../styles/globalStyle";

export default function Tutorial({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.tutorialHeading}>
        <Text style={globalStyles.header}>御茶ノ水トモの使い方</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProfilePage");
          }}
        >
          <Text style={globalStyles.iconLabel}>プロフィールページに戻る</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tutorialContainer}>
        <Image style={styles.tutorialVideo} source={require("../assets/screencap.gif")} />
      </View>
      <View style={styles.startAppContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
          <Text style={globalStyles.label}>御茶ノトモを開始します!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    flexDirection: "column",
  },
  tutorialHeading: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  tutorialContainer: {
    backgroundColor: "#F6DFD4",
    flex: 4,
    alignItems: "center",
  },
  startAppContainer: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tutorialVideo: {
    width: "75%",
    height: "100%",
    alignItems: "center",
    alignSelf: "center",
  },
});
