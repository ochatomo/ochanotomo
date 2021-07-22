import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { globalStyles } from "../../styles/globalStyle";
import Onboarding from 'react-native-onboarding-swiper';


const Skip = ({ skipLabel, ...props }) => (
  <Button
    title='スキップする'
    {...props}>
  </Button>
);

const Next = ({ ...props }) => (
  <Button
    title={'次のページ'}
    {...props}
  />
);

// const Done = ({ ...props }) => (
//   <TouchableOpacity
//   style={{marginHorizontal:10}}
//     {...props}
//   > <Text style={{fontSize:18}}>Done</Text>
//   </TouchableOpacity>
// );

const OnBoarding = ({ navigation }) => (
  <Onboarding
    style={styles.container}
    SkipButtonComponent={Skip}
    NextButtonComponent={Next}
    // DoneButtonComponent={Done}
        onSkip={() => navigation.navigate("SignUp")}
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
          //   title: <Text style={styles.title}>簡単</Text>,
          // subtitle: "Something here",
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
    },
    subtitle: {
      fontSize: 24,
      alignItems: 'center'
    },
    photo: {
      width: 200,
      height: 200,
    },
  });