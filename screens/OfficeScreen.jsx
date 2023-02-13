import { Text, View } from "react-native";
import React, { useContext, useState } from "react";

import DataRenderOffice from "../data/DataRenderOffice";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";


const OfficeScreen = ({ route, navigation }) => {

    const [value, onChangeText] = React.useState(route.params.title);

    const { currentTheme } = useContext(ThemeContext);
    const { presentOfficeCode } = useContext(AuthContext);



    React.useEffect(() => {
        navigation.setOptions({
            title: value === '' ? 'No title' : value,
        });
    }, [route.params.title]);


    return (
        <>
            <View style={{
                alignItems: 'center', paddingVertical: 10, paddingHorizontal: 15,
                backgroundColor: '#C1B8DC'  //'#6750a4'
            }}>
                <Text style={{ color: '#000', fontSize: 18, fontWeight: '600', textAlign: 'center', fontFamily: 'serif' }}>{route.params.officeName}, {presentOfficeCode === 30 ? route.params.officeId : null}</Text>
            </View>
            < DataRenderOffice designation='Assistant Engineer (Civil)' office_code={route.params.officeId} navigation={navigation} />

        </>

    )
}
export default OfficeScreen