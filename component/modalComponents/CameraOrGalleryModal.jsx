import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
// import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import AuthContext from '../../context/AuthContext'
import { LinearGradient } from 'expo-linear-gradient';


const phoneCallIcon = '../../assets/icons/phoneCall.png'
const whatsappIcon = '../../assets/icons/whatsapp.png'

const CameraOrGalleryModal = ({ number, toggleModal, type, heading }) => {

    __DEV__ && console.log(type);
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
    //`, ${presentCharge}`
    let charge = presentCharge === 'R' ? '' :
        presentCharge === 'C' ? ',CC' :
            presentCharge === 'A' ? ',Addl.' :
                presentCharge === 'I' ? ',Incharge' : ''

    let msg = `\n\n\n\n\n...\nBest Regards, \n\n${name}\n${presentPost} ${charge}\n${presentOffice},BWDB`

    const closeModal = () => {
        toggleModal(false)
    }

    const sendMsgViaWhatsapp = () => {

        const whatsappUrl = `whatsapp://send?text=${msg}&phone=+88${number}`
        Linking.openURL(whatsappUrl)
        closeModal()

    }

    const callViaWhatsapp = () => {

        const whatsappUrl = `whatsapp://send?phone=+88${number}`
        Linking.openURL(whatsappUrl)
        closeModal()

    }

    const sendMsgViaSimCard = () => {
        const url = (Platform.OS === 'android')
            ? `sms:${number}?body=${msg}`
            : `sms:/open?addresses=${number}&body=${msg}`;

        Linking.openURL(url)
        closeModal()


    }
    // `tel:${mobile}`
    const callViaSimCard = () => {
        const url = (Platform.OS === 'android')
            ? `tel:${number}`
            : `tel:/open?addresses=${number}&body=${msg}`;

        Linking.openURL(url)
        closeModal()


    }


    return (


        <View style={styles.centeredView}>
            <View style={{ flex: 1, backgroundColor: `${currentTheme}5`, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: height * .015, borderTopRightRadius: height * .015, }} >
                <Text style={{ fontWeight: 'bold', fontSize: width * .048, color: 'Black' }} >{heading}</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', }} >
                <TouchableOpacity
                    onPress={() => type === 'phn' ? callViaSimCard() : sendMsgViaSimCard()}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >
                    <Image
                        source={require(phoneCallIcon)}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: width * .045, fontWeight: '500', margin: 10 }}>Sim Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => type === 'phn' ? callViaWhatsapp() : sendMsgViaWhatsapp()}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >
                    <Image
                        source={require(whatsappIcon)}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: width * .045, fontWeight: '500', margin: 10 }}>Whatsapp</Text>
                </TouchableOpacity>
            </View>

            <View

                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: height * .015, borderBottomEndRadius: height * .015 }} >
                <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                        backgroundColor: `${currentTheme}`,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: height * .009
                        , elevation: 5
                    }} >
                    <Text style={{ fontWeight: '600', fontSize: width * .04, color: 'white' }} >Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: height * .35,
        marginHorizontal: width * .20,
        backgroundColor: 'white',
        borderRadius: height * .015,
        elevation: 5,
        paddingVertical: 15
    },
    modalView: {

        height: height * .3,
        width: width * .6,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // borderWidth: 1,

    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,


        marginTop: 8

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        // backgroundColor: '#2196F3',
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
});

export default CameraOrGalleryModal