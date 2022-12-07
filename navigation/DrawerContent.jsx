import * as React from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window');

import ExpendableDrawer from "./ExpendableDrawer";

const image = 'https://0.academia-photos.com/20936688/5794344/6584685/s200_rafsan.tanveer.jpg';
const name = 'Arif Ikramul Azim';
const designation = 'Addl. Director General'

const DrawerContent = (props) => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#D9D4E5' }}>
            <View style={{ backgroundColor: "#B2A8CF", height: 200, flexDirection: 'row', padding: 15 }}>
                <View style={{ flex: 2 }}>
                    <Image style={{ width: width * .25, height: width * .25, borderRadius: width * .2 }} source={require('D:/ReactNative/nav-dr/assets/person_photo_placeholder.jpg')} ></Image>
                </View>
                <View style={{ flex: 1.75 }}>
                    <Text style={{}}>Nalllllllllllllllllllllllllllllllllllllllllllllllkkkme</Text>
                    <Text style={{ marginTop: 5 }}>Njjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjame</Text>
                    <Text style={{ marginTop: 5 }}>Nannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnme</Text>
                </View>
            </View>
            <DrawerContentScrollView style={{ backgroundColor: "#C7C0DA" }} {...props}>
                <ExpendableDrawer />
            </DrawerContentScrollView>

            <View style={{ margin: 20, backgroundColor: '#D9D4E5' }}>
                <TouchableOpacity style={{ backgroundColor: '#D9D4E5' }} onPress={() => { }}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DrawerContent