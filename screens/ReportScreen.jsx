import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { TouchableOpacity } from 'react-native-gesture-handler';


const ReportScreen = ({ route, navigation }) => {
    const animation = useRef(null);


    const baseUrl = `http://hrms.bwdb.gov.bd:7777/reports/rwservlet?bwdb&report=/san/apps/hrms/fmw/HR/REPORTS/HR_EMPLOYEE_LIST.jsp&desformat=pdf&destype=cache&paramform=no&P_RPT_TYPE=${route.params.recStatus}`

    const individualUrl = baseUrl + `&P_EMPLOYEE=${route.params.id}`

    const officeUrl = baseUrl + `&P_OFFICE=${route.params.officecode}`

    const url = route.params.individualOrOffice ? individualUrl : officeUrl

    const fileName = route.params.individualOrOffice ? `${route.params.name} - ${route.params.id}.pdf` : `${route.params.name}.pdf`

    __DEV__ && console.log(url);

    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);


    let sharePdf = async () => {

        const { uri: localUri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + "Staff List : " + fileName)
            .catch((error) => {
                console.error(error)
            })

        await shareAsync(localUri)
            .catch((err) => console.log('Sharing::error', err))

    }

    return (
        <TouchableOpacity onPress={sharePdf}>
            <View >
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    speed={1.5}
                    source={require('../assets/lottie/107420-no-data-loader.json')}
                />
                <Text style={{ fontSize: 20, fontWeight: '400' }} >No Data Found</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});


export default ReportScreen