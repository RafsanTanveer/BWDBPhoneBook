import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


const { width, height } = Dimensions.get('window');

import ExpendableDrawer from "./ExpendableDrawer";
import { AuthContext } from "../context/AuthContext";

const image = 'https://0.academia-photos.com/20936688/5794344/6584685/s200_rafsan.tanveer.jpg';
const name = 'Arif Ikramul Azim';
const designation = 'Addl. Director General'

const DrawerContent = (props) => {

    const navigation = useNavigation();
    const { photo, setphoto, desig, setDesig, office, setOffice, name, setName, logout } = useContext(AuthContext);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ backgroundColor: "#B2A8CF", height: 200, flexDirection: 'row', paddingVertical: 15, paddingHorizontal:5 }}>
                <View style={{ flex: 2 }}>
                    <Image style={{ height: 120, width: 120, borderRadius:70 }} source={{ uri: "data:image/jpeg;base64," + photo }} />
                </View>
                <View style={{ flex: 1.95 }}>
                    <Text style={{}}>{name}</Text>
                    <Text style={{ marginTop: 5 }}></Text>
                    <Text style={{ marginTop: 5 }}></Text>
                </View>
            </View>
            <DrawerContentScrollView style={{ backgroundColor: "#ffffff" }} {...props}>
                <ExpendableDrawer />
            </DrawerContentScrollView>

            <TouchableOpacity style={{ backgroundColor: '#ffffff' }} onPress={() => {
                logout();
            }}>
                <View style={{ margin: 20, backgroundColor: '#ba55d3', height:30, width:80, borderRadius:10, alignItems:'center', justifyContent:'center' }}>

                    <Text style={{fontSize:15, fontWeight:'600', color:'white'}}>Logout</Text>

                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default DrawerContent