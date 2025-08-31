import { Text, View, TouchableOpacity, Linking, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import DataRender from '../data/DataRender'
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import {txtSizeBig} from '../utility/Scalling'

const DesignationScreen = ({ route, navigation }) => {

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
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginBottom: 5,
                backgroundColor: `${currentTheme}`,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,


            }}>
                {/* <View style={{ flex: 1 }}>
                    <Image style={{ width: 40, height: 40,backgroundColor:'white' }} source={require('../assets/bwdLogo.png')} />
                </View> */}

                <Text style={{ color: '#fff', fontSize: txtSizeBig*1.3, fontWeight: '600', textAlign: 'center', fontFamily: Platform.OS === "android" ? 'serif' : null }}>{route.params.designation} </Text>

            </View>


            <DataRender
                designation={route.params.designation}
                desig_code={route.params.desig_code}
                tablename={route.params.tablename}
            />


        </>

    )
}
export default DesignationScreen