import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  View
} from "react-native";
import { globalStyles } from "../../styles/globalStyle";
import Onboarding from 'react-native-onboarding-swiper';

const Next = ({ ...props }) => (
  <TouchableOpacity
    {...props}>
  <Text style={{fontSize:22, padding:15, marginBottom: 10}}>次</Text>
  </TouchableOpacity>
);

const Skip = ({ ...props }) => (
  <TouchableOpacity
    {...props}>
  <Text style={{fontSize:22, padding:15, marginBottom: 10}}>スキップ</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    {...props}>
  <Text style={{fontSize:22, padding:15, marginBottom: 10}}>完成</Text>
  </TouchableOpacity>
);

const OnBoarding = ({ navigation }) => (
  <Onboarding
    style={styles.container}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    SkipButtonComponent={Skip}
        
        onDone={() => navigation.navigate("SignUp")}
      pages={[
        {
          backgroundColor: '#ffff',
              image: <Image source={require('../../assets/tea-friends0.png')} style={styles.photo}/>,      
          title: <Text style={styles.title}>楽しい</Text>,
          subtitle: <Text style={styles.subtitle}>あなたは決して一人ではない</Text>,
        },
        {
          backgroundColor: '#BEB87E',
            image: <Image source={require('../../assets/tea-friends1.png')}
                          style={styles.photo}/>,
          title: <Text style={styles.title}>安全</Text>,
          subtitle: <Text style={styles.subtitle}>友達を探す！</Text>,
        },
        {
          backgroundColor: '#FEE589',
            image: <Image source={require('../../assets/tea-friends2.png')}
            style={styles.photo} />,
            title: <Text style={styles.title}>簡単</Text>,
          subtitle: <Text style={styles.subtitle}>人生を生きよう!</Text>,
        },
      ]}
  /> 
  );
  
  export default OnBoarding;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    title: {
      fontSize: 38,
      color: '#8E4D2F',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 24,
      alignItems: 'center',
      color: '#8E4D2F',
    },
    photo: {
      width: 200,
      height: 200,
    },
  });