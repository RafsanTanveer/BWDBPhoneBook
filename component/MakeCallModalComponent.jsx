import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import {height, width} from '../utility/ScreenDimensions'



const phoneCallIcon = '../assets/icons/phoneCall.png'
const whatsappIcon = '../assets/icons/whatsapp.png'

const MakeCallModalComponent = ({ number, toggleModal, type }) => {

    __DEV__ && console.log(type);
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
//`, ${presentCharge}`
    let charge = presentCharge === 'R' ? '' :
        presentCharge === 'C' ? ',CC' :
            presentCharge === 'A' ? ',Addl.' :
                presentCharge === 'I'?',Incharge':''

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

            <View style={styles.centeredView}>
                <View style={{...styles.modalView, borderColor: `${currentTheme}`}}>
                    {type === 'phn' ? <Text style={{ fontWeight: 'bold', fontSize: height * .025, padding: height * .025, textAlign:'center' }} >Make a Call</Text> : <Text style={{ fontWeight: 'bold', fontSize: height * .02, padding: height * .025 }} >Send a Message</Text>}
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', borderRadius: 5, margin: 2,

                        }}


                        onPress={() => type === 'phn' ? callViaSimCard() : sendMsgViaSimCard()}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingLeft: 25,

                            // backgroundColor: 'aqua'
                        }}>
                            <Image
                                source={require(phoneCallIcon)}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 4,
                                justifyContent: 'center',
                                alignContent: 'center',
                                paddingHorizontal: 20,

                                // backgroundColor: 'blue'
                            }}>
                            <Text style={{ fontSize: width * .045, fontWeight: '500' }}>Sim Card</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', borderRadius: 5, margin: 2,
                            // borderColor: 'blue',
                            // borderWidth: 1,
                        }}
                        onPress={() => type === 'phn' ? callViaWhatsapp(): sendMsgViaWhatsapp()}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignContent: 'center',
                            paddingLeft: 25,

                            // backgroundColor: 'aqua'
                        }}>
                            <Image
                                source={require(whatsappIcon)}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 4,
                                justifyContent: 'center',
                                alignContent: 'center',
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                                // backgroundColor: 'blue'
                            }}>
                            <Text style={{ fontSize: width * .045, fontWeight: '500' }}>Whatsapp</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ ...styles.button, ...styles.buttonClose, backgroundColor:`${currentTheme}`, elevation:5 }}
                        onPress={() => closeModal()}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: height * .3,
        width: width * .6,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 35,
        paddingVertical:10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,

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

export default MakeCallModalComponent