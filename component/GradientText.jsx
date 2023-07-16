import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


const GradientText = (props) => {
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={["#27285C", "#27285C","#27285C",]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text {...props} style={[props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText

const styles = StyleSheet.create({})