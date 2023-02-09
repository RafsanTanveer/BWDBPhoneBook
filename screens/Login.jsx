import React, { useContext, useState } from 'react';
import { Dimensions, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const paniBhaban = '../assets/paniBhaban.png'
const botom = '../assets/botom.png'
const bwdbLogo = '../assets/bwdLogo.png'

const height = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const width = Dimensions.get('window').width;
const screenWidth = Dimensions.get('screen').width;







const Login = () => {
    const [pmisId, setpmisId] = useState()
    const { isLoading, login } = useContext(AuthContext);

    const handleSubmit = ({ pid }) => {
        setId(pmisId)
        ToastAndroid.showWithGravity(id,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER)
    }
    return (
        <View style={{ flex: 1, height: screenHeight, backgroundColor: 'white', flexDirection: 'column-reverse' }}>
            <View style={{ height: screenHeight, }}>
                <Image
                    style={{
                        resizeMode: 'stretch',
                        position: 'absolute',
                        width: screenWidth * 1,
                        height: screenHeight * .6,
                    }}
                    source={require(paniBhaban)}
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
                    source={require(bwdbLogo)}
                />
                <View style={{ marginTop: screenHeight * .6, alignItems: 'center', }}>
                    <Text style={{ fontWeight: '900', fontSize: height * .04 }}>Phone Directory</Text>
                    <Text style={{ fontWeight: '700', marginTop: 5, fontSize: height * .025 }}>Bangladesh Water Development Board</Text>
                    <Text style={{ fontWeight: '700', marginTop: 5, fontSize: height * .022 }}>(BWDB)</Text>
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
                    <TouchableOpacity
                        style={{ height: height / 20, width: "70%", borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FF0000' }}
                        onPress={() => {
                            login(pmisId, "rafsan t");
                        }}
                    >
                        <Text style={{ fontSize: screenHeight * .02, fontWeight: '700', color: 'white' }}>Signin</Text>
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
        </View>
    )
}

export default Login