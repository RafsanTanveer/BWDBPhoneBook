import { Text, View, TouchableOpacity, Linking } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import DataRender from '../data/DataRender'
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import api from '../api/api';

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
                alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15, marginBottom:5,
                backgroundColor: '#C1B8DC'  //'#6750a4'
            }}>
                
                <Text style={{ color: '#000', fontSize: 18, fontWeight: '600', textAlign: 'center', fontFamily: 'serif' }}>{route.params.designation} </Text>
                
            </View>

            <DataRender
                designation={route.params.designation}
                desig_code={route.params.desig_code} 
                tablename={route.params.tablename}
            />

            {/* < DataRenderOffice designation='Assistant Engineer (Civil)' office_code={route.params.officeId} navigation={navigation} /> */}



        </>

    )
}
export default DesignationScreen