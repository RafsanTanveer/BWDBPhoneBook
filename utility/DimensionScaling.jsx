import { View, Text, Dimensions, PixelRatio } from 'react-native'
import React from 'react'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen');
const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;


const normalize = (size, based = 'width') => {
    const newSize = (based === 'height') ?
        size * heightBaseScale : size * widthBaseScale; return Math.round(PixelRatio.roundToNearestPixel(newSize));
}


//for width  pixel
const widthPixel = (size) => { return normalize(size, 'width'); };
//for height  pixel
const heightPixel = (size) => { return normalize(size, 'height'); };
//for font  pixel
const fontPixel = (size) => { return heightPixel(size); };
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size) => { return heightPixel(size); };
//for Margin and Padding horizontal pixel  
const pixelSizeHorizontal = (size) => { return widthPixel(size); };

export {
    SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH, widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal
};


