import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../styles/globalStyle";
import Onboarding from 'react-native-onboarding-swiper';

const Welcome = () => (
    <Onboarding
        onDone={() => console.log('done')}
        style={styles.container}
      pages={[
        {
          backgroundColor: '#ffff',
              image: <Image source={require('../assets/circle.png')}
                            style={styles.imageContainer}
                            style={styles.photo}/>,
          title: 'Onboarding',
          subtitle: 'あなたは決して一人ではない',
        },
        {
          backgroundColor: '#fe6e58',
            image: <Image source={require('../assets/square.png')}
            style={styles.imageContainer}
                          style={styles.photo}/>,
          title: 'The Title',
          subtitle: '友達を探す',
        },
        {
          backgroundColor: '#999',
            image: <Image source={require('../assets/triangle.png')}
            style={styles.imageContainer}
                          style={styles.photo}/>,
          title: 'Triangle',
          subtitle: "人生を生きよう!",
        },
      ]}
    />
  );
  
  export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    imageContainer: {
        flex: 2.5,
        backgroundColor: "green"
    },
    onboardingMessageContainer: {
        flex: 2,
        backgroundColor: "blue"
    },
    photo: {
        width: 300,
        height: 300,
        alignItems: "center"
      },
  });