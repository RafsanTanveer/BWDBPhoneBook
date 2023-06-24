import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { imgSizeMini, txtSizeNormal, txtSizeBig } from "../utility/Scalling";
import {useFonts} from 'expo-font'
const { width, height } = Dimensions.get('window');

import ExpendableDrawer from "./ExpendableDrawer";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const image = 'https://0.academia-photos.com/20936688/5794344/6584685/s200_rafsan.tanveer.jpg';
const name = 'Arif Ikramul Azim';
const designation = 'Addl. Director General'

const DrawerContent = (props) => {


    const [fontsLoaded] = useFonts({
        'imperial-normal': require('../assets/fonts/imperial-normal.ttf'),
    });

    const navigation = useNavigation();
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);


    // presentDesig, setpresentDesig, presentOffice, setpresentOffice  `${currentTheme}`  #B2A8CF

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{
                backgroundColor: `${currentTheme}95`, //backgroundColor: `${currentTheme}50`,  for opacity
                height: 200,
                flexDirection: 'row',
                paddingVertical: 15,
                paddingHorizontal: 5
            }}>
                <View style={{ flex: 2, height: width * .25, width: width * .25, paddingTop: 5 }}>
                    <Image style={{ height: width * .22, width: width * .22, borderRadius: 70 }} source={{ uri: "data:image/jpeg;base64," + photo }} />
                </View>
                <View style={{ flex: 3.5 }}>
                    <Text style={{ fontSize: width * .04, fontWeight: '600' }}>{name}</Text>
                    <Text style={{ fontSize: width * .033, marginTop: 3 }}>{presentPost} {presentCharge === 'C' ? ',CC' : ''}</Text>
                    <Text style={{ fontSize: width * .033, marginTop: 3 }}>{presentOffice}</Text>
                    <Text style={{ fontSize: width * .033, marginTop: 3 }}>{officeAddres}</Text>
                </View>
            </View>
            <View style={{


                left: width * .15,
                justifyContent: 'center',
                marginTop: height * .235,
                // marginLeft:width*.15,
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: `${currentTheme}`,
                borderRadius: height * .005,
                marginHorizontal: 5,
                marginVertical:5,
                paddingVertical: 1,
                paddingHorizontal: 10,
                elevation:55,
                position: 'absolute',
                zIndex:120
            }}>
                <Text style={{
                    color: 'white',
                    height: height * (1 / 40),
                    fontSize: txtSizeNormal,
                    fontFamily: 'imperial-normal',
                }}>RAFSAN ZANI RABBI</Text>
            </View>

            <DrawerContentScrollView style={{ backgroundColor: "#ffffff",marginTop:10 }} {...props}>
                <ExpendableDrawer />
            </DrawerContentScrollView>

            <TouchableOpacity style={{ backgroundColor: '#ffffff' }} onPress={() => {
                logout();
            }}>
                <View style={{ margin: 20, backgroundColor: `${currentTheme}95`, height: 30, width: 80, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>

                    <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>Logout</Text>

                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DrawerContent
