import { View, Text, Image, ImageBackground, Keyboard, TextInput,ToastAndroid, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH, widthPixel, heightPixel, fontPixel, pixelSizeVertical, pixelSizeHorizontal } from '../utility/DimensionScaling'


const backgroundUrl = "../assets/BWDB_PHONE_Directory_background.jpg"
const logoUrl = "../assets/BwdbLogo.png"



const LoginScreen = () => {

    const [keyboardVisible, setkeyboardVisible] = useState('flex')  //flex none
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
                setkeyboardVisible('none')
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
                setkeyboardVisible('flex')
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <ImageBackground resizeMode='stretch'
            style={{ width: '100%', height: '100%' }}
            source={require(backgroundUrl)} >
            {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="position"> */}
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                    <View>
                        <Image
                            style={{
                                height: pixelSizeVertical(100),
                                width: pixelSizeVertical(100),
                                marginTop: pixelSizeVertical(350),
                                marginLeft: pixelSizeHorizontal(300),
                                // display: keyboardVisible
                            }}
                            source={require(logoUrl)} />
                        {/* <View style={{ marginTop: pixelSizeVertical(50), alignItems: 'center', display: keyboardVisible }}> */}
                        <View style={{ marginTop: pixelSizeVertical(50), alignItems: 'center',  }}>
                            <Text style={{ fontSize: fontPixel(25), fontWeight: '800', color: 'black' }}>Phone Directory</Text>
                            <Text style={{ fontSize: fontPixel(20), fontWeight: '600', color: 'black' }}>Bangladesh Water Development Board</Text>
                            <Text style={{ fontSize: fontPixel(20), fontWeight: '600', color: 'black' }}>(BWDB)</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            marginTop: pixelSizeVertical(20)
                                // keyboardVisible === 'flex' ?
                                // pixelSizeVertical(20) :
                                // WINDOW_HEIGHT < 550 ?
                                //     pixelSizeVertical(620) : pixelSizeVertical(600)
                        }}>
                            <TextInput style={{
                                backgroundColor: 'rgba(198, 158, 249, 0.21)',
                                height: WINDOW_HEIGHT < 550 ? pixelSizeVertical(59) : pixelSizeVertical(49),
                                width: pixelSizeHorizontal(250),
                                borderRadius: 10,
                                fontSize: fontPixel(20),
                                textAlign: 'left',
                                textAlignVertical: 'center'
                            }}
                                placeholder=' BWDB PMIS ID '
                                textAlignVertical='center'
                            />
                            <TouchableOpacity style={{ alignItems: 'center', marginTop: pixelSizeVertical(20) }}
                            //onPress={() => idOnPress()}

                            >
                                <Text style={{
                                    backgroundColor: 'rgba(198, 158, 249, 0.51)',
                                    height: WINDOW_HEIGHT < 550 ? pixelSizeVertical(59) : pixelSizeVertical(49),
                                    width: pixelSizeHorizontal(250),
                                    borderRadius: 10,
                                    fontSize: fontPixel(20),
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize: fontPixel(20),
                                    fontWeight: '600',
                                    color: 'black'
                                }}

                                >Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* </TouchableWithoutFeedback> */}
            {/* </KeyboardAvoidingView> */}
        </ImageBackground>
    )
}

export default LoginScreen