import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Images } from '../utility/Images'
import { width, height } from '../utility/ScreenDimensions'
const developedBy = '../assets/empdirscrshot.jpg'

import { ThemeContext } from '../context/ThemeContext'


const AboutScreen = () => {

    const { currentTheme } = useContext(ThemeContext);


    return (
        <View style={{ alignItems: 'center', backgroundColor: `${currentTheme}20`, flex: 1 }}>
            <View style={{ paddingVertical: width * 0.1 }} >
                <Text style={{ fontSize: width * 0.06, fontWeight: '700', textAlign: 'center' }} >BWDB EMPLOYEE DIRECTORY</Text>
            </View>
            <View style={{}} >
                <Image
                    source={require(developedBy)}
                    style={{
                        width: width * .7,
                        height: height * .45,
                    }}
                    resizeMode="contain"
                />
            </View>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingVertical: width * 0.05 }} >Version : 1.0</Text>
            <Text style={{ fontSize: width * 0.04, fontWeight: '500', paddingBottom: width * 0.02 }} >Design & Developed by</Text>
            <Text style={{ fontSize: width * 0.055, fontWeight: '700', paddingBottom: width * 0.005 }} >Rafsan Zani Rabbi</Text>
            <Text
                style={{
                    fontSize: width * 0.035,
                    fontWeight: '500',
                    paddingBottom: width * 0.02,
                    color: '#0066cc',
                    textDecorationLine: 'underline'
                }}
                onPress={() => {
                    // Open the link in browser
                    // For Expo: import * as Linking from 'expo-linking'
                    // For bare React Native: import { Linking } from 'react-native'
                    // Here is a generic approach:
                    import('react-native').then(({ Linking }) => {
                        Linking.openURL('https://rafsantanveer.xyz');
                    });
                }}
            >
                rafsantanveer.xyz
            </Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02 }} >Assistant Programmer</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02, textAlign: 'center' }} >Human Resourse Development Directorate, BWDB</Text>
        </View>
    )
}

export default AboutScreen