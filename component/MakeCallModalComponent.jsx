import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const phoneCallIcon = '../assets/icons/phoneCall.png'
const whatsappIcon = '../assets/icons/whatsapp.png'

const MakeCallModalComponent = ({ number, toggleModal }) => {

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

    const sendMsgViaSimCard = () => {
        const url = (Platform.OS === 'android')
            ? `sms:${number}?body=${msg}`
            : `sms:/open?addresses=${number}&body=${msg}`;

        Linking.openURL(url)
        closeModal()


    }


    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row', borderRadius: 5, margin: 2,
                            // borderColor: 'blue',
                            // borderWidth: 1,
                        }}
                        onPress={() => sendMsgViaSimCard()}>
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
                        onPress={() => sendMsgViaWhatsapp()}>
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
                        style={[styles.button, styles.buttonClose]}
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
        height: height * .25,
        width: width * .6,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
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
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: 15

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        // backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default MakeCallModalComponent