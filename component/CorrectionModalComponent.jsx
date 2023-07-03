import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { TextInput } from 'react-native-paper';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



const CorrectionModalComponent = ({ number, toggleModal }) => {

    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
    //`, ${presentCharge}`

    const closeModal = () => {
        toggleModal(false)
    }



    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={{}}>
                        <Text style={{}}>Correction Request</Text>
                        <Text style={{}}>Old: </Text>
                        <Text style={{}} >Correction: </Text>
                        <Text style={{}} >Required Documents:</Text>
                    </View>

                    <TouchableOpacity onPress={() => { }}
                        style={{}} >

                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ margin: 5 }}>
                            <TouchableOpacity
                                style={{ ...styles.button, ...styles.buttonClose }}
                                onPress={() => closeModal()}>
                                <Text style={styles.textStyle}>Submit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ margin: 5 }}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => closeModal()}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
        height: height * .35,
        width: width * .9,
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
        marginTop: 15,
        elevation: 5

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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

export default CorrectionModalComponent