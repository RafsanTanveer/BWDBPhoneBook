import React, { useContext, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { imgSizeMini, txtSizeNormal, txtSizeBig } from "../utility/Scalling";
import { useFonts } from 'expo-font'
const { width, height } = Dimensions.get('window');
import { Images } from '../utility/Images';

import ExpendableDrawer from "./ExpendableDrawer";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";



const DrawerContent = (props) => {


    // const [fontsLoaded] = useFonts({
    //     'imperial-normal': require('../assets/fonts/imperial-normal.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);

    const navigation = useNavigation();
    const { userInfo, photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge, pmisId } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);


    // presentDesig, setpresentDesig, presentOffice, setpresentOffice  `${currentTheme}`  #B2A8CF

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {
                userInfo.length != 0 &&
                userInfo[0].int_ext != 'E' &&
                <View style={{
                    backgroundColor: `${currentTheme}30`,
                    //backgroundColor: `${currentTheme}50`,  for opacity
                    height: 200,
                    flexDirection: 'row',
                    paddingVertical: 15,
                    paddingHorizontal: 5
                }}>
                    <View style={{ flex: 2, height: width * .25, width: width * .25, paddingTop: 5, alignContent: 'center', justifyContent: 'center', }}>
                        <View style={{ flex: 1, flexDirection: 'column', }} >
                            <View style={{ alignContent: 'center', }} >
                                {
                                    photo ?
                                        <Image style={{ height: width * .22, width: width * .22, borderRadius: 70 }} source={{ uri: "data:image/jpeg;base64," + photo }} />
                                        :
                                        <Image style={{ height: width * .22, width: width * .22, borderRadius: 70 }} source={Images['placeHolderImg']} />

                                }
                            </View>
                            {/* <View style={{}} >
                            <Text style={{ textAlign: 'center', fontSize: width * .035, fontWeight: '700', marginTop: 5 }}>{pmisId}</Text>
                        </View> */}
                        </View>
                    </View>
                    <View style={{ flex: 4.2 }}>
                        <Text style={{ fontSize: width * .045, fontWeight: '700' }}>{name}</Text>
                        {
                            presentPost &&
                            <Text style={{ fontSize: width * .033, marginTop: 3, fontWeight: '700' }}>{presentPost} {presentCharge === 'C' ? ', CC' : ''}</Text>
                        }
                        <Text style={{ fontSize: width * .033, marginTop: 3, fontWeight: '700' }}>{presentOffice}</Text>
                        <Text style={{ fontSize: width * .033, marginTop: 3, fontWeight: '700' }}>{officeAddres}</Text>
                    </View>
                </View>
            }
            {/* <View style={{


                // left: width * .15,
                justifyContent: 'center',
                marginTop: height * .235,
                marginLeft:width*.15,
                // alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: `${currentTheme}`,
                borderRadius: height * .005,
                marginHorizontal: 1,
                marginVertical:0,
                paddingTop:4,
                paddingHorizontal: 10,
                elevation:55,
                position: 'absolute',
                zIndex:120
            }}>
                <Text style={{
                    color: 'white',
                    height: height * (1 / 40),
                    fontSize: txtSizeNormal,
                    // fontFamily: 'imperial-normal',
                }}>{name}</Text>
            </View> */}

            <DrawerContentScrollView style={{ backgroundColor: "#ffffff", marginTop: 10 }} {...props}>
                <ExpendableDrawer />
            </DrawerContentScrollView>

            <TouchableOpacity style={{ backgroundColor: '#ffffff' }} onPress={() => {
                logout();
            }}>
                <View
                    style={{
                        // flex:1,
                        flexDirection: 'row',
                        margin: 20,
                        backgroundColor: `${currentTheme}99`,
                        height: 30,
                        width: width * .25,
                        borderRadius: height * .005,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <View style={{ flex: 1.2, }} >
                        <Image style={{ height: width * .04, width: width * .04, marginHorizontal: 8 }} source={Images['logout']} />
                    </View>

                    <View style={{ flex: 2.5, }} >
                        <Text style={{ fontSize: 15, fontWeight: '600', color: 'white' }}>Logout</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DrawerContent
