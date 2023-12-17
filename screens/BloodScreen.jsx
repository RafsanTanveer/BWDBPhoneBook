import { Text, View, TouchableOpacity, Linking, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import DataRenderBlood from '../data/DataRenderBlood'
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import api from '../api/api';

const BloodScreen = ({ route, navigation }) => {

    const [value, onChangeText] = React.useState(route.params.title);

    const { currentTheme } = useContext(ThemeContext);
    const { presentOfficeCode } = useContext(AuthContext);

    const [offceEmails, setoffceEmails] = useState([])






    React.useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        });
    }, [route.params.title]);


    return (
        <>

            <View style={{
                alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 5,
                backgroundColor: `${currentTheme}`,//'#C1B8DC',  //'#6750a4'
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                // flexDirection: 'row'

            }}>
                {/* <View style={{ flex: 1 }}>
                    <Image style={{ width: 40, height: 40,backgroundColor:'white' }} source={require('../assets/bwdLogo.png')} />
                </View> */}

                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center', fontFamily: 'serif' }}>Blood Group : {route.params.designation} </Text>

            </View>


            <DataRenderBlood
                designation={route.params.designation}
                desig_code={route.params.desig_code}
                tablename={route.params.tablename}
            />

         

        </>

    )
}
export default BloodScreen