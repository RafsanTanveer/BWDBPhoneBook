import { View, Text } from 'react-native'
import { width, height } from '../utility/ScreenDimensions'
import { ThemeContext } from "../context/ThemeContext";
import React, { useContext, useState, useEffect } from "react";
import Slider from '../component/carousel/Slider'

const WelcomeScreen = () => {

  const { currentTheme, } = useContext(ThemeContext);


  return (
    <View style={{ flex: 1, borderRadius: 10, borderColor: `${currentTheme}`, borderWidth: 2, margin: width * 0.02 }}>
      <Slider />
    </View>
  )
}

export default WelcomeScreen