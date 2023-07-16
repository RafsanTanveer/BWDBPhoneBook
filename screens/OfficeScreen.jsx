import { Text, View, TouchableOpacity, Linking } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import DataRenderOffice from "../data/DataRenderOffice";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import api from '../api/api';

const OfficeScreen = ({ route, navigation }) => {

    const [value, onChangeText] = React.useState(route.params.title);

    const { currentTheme } = useContext(ThemeContext);
    const { presentOfficeCode } = useContext(AuthContext);

    const [offceEmails, setoffceEmails] = useState([])


    const fetchOfficeEmail = async () => {


        try {

            const { data: response } = await api.get("officeEmail", {
                params: {
                    officeId: route.params.officeId
                }
            });
            setoffceEmails(response.rows);


        } catch (error) {
            __DEV__ && console.error(error.message);
        }

    }

    useEffect(() => {

        fetchOfficeEmail();

    }, [route.params.officeId]);


    React.useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        });
    }, [route.params.title]);


    return (
        <>
            <View style={{
                alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15,
                backgroundColor: `${currentTheme}`,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,

            }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center', fontFamily: 'serif' }}>{route.params.officeName} {presentOfficeCode === 30 ? ", " + route.params.officeId : null}</Text>
                {offceEmails.map((item, index) => (
                    <View style={{ paddingTop: 5, }} key={index}>

                        {
                            item.address ?
                                <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center', }}> {item.address}</Text>
                                : ""
                        }

                        {
                            item.email1 ?
                                <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${item.email1}`) }}  >
                                    <Text style={{ color: '#fff', paddingTop: 2, fontSize: 14, fontWeight: '600', textAlign: 'center', fontFamily: 'serif',  }}>{item.email1} </Text>
                                </TouchableOpacity>
                                : ""
                        }


                        {
                            item.email2 ?
                                <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${item.email1}`) }}  >
                                    <Text style={{ color: '#fff', paddingTop: 2, fontSize: 14, fontWeight: '600', textAlign: 'center', fontFamily: 'serif',  }}>{item.email2} </Text>
                                </TouchableOpacity>
                                : ""
                        }

                    </View>
                ))}
            </View>
            < DataRenderOffice designation='Assistant Engineer (Civil)' office_code={route.params.officeId} navigation={navigation} />

        </>

    )
}
export default OfficeScreen