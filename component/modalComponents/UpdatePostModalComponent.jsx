import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, ToastAndroid, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../../api/api'
import { insertDataIntoGroupTable } from '../../database/InsertQueries'
let postsList = []
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

const UpdatePostModalComponent = ({ officeId, currentGroup, toggleModal }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();
    const { currentTheme } = useContext(ThemeContext);

    const [posts, setposts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);


console.log('drrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    console.log('officeId'+officeId);

    const closeModal = () => {
        toggleModal(false)
    }

    useEffect(() => {
        postsList = []
        fetchData()
    }, []);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("getsuboffice", {
                params: {
                    office: officeId
                }
            });
            setposts(response.rows);
            response.rows.map((item, index) => {
                const idx = index + 1
                postsList = [...postsList, { label: '(' + idx + ') ' + item.office_name + ' ' + item.post_name + ' - ' + item.emp_name, value: item.post_code }]
            }
            )

            // console.log(postsList);
        } catch (error) {
            __DEV__ && console.error(error.message);
        }






        setIsLoading(false);
    }

     const updatePost = async () => {

        // console.log(currentGroupValue);
        // console.log(groupTables[currentGroupValue - 1].label);

        const blggrp = typeof currentGroupValue !== 'undefined' ? groupTables[currentGroupValue - 1].label : ''

        console.log('in update blood');

        typeof currentGroupValue !== 'undefined' ?
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
                    <View style={{ flexDirection: 'row', paddingVertical: height * .025 }}>
                        <Text style={{ fontSize: height * .021, fontWeight: 'bold' }}>Update Post</Text>
                    </View>



                    <View style={{ width: width * .85, marginRight: 10, marginBottom: 2 }}>
                        <DropDownPicker
                            style={{ zIndex: 1000 }}
                            items={postsList}
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

export default UpdatePostModalComponent