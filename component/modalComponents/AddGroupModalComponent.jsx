import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';

import { height, width } from '../../utility/ScreenDimensions'
import DropDownPicker from 'react-native-dropdown-picker';

import { insertDataIntoGroupTable } from '../../database/InsertQueries'

import { getAllTableName } from '../../database/SelectQueries'
let groupTables = []
// tempDist = [...tempDist, { label: "All DISTRICT", value: "All DISTRICT" }]
const AddGroupModalComponent = ({ number, toggleModal }) => {


    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();



    const closeModal = () => {
        toggleModal(false)
    }

    const getGroupTableNames = async () => {
        const tablenames = await getAllTableName()

        const tableNames = tablenames.map((table) => table.name);


        groupTables = []
        tableNames.map((table) => {
            if (table.includes('aghukvd')) {
                let tempTableName = table.replace('aghukvd', '')
                groupTables = [...groupTables, { label: tempTableName, value: tempTableName }]
            }
        }
        )

        console.log(groupTables);
    }

    const insertGroup = async () => {

    }

    useEffect(() => {
        getGroupTableNames()
    }, []);

    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View style={{ width: width * .40, marginRight: 10, marginBottom: 2 }}>
                        <DropDownPicker
                            style={{ zIndex: 1000 }}
                            items={groupTables}
                            open={isOpen}
                            setOpen={() => { setIsOpen(!isOpen) }}
                            value={currentGroupValue}
                            setValue={setCurrentGroupValue}
                            maxHeight={450}
                            placeholder="Groups"
                            // onChangeValue={() => sortByDistrict()}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => insertGroup()}>
                            <Text style={styles.textStyle}>Add</Text>
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

export default AddGroupModalComponent