import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Next = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <Text style={{ fontSize: 22, padding: 15, marginBottom: 10 }}>次</Text>
  </TouchableOpacity>
);

const Skip = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <Text style={{ fontSize: 22, padding: 15, marginBottom: 10 }}>スキップ</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity {...props}>
    <Text style={{ fontSize: 22, padding: 15, marginBottom: 10 }}>完成</Text>
  </TouchableOpacity>
);

const OnBoarding = ({ navigation }) => (
  <Onboarding
    style={styles.container}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    SkipButtonComponent={Skip}
    onSkip={() => navigation.navigate("SignUp")}
    onDone={() => navigation.navigate("SignUp")}
    pages={[
      {
        backgroundColor: "#ffff",
        image: (
          <Image source={require("../../assets/tea-friends0.png")} style={styles.photo} />
        ),
        title: <Text style={styles.title}>{`新しい友達、\nお茶トモを作ろう`}</Text>,
        subtitle: <Text style={styles.subtitle}>趣味が近いユーザーをアプリが提案</Text>,
      },
      {
        backgroundColor: "#BEB87E",
        image: (
          <Image source={require("../../assets/tea-friends1.png")} style={styles.photo} />
        ),
        title: <Text style={styles.title}>趣味を分かち合おう</Text>,
        subtitle: <Text style={styles.subtitle}>お茶トモとチャットで話そう</Text>,
      },
      {
        backgroundColor: "#FEE589",
        image: (
          <Image source={require("../../assets/tea-friends2.png")} style={styles.photo} />
        ),
        title: <Text style={styles.title}>{`人生経験豊かな\n大人専用だから安心`}</Text>,
        subtitle: (
          <Text style={styles.subtitle}>
            {`「友達作り」を目的とした、\n50歳以上限定のアプリ`}
          </Text>
        ),
      },
    ]}
  />
);

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    color: "#8E4D2F",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    alignItems: "center",
    color: "#8E4D2F",
    textAlign: "center",
  },
  photo: {
    width: 200,
    height: 200,
  },
});
