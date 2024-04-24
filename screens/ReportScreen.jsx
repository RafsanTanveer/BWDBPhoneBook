import React, { useRef, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system'
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Pdf from 'react-native-pdf';
import { imgSizeMini, txtSizeNormal, imgSizeMidium, txtSizeMini } from '../utility/Scalling'
import { Images } from '../utility/Images'
import PDFReader from 'rn-pdf-reader-js'
import LoadingScreen from '../screens/LoadingScreen'

const ReportScreen = ({ route, navigation }) => {
    const animation = useRef(null);
    const netInfo = useNetInfo();
    const [isLoading, setIsLoading] = useState(false);

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

    const PdfResource = { uri: url, cache: true };

    let sharePdf = async () => {

        setIsLoading(true)

        const { uri: localUri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + "Staff List : " + fileName)
            .catch((error) => {
                console.error(error)
            })

        setIsLoading(false)

        await shareAsync(localUri)
            .catch((err) => console.log('Sharing::error', err))

    }

    return (



        <>
            {
                isLoading ? <LoadingScreen />
                    :
                <>
                    <View style={{ flexDirection: 'row-reverse' }} >
                        <TouchableOpacity

                            onPress={() => (netInfo.isConnected ? sharePdf() : ToastAndroid.show("Please Check Your Internet Connection", ToastAndroid.LONG, ToastAndroid.TOP))}

                            style={{ flexDirection: 'column', margin: 3 }}
                        >
                            <Image
                                source={Images['share']}
                                style={{ height: imgSizeMidium, width: imgSizeMidium, alignSelf: 'center' }}
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'black',
                                fontSize: txtSizeMini * 1.2,
                                textAlign: 'center'
                            }}>Download / Share</Text>
                        </TouchableOpacity>
                    </View>

                    <PDFReader props={{ withPinchZoom: true, useGoogleReader: true }}
                        source={{
                            uri: url, headers: { ["sdf"]: "sdf" }
                        }}
                    />
                </>
            }
        </>


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