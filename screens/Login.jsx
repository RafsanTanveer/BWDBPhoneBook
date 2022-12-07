import { View, Text, Image, Dimensions, ToastAndroid, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;


const Login = () => {

   // const navigation = useNavigation();

    const [id, setId] = useState("920219001")

    const handleSubmit = () => {
        ToastAndroid.showWithGravity(id,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
    }


    return (
        <ImageBackground
            style={{
                flex: 1,
                width: screenWidth * 1.009,
                height: screenHeight,
            }}
            source={require('D:/ReactNative/nav-dr/assets/loginBackground2.png')} >

            <View style={{ paddingTop: screenHeight * .572, width: screenWidth, alignItems: 'center', alignContent: 'center' }}>
                <View style={{ flexDirection: 'row', paddingLeft: width * .15 }}>
                    <TextInput selectionColor={'purple'} onChangeText={idText => setId(idText)}
                        style={{ marginTop: 10, borderWidth: 1, borderColor: 'purple', height: height / 20, width: "70%", borderRadius: 10, marginBottom: 5 }} placeholder='   BWDB PMIS ID '>
                        
                        </TextInput>
                    <TouchableOpacity onPress={() => handleSubmit()}>
                        <View style={{ backgroundColor: 'purple', marginLeft: width * .029, justifyContent: 'center', marginTop: 10, alignItems: 'center', borderColor: 'purple', width: width * .13, height: height / 20, borderRadius: 10, marginBottom: 5 }}>
                            <Entypo name="arrow-bold-right" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontWeight: '900', fontSize: height * .04 }}>Phone Directory</Text>
                    <Text style={{ fontWeight: '700', marginTop: 10, fontSize: height * .025 }}>Bangladesh Water Development Board</Text>
                    <Text style={{ fontWeight: '700', marginTop: 10, fontSize: height * .022 }}>(BWDB)</Text>
                </View>
            </View>


        </ImageBackground >

    )
}

export default Login