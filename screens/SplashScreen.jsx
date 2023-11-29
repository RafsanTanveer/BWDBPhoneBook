import React, { useRef, useEffect,useContext } from 'react';
import { Button, StyleSheet, View, Text, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { height, width } from '../utility/ScreenDimensions'
import { ThemeContext } from "../context/ThemeContext";



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
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width * .95,
          height: width * .95,
        }}
        speed={1.25}
        source={require('../assets/lottie/Animation - 1701159542137.json')}
      />
      <Text style={{ fontSize: 15, fontWeight: '400' }} ></Text>
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