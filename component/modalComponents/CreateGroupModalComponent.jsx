import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import { ThemeContext } from "../../context/ThemeContext";

import { height, width } from '../../utility/ScreenDimensions'

import { createGroupTable } from '../../database/CreateQueries'



const CreateGroupModalComponent = ({ number, toggleModal }) => {


    const { currentTheme } = useContext(ThemeContext);

    const [groupName, setgroupName] = useState();
    const [isSpecialCharacterExsits, setisSpecialCharacterExsits] = useState(false);

    const closeModal = () => {
        toggleModal(false)
    }

    const createGroup = async () => {
        createGroupTable(groupName)
        closeModal()
    }

    const checkAndSetGroupName = (text) => {

        const spaceExsits = text.includes(' ');

        const check = text.match(/^[A-Za-z]*$/)

        if (check) {
            setgroupName(`aghukvd${text}`)
            setisSpecialCharacterExsits(false)
        }
        else
            setisSpecialCharacterExsits(true)
    }

    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <TextInput placeholder='Group Name'
                        style={{
                            paddingLeft: 15,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: 'purple',
                            height: height / 20,
                            width: "100%",
                            borderRadius: 10,
                            marginBottom: 5,
                            fontWeight: '700',
                        }}
                        onChangeText={(text) => { checkAndSetGroupName(text) }}
                    >

                    </TextInput>
                    {
                        isSpecialCharacterExsits &&
                        <Text style={{ color: 'red' }} >Group name contains only character</Text>
                    }
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => createGroup()}>
                            <Text style={styles.textStyle}>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => closeModal()}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
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
        // elevation: 5,
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: 20,
        marginHorizontal: 5

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

export default CreateGroupModalComponent