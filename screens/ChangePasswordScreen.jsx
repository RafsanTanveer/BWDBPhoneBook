import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
import BiodataHeader from '../component/BiodataHeader'
import { height, width } from '../utility/ScreenDimensions'
import { ThemeContext } from '../context/ThemeContext'
import { Images } from '../utility/Images'

const ChangePasswordScreen = () => {

    const { currentTheme, currentSelectedIds, setCurrentSelectedIds } = useContext(ThemeContext);

    const [currentPass, setcurrentPass] = useState('');
    const [showCurrentPass, setshowCurrentPass] = useState(false);


    useEffect(() => {
        setcurrentPass('')
        setshowCurrentPass(false)
    }, []);


    return (
        <View style={{ flex: 1, }}>
            <BiodataHeader heading='Change Your Password' />
            <View style={{ paddingTop: 10, paddingHorizontal: 10 }} >
                <Text style={{ fontSize: width * .035, fontWeight: 'bold' }}>Your new password must be different from previous password</Text>
            </View>

            <View style={{ margin: 10 }} >
                <View style={{ paddingTop: 5 }} >
                    <Text style={{ padding: width * .025, fontSize: width * .035, fontWeight: 'bold' }}>Current password</Text>
                    <View style={{}} >
                        <TextInput
                            placeholder='Current password'
                            onChangeText={(text) => { setcurrentPass(text) }}
                            secureTextEntry={!showCurrentPass}
                            style={{
                                height: height / 20,
                                width: "97%",
                                borderRadius: 5,
                                marginBottom: 5,
                                marginLeft: 5,
                                borderColor: `${currentTheme}`,//'#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,
                                backgroundColor: 'white'
                            }}
                        />
                        {currentPass ?
                            <TouchableOpacity
                                style={{
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'flex-end',
                                    position: 'absolute',
                                    marginTop: height * .01,
                                    paddingRight: height * .015


                                }}
                                onPress={() => { setshowCurrentPass(!showCurrentPass)}}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                    }}
                                    source={Images['show']}
                                />
                            </TouchableOpacity>
                            :
                            !showCurrentPass &&
                            <TouchableOpacity
                                style={{
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'flex-end',
                                    position: 'absolute',
                                    marginTop: height * .01,
                                    paddingRight: height * .015


                                }}
                                onPress={() => { setshowCurrentPass(!showCurrentPass) }}
                            >
                                <Image
                                    style={{
                                        height: 22,
                                        width: 22,
                                    }}
                                    source={Images['hide']}
                                />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>



        </View>
    )
}

export default ChangePasswordScreen