import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useContext, useEffect, useState } from "react";
import { Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Images } from '../utility/Images';

import MakeCallModalComponent from '../component/MakeCallModalComponent';
import { Charges } from '../utility/Charges';

import { height, width } from '../utility/ScreenDimensions';
import { imgSizeMini, txtSizeNormal, txtSizeBig } from "../utility/Scalling";

let selectedPId = []
let selectedGroupIds = []




const ItemVacant = ({ index, office, officeName, postNo }) => {



    const { pmisId } = useContext(AuthContext);


    const { currentSelectedIds, setCurrentSelectedIds, setGroupIds, groupIds } = useContext(ThemeContext);





    return (



        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 5,

        }}>

            <View style={{
                flex: 1, 
                borderTopLeftRadius: height * .005,

            }}>

                <Text style={{ textAlign: 'center' }}>{index}</Text>
            </View>

            <View style={{ flex: 1,  }}>
                <Text style={{ textAlign: 'center' }}>{office}</Text>
            </View>

            <View style={{ flex: 8,  }}>

                <Text style={{ textAlign: 'center' }}>{officeName}</Text>
            </View>

            <View style={{
                flex: 1,
                borderTopRightRadius: height * .005,

            }}>

                <Text style={{ textAlign: 'center' }}>{postNo}</Text>
            </View>
        </View>
    )
}









const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight ,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        //marginHorizontal: 16,
        height: 40,
        width: 90
    },
    title: {
        fontSize: 32,

    },
    logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        elevation: 20


    },
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4',
        elevation: 5


    },
    button: {
        backgroundColor: "gray",
        height: 40,
        width: 60,
        //padding: 10,
        borderRadius: 10
    },
    buttonText: {
        paddingTop: 9,
        paddingLeft: 16,
        color: "white",
        alignContent: 'center',
        justifyContent: 'center'
    },
    phnButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#6750a4",
        borderRadius: height * .005,
        marginHorizontal: 5,
        paddingVertical: 1,
        paddingHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    input: {
        borderStyle: "solid",
        borderColor: "#B7B7B7",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        paddingStart: 10,
        marginBottom: 15,
    },
    label: {
        marginBottom: 7,
        marginStart: 10,
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "44%",

    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,

    },
    getStarted: {
        backgroundColor: "#5188E3",
        color: "white",
        textAlign: "center",
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
    logIn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#758580",
    },

});




export default memo(ItemVacant);