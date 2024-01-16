import React, { useContext, useState, useEffect } from 'react';
import { useColorScheme, Dimensions, Alert, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View, StatusBar, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import db from '../database/database'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Images } from '../utility/Images'
// import TouchID from "react-native-touch-id";
import GradientText from '../component/GradientText'
import { getEmployeeInfo, getAllTableName } from '../database/SelectQueries'

const paniBhaban = '../assets/paniBhaban.png'
const botom = '../assets/botom.png'
const bwdbLogo = '../assets/bwdLogo.png'

const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;

import * as LocalAuthentication from 'expo-local-authentication';




const Login = () => {

    // const systemTheme = useColorScheme();
    // alert("your color scheme is: " + systemTheme);
    const [pmisId, setpmisId] = useState()
    const [password, setPassword] = useState();
    const { isLoading, login, setUserInfo, setisLogged } = useContext(AuthContext);
    const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
    const [fingerLoading, setfingerLoading] = useState(false);
    const [isLoginHistoryAvaiable, setisLoginHistoryAvaiable] = useState(false);

    const [result, setResult] = useState('');


    const handleSubmit = ({ pid }) => {
        setId(pmisId)
        ToastAndroid.showWithGravity(id,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
    }


    const checkIsLoginHistoryAvaiable = async () => {

        try {
            const empInfo = await getEmployeeInfo("loginHistory")

            empInfo.length ? setisLoginHistoryAvaiable(true) : setisLoginHistoryAvaiable(false)

        } catch (error) {

        }


    }

    const checkSupportedAuthentication = async () => {
        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types && types.length) {
            // setFacialRecognitionAvailable(types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION));
            setFingerprintAvailable(types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT));
            // setIrisAvailable(types.includes(LocalAuthentication.AuthenticationType.IRIS));
        }
    };


    useEffect(() => {
        checkSupportedAuthentication();
        checkIsLoginHistoryAvaiable();
    }, []);


    const authenticate = async () => {
        if (fingerLoading) {
            return;
        }

        setfingerLoading(true);

        try {
            const results = await LocalAuthentication.authenticateAsync();

            console.log(results);
            const empInfo = await getEmployeeInfo("loginHistory")
            console.log(empInfo[empInfo.length-1].id + '/////////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  ' + empInfo.length);
            //login(pmisId, password)

            if (results.success) {
                login(empInfo[empInfo.length - 1].id, empInfo[empInfo.length - 1].password)
            }

            // if (results.success) {   const empInfo = await getEmployeeInfo("employeeInfo")
            //     setResult(EResult.SUCCESS);
            // } else if (results.error === 'unknown') {
            //     setResult(EResult.DISABLED);
            // } else if (
            //     results.error === 'user_cancel' ||
            //     results.error === 'system_cancel' ||
            //     results.error === 'app_cancel'
            // ) {
            //     setResult(EResult.CANCELLED);
            // }
        } catch (error) {
            setResult('');
        }

        setfingerLoading(false);
    };



    // const handleAuth = () => {
    //     TouchID.isSupported().then((biometryType) => {
    //         if (biometryType === "FaceID") {
    //             TouchID.authenticate("")
    //                 .then((success) => {
    //                     navigation.replace("ProtectedScreen");
    //                 })
    //                 .catch((error) => {
    //                     Alert.alert("Authentication Failed", error.message);
    //                 });
    //         } else {
    //             TouchID.authenticate("")
    //                 .then((success) => {
    //                     navigation.replace("ProtectedScreen");
    //                 })
    //                 .catch((error) => {
    //                     Alert.alert("Authentication Failed", error.message);
    //                 });
    //         }
    //     });
    // };

    return (
        //  this view works as a keyboard avoiding view
        <View
            style={{
                flex: 1,
                flexDirection: 'column-reverse',
                height: screenHeight,
                backgroundColor: 'white',

            }}>
            <StatusBar hidden />
            <View style={{ height: screenHeight, }}>
                <Image
                    style={{
                        resizeMode: 'stretch',
                        position: 'absolute',
                        width: screenWidth * 1,
                        height: screenHeight * .6,
                        elevation: 5
                    }}
                    source={Images['paniBhaban']}
                />
                <Image
                    style={{
                        resizeMode: 'stretch',
                        position: 'absolute',
                        width: screenHeight * 0.12,
                        height: screenHeight * 0.12,
                        marginLeft: screenWidth * .70,
                        marginTop: screenHeight * .42,
                        elevation: 5
                    }}
                    source={Images['bwdLogo']}
                />
                <View style={{
                    marginTop: screenHeight * .6,
                    alignItems: 'center',
                    zIndex:200
                }}>

                    <GradientText style={{ fontWeight: '900', fontSize: height * .04 }}>Employee Directory </GradientText>
                    <GradientText style={{ fontWeight: '700', marginTop: 5, fontSize: height * .025 }}>Bangladesh Water Development Board</GradientText>
                    <GradientText style={{ fontWeight: '700', marginTop: 5, fontSize: height * .022 }}>(BWDB)</GradientText>
                    <TextInput
                        maxLength={9}                  // set maximum string length to 9
                        keyboardType={"decimal-pad"}   // set keyboard type
                        selectionColor={'black'}       // for changing curcsor color
                        onChangeText={(txt) => setpmisId(txt)}
                        style={{
                            paddingLeft: 15,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: 'purple',
                            height: height / 20,
                            width: "70%",
                            borderRadius: 10,
                            marginBottom: 5,
                            fontWeight: '700',
                        }}
                        placeholder='BWDB PMIS ID'>
                    </TextInput>
                    <TextInput
                        secureTextEntry={true}

                        // keyboardType={"decimal-pad"}   // set keyboard type
                        selectionColor={'black'}       // for changing curcsor color
                        onChangeText={(txt) => setPassword(txt)}
                        style={{
                            paddingLeft: 15,
                            marginTop: 2,
                            borderWidth: 1,
                            borderColor: 'purple',
                            height: height / 20,
                            width: "70%",
                            borderRadius: 10,
                            marginBottom: 5,
                            fontWeight: '700',
                        }}
                        placeholder='PASSWORD'>
                    </TextInput>
                    <View style={{ width: "70%", flexDirection: 'row' }} >
                        <View style={{ flex: 1000 }} >
                            <TouchableOpacity
                                style={{
                                    height: height / 20,

                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#FF0000',
                                    elevation: 10
                                }}
                                onPress={() => {


                                    login(pmisId, password);
                                }}
                            >
                                <Text style={{ fontSize: screenHeight * .02, fontWeight: '700', color: 'white' }}>Signin</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            true && fingerprintAvailable && isLoginHistoryAvaiable &&
                            <TouchableOpacity
                                style={{ flex: .1, }}
                                onPress={() =>  authenticate() }
                            >
                                <Image
                                    style={{

                                        width: screenHeight * 0.07,
                                        height: screenHeight * 0.045,
                                        zIndex: 100,
                                        elevation: 5
                                    }}
                                    source={Images['fingerprint']}
                                />
                            </TouchableOpacity>
                        }

                    </View>
                    <TouchableOpacity
                        style={{
                            height: height / 20,
                            width: "70%",
                            borderRadius: 10,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            zIndex: 100,
                        }}
                        onPress={() => { }}
                    >
                        <Text style={{
                            textAlign: 'right',
                            fontStyle: 'italic',
                            textAlign: 'right',
                            fontWeight: 'bold',
                            color: '#D74826'
                        }}>Forgot Password ?</Text>
                    </TouchableOpacity>

                </View>

                <View style={{
                    width: screenWidth, height: screenHeight * .1, position: 'absolute', //Here is the trick
                    bottom: 0, //Here is the trick

                }}>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <Image
                            style={{
                                width: screenWidth,
                                height: screenHeight * .1,
                                elevation: 5
                            }}
                            source={Images['bottom']} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login


//     < Image
// style = {{

//     width: screenHeight * 0.04,
//         height: screenHeight * 0.045,
//             zIndex: 100,
//                 elevation: 5
// }}
// source = { Images['fingerprint']}
//     />