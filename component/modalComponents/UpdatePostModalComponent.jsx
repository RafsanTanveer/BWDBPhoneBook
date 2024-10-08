import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, ToastAndroid, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import api from '../../api/api'

let postsList = []


const UpdatePostModalComponent = ({ id, name, desig, officeId, currentGroup, toggleModal, refreshList }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();
    const { currentTheme } = useContext(ThemeContext);

    const [posts, setposts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    __DEV__ && console.log('drrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    __DEV__ && console.log('officeId' + officeId + '  ' + id);

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
                postsList = [...postsList, { label: '(' + idx + ') ' + item.post_name + '\n' + item.office_name + '\n' + item.emp_name, value: item.post_code + '-' + item.office_code }]
            }
            )

            // console.log(postsList);
        } catch (error) {
            __DEV__ && console.error(error.message);
        }






        setIsLoading(false);
    }

    const updatePost = async () => {

        // console.log(value);
        const params = value.split("-");
        // console.log(params);
        const postNo = params[0]
        const officeNo = params[1]

        // console.log(postNo+' '+officeNo);

        // console.log(currentGroupValue);
        // console.log(groupTables[currentGroupValue - 1].label);

        // const blggrp = typeof currentGroupValue !== 'undefined' ? groupTables[currentGroupValue - 1].label : ''

        // console.log('in update blood');

        // typeof currentGroupValue !== 'undefined' ?
        await api.put(`updatepost/${id}/${postNo}/${officeNo}`)
            .then(res => refreshList())
            .catch(err => console.log(err))
        // :            ToastAndroid.show("Please Select Blood Group To Update", ToastAndroid.LONG, ToastAndroid.TOP)

        closeModal()

    }





    return (
        <View style={styles.centeredView}>
            <View style={styles.centeredView}>
                <View style={{ ...styles.modalView, borderColor: `${currentTheme}` }}>
                    <View style={{ flexDirection: 'column', alignContent: 'center', textAlign: 'center' }}>
                        <View style={{ paddingVertical: height * .012, }} >
                            <Text style={{ fontSize: height * .022, fontWeight: 'bold', textAlign: 'center' }}>Update Post</Text>
                        </View>
                        <View style={{ paddingBottom: height * .010 }} >
                            <Text Text style={{ fontSize: height * .019, fontWeight: 'bold', textAlign: 'center' }}>{name}</Text>
                            <Text Text style={{ fontSize: height * .016, fontWeight: 'bold', textAlign: 'center' }}>{desig}</Text>
                        </View>
                    </View>
                    <View style={{ width: width * .85, marginRight: 10, marginBottom: 2 }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            // itemTextStyle={{ backgroundColor:'red'}}
                            data={postsList}
                            // search
                            conditionalText='OCCUPIED'
                            conditionMatchColor='#FFCCCC'
                            conditionMismatchColor='#D1FFBD'

                            maxHeight={500}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Post' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }}

                        />
                    </View>

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}
                            onPress={() => updatePost()}>
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
        // justifyContent: 'center',
        alignItems: 'center',
        // marginTop: height * .005,


    },
    modalView: {
        height: height * .3,
        width: width * .95,
        margin: width * .02,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: 'center',

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
    container: {
        backgroundColor: 'white',
        padding: 5,
    },
    dropdown: {
        height: 60,
        borderColor: 'blue',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: 'aquq'
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,

    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});

export default UpdatePostModalComponent