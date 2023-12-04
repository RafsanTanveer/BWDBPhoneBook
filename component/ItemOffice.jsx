import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext, useCallback, memo } from "react";
import { Modal, Dimensions, FlatList, Image, Linking, TextInput, Pressable, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
import { FlashList } from "@shopify/flash-list";

import api from '../api/api';
import LoadingScreen from "../screens/LoadingScreen";
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../screens/NoInternetScreen'
import NoDataFoundScreen from '../screens/NoDataFoundScreen';
import { AuthContext } from '../context/AuthContext';
import BiodataScreen from '../screens/BiodataScreen';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import Checkbox from 'expo-checkbox';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
// import { FAB } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as Contacts from 'expo-contacts'

import { Picker } from '@react-native-picker/picker';
import MakeCallModalComponent from '../component/MakeCallModalComponent'
import * as SQLite from 'expo-sqlite'

import db from '../database/database'
// import { DataContext } from '../context/DataContext';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


let selectedPId = []





const ItemOffice = ({ id, name, designation, office, email, mobile, pabx, selected, photo, index, post, charge, isAdmin, currentTheme, length }) => {

    const navigation = useNavigation();

    const { pmisId,adminLevel } = useContext(AuthContext);


    const { currentSelectedIds, setCurrentSelectedIds } = useContext(ThemeContext);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (isVisible) => {
        setModalVisible(isVisible);
    };

    useEffect(() => {
        selectedPId = []
        setisSelected([])
    }, []);


    const [isSelected, setisSelected] = useState([]);

    const onSelect = (id) => {

        selectedPId = currentSelectedIds
        const ifIdExitsInSelectedPID = selectedPId.includes(id);
        // console.log(id);

        // console.log(ifIdExitsInSelectedPID);

        if (ifIdExitsInSelectedPID) {
            const index = selectedPId.indexOf(id);
            if (index > -1) {
                selectedPId.splice(index, 1);
            }

        }
        else {
            selectedPId.push(id)
        }

        setCurrentSelectedIds(selectedPId)

        setisSelected([...isSelected, id])
        // console.log(selectedPId);
        // console.log(currentSelectedIds);

    }



    return (

        <TouchableOpacity
            style={{}}
            onPress={() => (onSelect(id))}>

            <View style={
                currentSelectedIds.includes(id) ?
                    {
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: `${currentTheme}40`

                    } :
                    {
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        // backgroundColor:'green'

                    }
            }>
                {/* <View style={{ elevation: 10,zIndex: 9, }}>
                <Text style={{color:'black'}} >{index + 1}</Text>
            </View> */}
                <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                    <View style={{ borderRadius: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }} >{index + 1}</Text>
                    </View>
                    {photo ?
                        <Image style={styles.logo} source={{ uri: "data:image/jpeg;base64," +  photo }} />
                        :
                        <Image style={styles.place_holder_logo} source={require('../assets/person_photo_placeholder.jpg')} ></Image>

                    }
                </View>
                <View style={{
                    flex: 2, paddingHorizontal: 9, paddingVertical: 6, borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1, }}>

                            {
                                adminLevel === 'superAdmin' ?
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('Biodata', { id:  id })
                                    }}>
                                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>PMIS ID : {id}</Text>
                                    </TouchableOpacity>
                                    : null
                            }



                            <Text style={{ fontSize: height * .019, fontFamily: 'serif', fontWeight: 'bold' }} >{ name}  </Text>
                        </View>
                        {
                             post ?
                                <View style={{ flex: 1, }}>
                                    <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'black', fontWeight: '600' }}>Po: { post} { charge == 'C' ? ', cc' :  charge == 'A' ? ', Addl.' : ''} </Text>
                                </View> : ''
                        }

                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'grey', fontWeight: '600' }}>De: { designation} </Text>
                        </View>

                    </View>

                    {
                         email &&
                        <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${ email}`) }}  >
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#5f9ea0', }}>{ email} </Text>
                        </TouchableOpacity>
                    }

                    <View style={{ flexDirection: "row-reverse", marginTop: 3 }}>
                        {
                             mobile &&
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:${ mobile}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{ mobile} </Text>
                            </TouchableOpacity>
                        }
                        {
                             pabx &&
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${ pabx}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{ pabx} </Text>
                            </TouchableOpacity>
                        }
                        {
                             mobile &&
                            <TouchableOpacity
                                    onPress={() => (toggleModal(true))}
                                style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingRight: 9, paddingLeft: 12 }}>
                                <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={height * .017} color="white" />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => toggleModal(true)}
            >
                <MakeCallModalComponent number={mobile} toggleModal={toggleModal} />
            </Modal>
        </TouchableOpacity>
    )
}









const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight ,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        //marginHorizontal: 16,
        height: 40,
        width: 90
    },
    title: {
        fontSize: 32,

    },
    logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        // elevation: 20


    },
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4',
        // elevation: 5


    },
    button: {
        backgroundColor: "gray",
        height: 40,
        width: 60,
        //padding: 10,
        borderRadius: 10
    },
    buttonText: {
        paddingTop: 9,
        paddingLeft: 16,
        color: "white",
        alignContent: 'center',
        justifyContent: 'center'
    },
    phnButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#6750a4",
        borderRadius: height * .005,
        marginHorizontal: 5,
        paddingVertical: 1,
        paddingHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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

    input: {
        borderStyle: "solid",
        borderColor: "#B7B7B7",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        paddingStart: 10,
        marginBottom: 15,
    },
    label: {
        marginBottom: 7,
        marginStart: 10,
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "44%",

    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,

    },
    getStarted: {
        backgroundColor: "#5188E3",
        color: "white",
        textAlign: "center",
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
    logIn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#758580",
    },

});




export default memo(ItemOffice);