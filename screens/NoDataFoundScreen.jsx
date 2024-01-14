import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import {height, width} from '../utility/ScreenDimensions'


const NoDataFoundScreen = ({designation}) => {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer}>
            {/* <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: width * .4,
                    height: width * .4,
                }}
                speed={1.5}
                source={require('../assets/lottie/107420-no-data-loader.json')}
            /> */}
            <Text style={{ fontSize: width * .045, fontWeight: '600', color: 'gray', textAlign: 'center' }} >No one has been appointed as {'\n'} {designation} {'\n'}yet</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height:500
    },
    buttonContainer: {
        paddingTop: 10,
    },
});


export default NoDataFoundScreen