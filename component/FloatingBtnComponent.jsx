import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import {Images} from '../utility/Images'
import { ThemeContext } from '../context/ThemeContext';

const msglIcon = '../assets/icons/message.png'
const groupIcon = '../assets/icons/group.png'
const bwdLogo = '../assets/bwdLogo.png'  // message


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const FloatingBtnComponent = ({  icon, txt,badgeCount, callBackFn }) => {

    const { currentTheme, currentSelectedIds, setCurrentSelectedIds, groupIds } = useContext(ThemeContext);
    const [badge, setBadge] = useState(currentSelectedIds.length);

    useEffect(() => {
        setBadge(currentSelectedIds.length)
    }, []);

    return (
        <TouchableOpacity
            onPress={() => callBackFn()}
            style={{ flexDirection: 'column', margin: 10 }}>
            <View>
                <View
                    style={{
                        backgroundColor: `${currentTheme}`,
                        borderColor: 'white',
                        borderWidth: 1,
                        borderRadius: 50,
                        width: width * .051,
                        height: width * .051,
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 25,
                        top: 0,
                        zIndex: 300
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: width * .02
                        }}>{badgeCount}</Text>
                </View>
                <Image
                    source={Images[icon]}
                    style={{
                        resizeMode: 'contain',
                        width: width * .1,
                        height: width * .1,
                        marginTop: 5,
                        alignSelf: 'center'
                    }}
                />

            </View>
            <View>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{txt}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default FloatingBtnComponent

const styles = StyleSheet.create({})