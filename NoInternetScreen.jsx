import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';




const NoInternetScreen = () => {
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
                    width: 150,
                    height: 150,                  
                }}       
                speed={1.5} 
                source={require('./assets/38624-no-network.json')}           
            />
            <Text style={{fontSize:20, fontWeight:'400'}} >No Internet Connection</Text>
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


export default NoInternetScreen