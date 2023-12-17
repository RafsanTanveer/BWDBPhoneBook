import React, { useRef, useEffect,useContext } from 'react';
import { Button, StyleSheet, View, Text, StatusBar, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { height, width } from '../utility/ScreenDimensions'
import { ThemeContext } from "../context/ThemeContext";

const bwdbLogo = '../assets/bwdb-logo-splscrn.jpg'

const SplashScreen = () => {

  const { currentTheme } = useContext(ThemeContext);


  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);

  return (
    <View style={styles.animationContainer}>
      <StatusBar animated={true} backgroundColor='white' />
      <Image style={{ height: width * .7, width: width * .7 }} source={require(bwdbLogo)} ></Image>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width * .25,
          height: width * .25,
          margin:5
        }}
        speed={1.25}
        source={require('../assets/lottie/Animation - 1701159542137.json')}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});


export default SplashScreen