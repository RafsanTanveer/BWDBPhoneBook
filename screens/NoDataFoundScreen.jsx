import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';




const NoDataFoundScreen = () => {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width: 200,
                    height: 200,
                }}
                speed={1.5}
                source={require('../assets/lottie/107420-no-data-loader.json')}
            />
            <Text style={{ fontSize: 20, fontWeight: '400' }} >No Data Found</Text>
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


export default NoDataFoundScreen