import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, ToastAndroid, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";

import { height, width } from '../../utility/ScreenDimensions'
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../api/api'
import { insertDataIntoGroupTable } from '../../database/InsertQueries'


const ForgotPasswordModal = ({ id, currentMobileNumber, toggleModal, refreshList }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();

    const [email, setEmail] = useState();

    const { currentTheme } = useContext(ThemeContext);


    const closeModal = () => {
        toggleModal(false)
    }


    const updateEmail = async () => {






        email ?
            await api.put(`updateEmail/${id}/${email}`, { params: { id: id, bloodgroup: '54' } })
                .then(res => refreshList())
                .catch(err => console.log(err))
            :
            ToastAndroid.show("Please Enter Email To Update", ToastAndroid.LONG, ToastAndroid.TOP)



    }





    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ fontSize: height * .021, fontWeight: 'bold' }}>Update Email </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: 'bold' }}>Current Email : </Text>
                        <Text style={{ fontWeight: 'bold' }}>{currentMobileNumber}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: 'bold' }}>Email to update: </Text>
                    </View>

                    <View style={{ width: width * .45, marginRight: 10, marginBottom: 2 }}>
                        <TextInput

                            selectionColor={'black'}       // for changing curcsor color
                            onChangeText={(txt) => setEmail(txt)}
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
                            placeholder='Enter Email'>
                        </TextInput>
                    </View>

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}

                            onPress={() => updateEmail()}>
                            <Text style={styles.textStyle}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}
                            onPress={() => closeModal()}>
                            <Text style={{ ...styles.textStyle }}>Cancel</Text>
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
        height: height * .35,
        width: width * .75,
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
        // borderWidth: 1,
        borderColor: 'blue',
        elevation: 5
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,


        marginTop: 20,
        marginRight: 5,

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

export default ForgotPasswordModal