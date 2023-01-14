import { View, Text, Image, Dimensions, ToastAndroid, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { createContext, useContext, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const paniBhaban = '../assets/paniBhaban.png'
const botom = '../assets/botom.png'
const bwdbLogo = '../assets/bwdLogo.png'
const botom_1 = '../assets/botom_1.png'
const botom_2 = '../assets/botom_2.png'
const botom_3 = '../assets/botom_3.png'
const botom_4 = '../assets/botom_4.png'

const AuthContext = createContext();


const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;



const Login = () => {

    // const { signIn } = React.useContext(AuthContext);
    // const navigation = useNavigation();

    const [id, setId] = useState("920219001")

    const handleSubmit = () => {
        ToastAndroid.showWithGravity(id,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
    }


    return (
        <KeyboardAwareScrollView contentContainerStyle={{
            flexGrow: 1,
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>

            <View style={{ flex: 1, height: screenHeight * 1, backgroundColor: 'white' }}>
                <Image
                    style={{
                        resizeMode: 'stretch',
                        position: 'absolute',
                        width: screenWidth * 1,
                        height: screenHeight * .6
                    }}
                    source={require(paniBhaban)}
                />
                <Image
                    style={{
                        resizeMode: 'stretch',
                        position: 'absolute',
                        width: screenHeight * 0.12,
                        height: screenHeight * 0.12,
                        marginLeft: screenWidth * .72,
                        marginTop: screenHeight * .42,
                    }}
                    source={require(bwdbLogo)}
                />
                <View style={{ marginTop: screenHeight * .6, alignItems: 'center', }}>
                    <Text style={{ fontWeight: '900', fontSize: height * .04 }}>Phone Directory</Text>
                    <Text style={{ fontWeight: '700', marginTop: 5, fontSize: height * .025 }}>Bangladesh Water Development Board</Text>
                    <Text style={{ fontWeight: '700', marginTop: 5, fontSize: height * .022 }}>(BWDB)</Text>
                    <TextInput selectionColor={'purple'} onChangeText={setId}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: 'purple', height: height / 20, width: "70%", borderRadius: 10, marginBottom: 5 }} placeholder='   BWDB PMIS ID '>
                    </TextInput>
                    <TouchableOpacity onPress={() => signIn({ id })}
                        style={{ height: height / 20, width: "70%", borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000' }}>
                        <Text style={{ fontSize: screenHeight * .02, fontWeight: '700', color:'white'}}>Signin</Text>
                    </TouchableOpacity>



                </View>

                <View style={{
                    width: screenWidth, height: screenHeight * .1, position: 'absolute', //Here is the trick
                    bottom: 0, //Here is the trick

                }}>
                    <View style={{ justifyContent: 'flex-end' }}>

                        <Image style={{ width: screenWidth, height: screenHeight * .1, }} source={require(botom)} />

                    </View>


                </View>


            </View>






        </KeyboardAwareScrollView>

    )
}

export default Login