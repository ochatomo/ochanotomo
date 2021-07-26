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
  AntDesign
} from "react-native";

export default function Tutorial({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.tutorialHeading}>
      <TouchableOpacity>
          <Text>戻る</Text>
        </TouchableOpacity>
        <Text>How to use this app</Text>
        </View>
      <View style={styles.tutorialContainer}>
        <Image
          style={styles.tutorialVideo}
          source={require("../assets/screencap.gif")} />
        </View>
      <View style={styles.startAppContainer}>
        <TouchableOpacity
        onPress={() => navigation.navigate("ProfilePage")}>
          <Text>Start OchaNoTomo!</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'column',
  },
  tutorialHeading: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tutorialContainer: {
    backgroundColor: 'blue',
    flex: 4,
    alignItems: 'center',
  },
  startAppContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tutorialVideo: {
    width: '80%',
    height: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
