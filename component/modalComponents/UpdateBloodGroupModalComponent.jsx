import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, ToastAndroid,Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../api/api'
import { insertDataIntoGroupTable } from '../../database/InsertQueries'

import { getAllTableName } from '../../database/SelectQueries'
let groupTables = [
    { label: "A+", value: 1 },
    { label: "A-", value: 2 },
    { label: "B+", value: 3 },
    { label: "B-", value: 4 },
    { label: "AB+", value: 5 },
    { label: "AB-", value: 6 },
    { label: "O+", value: 7 },
    { label: "O-", value: 8 }
]

const UpdateBloodGroupModalComponent = ({ id, currentGroup, toggleModal, refreshList }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();
    const { currentTheme } = useContext(ThemeContext);



    const closeModal = () => {
        toggleModal(false)
    }


    const updateBloodGrp = async () => {

        __DEV__ && console.log(currentGroupValue);
        // console.log(groupTables[currentGroupValue - 1].label);

        const blggrp = typeof currentGroupValue !== 'undefined'? groupTables[currentGroupValue - 1].label:''

        __DEV__ && console.log('in update blood');

        typeof currentGroupValue !== 'undefined'?
        await api.put(`updateBldGrp/${id}/${blggrp}`)
                .then(res => refreshList())
                .catch(err => console.log(err))
            :
            ToastAndroid.show("Please Select Blood Group To Update", ToastAndroid.LONG, ToastAndroid.TOP)



    }





    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={{ ...styles.modalView, borderColor: `${currentTheme}` }}>
                    <View style={{ flexDirection: 'row', paddingVertical: height*.025 }}>
                        <Text style={{ fontSize: height * .021, fontWeight: 'bold' }}>Update Blood Group</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: 'bold' }}>Current Blood Group : </Text>
                        <Text style={{ fontWeight: 'bold' }}>{currentGroup}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: 'bold' }}>Blood Group to update: </Text>
                    </View>

                    <View style={{ width: width * .40, marginRight: 10, marginBottom: 2 }}>
                        <DropDownPicker
                            style={{ zIndex: 1000 }}
                            items={groupTables}
                            open={isOpen}
                            setOpen={() => { setIsOpen(!isOpen) }}
                            value={currentGroupValue}
                            setValue={setCurrentGroupValue}
                            maxHeight={450}
                            placeholder="Blood Groups"
                        // onChangeValue={() => sortByDistrict()}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}

                            onPress={() => updateBloodGrp()}>
                            <Text style={styles.textStyle}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{...styles.button, backgroundColor: `${currentTheme}`, elevation: 5}}
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
        // borderWidth:1

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

export default UpdateBloodGroupModalComponent