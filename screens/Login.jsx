import React, { useContext, useState } from 'react';
import { Dimensions, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View, StatusBar } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import db from '../database/database'
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { Images } from '../utility/Images'

import GradientText from '../component/GradientText'

const paniBhaban = '../assets/paniBhaban.png'
const botom = '../assets/botom.png'
const bwdbLogo = '../assets/bwdLogo.png'

const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;







const Login = () => {
    const [pmisId, setpmisId] = useState()
    const [password, setPassword] = useState();
    const { isLoading, login, setUserInfo, setisLogged } = useContext(AuthContext);

    const handleSubmit = ({ pid }) => {
        setId(pmisId)
        ToastAndroid.showWithGravity(id,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
    }
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

                    }}
                    source={Images['bwdLogo']}
                />
                <View style={{ marginTop: screenHeight * .6, alignItems: 'center', }}>
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
                    <TouchableOpacity
                        style={{
                            height: height / 20,
                            width: "70%",
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
                    <TouchableOpacity
                        style={{
                            alignContent: 'flex-end',
                            flexDirection: 'row',
                            elevation: 10,
                            marginTop: 10,
                            zIndex: 100,

                        }}>
                        <Text style={{
                            textAlign: 'right',
                            fontStyle: 'italic',
                            textAlign:'right'
                        }}> * Forgot Password</Text>
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
                               
                            }}
                            source={Images['bottom']} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login
