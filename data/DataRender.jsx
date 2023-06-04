import { Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";
import { ToastAndroid, ActivityIndicator, Linking, RefreshControl, Dimensions, Image, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import DropDownPicker from 'react-native-dropdown-picker'

import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoadingScreen from "../screens/LoadingScreen";
import NoInternetScreen from '../screens/NoInternetScreen';

import Checkbox from 'expo-checkbox';
import * as Contacts from 'expo-contacts';
import { useForm } from 'react-hook-form';
import { FAB, Portal } from 'react-native-paper';
import Item from '../component/Item';

import FABComponent from '../component/FABComponent'



const filterIcon = '../assets/icons/filter.png'
const downArrowIcon = '../assets/icons/down-arrow.png'
const upArrowIcon = '../assets/icons/up-arrow.png'




import db from '../database/database';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


let selectedPId = []

let tempDist = []
let tempDropVal = [
    { label: "All DISTRICT", value: 0 },
    { label: "CHATTOGRAM", value: 1 },
    { label: "DHAKA", value: 2 },
    { label: "MUNSHIGANJ", value: 3 },
    { label: "RANGAMATI", value: 4 },
    { label: "PANI BHABAN", value: 5 }]
let tempValue = []
let tempLevel = []


const selectAllActive = '../assets/icons/select-all-active.png'
const selectAllInactive = '../assets/icons/select-all-inactive.png'





const DataRender = ({ designation, url, desig_code, tablename }) => {



    const navigation = useNavigation();
    // const { currentSelectedIds, setCurrentSelectedIds } = useContext(DataContext);
    let higherPost = ''
    const [higherPostForCurrentDesig, setHigherPostForCurrentDesig] = useState('');
    const [selectIcon, setselectIcon] = useState(selectAllInactive);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;


    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [districtFromDB, setDistrictFromDB] = useState([]);
    const { handleSubmit, control } = useForm();
    const [districtOpen, setDistrictOpen] = useState(false);

    const [selectedItems, setSelectedItems] = useState([]);

    const [masterData, setMasterData] = useState([])
    const [filteredData, setFilteredData] = useState(DATA)
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true);
    const [noInternetConnection, setnoInternetConnection] = useState()
    const [seniorityText, setseniorityText] = useState()

    const { presentOfficeCode } = useContext(AuthContext);
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { isAdmin, designationContext } = useContext(AuthContext);
    const { currentTheme, currentSelectedIds, setCurrentSelectedIds } = useContext(ThemeContext);  //currentSelectedIds, setCurrentSelectedIds

    const [isChecked, setChecked] = useState();
    const [isrtDateChecked, setisrtDateChecked] = useState();
    const [isrtJoiningChecked, setisrtJoiningChecked] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    const [currentDistValue, setCurrentDistValue] = useState();
    const [distName, setdistName] = useState();

    const [distForDropDown, setDistForDropDown] = useState();

    const [districtValue, setDistrictValue] = useState();
    const [district, setDistrict] = useState([]);


    let charge = presentCharge === 'R' ? '' :
        presentCharge === 'C' ? ',CC' :
            presentCharge === 'A' ? ',Addl.' :
                presentCharge === 'I' ? ',Incharge' : ''

    let msg = `\n\n\n\n\n...\nBest Regards, \n\n${name}\n${presentPost} ${charge}\n${presentOffice},BWDB`

    let toastMsg = `Please Select at least 1\n ${designation}`

    // const onGenderOpen = useCallback(() => {
    //     // setCompanyOpen(false);
    // }, []);

    // const onGenderOpen = useCallback(() => {
    //     // setCompanyOpen(false);
    // }, []);

    const onGenderOpen = () => { }

    useEffect(() => {
        sortByDistrict()
    }, [district]);

    const sortByDistrict = () => {

        setisrtDateChecked(false)
        setChecked(false)
        setisrtJoiningChecked(false)

        console.log('sortByDistrict', currentDistValue);

        if (currentDistValue === 'All DISTRICT') {
            setdistName('')
            setFilteredData(DATA)
        }
        else if (currentDistValue === 'PANI BHABAN') {
            setdistName('in HEADQUARTER')
            const newDataDhakaDist = DATA.filter((item) => {
                const itemData = item.officeDistrict ? item.officeDistrict.toLocaleLowerCase() : ''
                const textData = "DHAKA".toLocaleLowerCase();
                return itemData.indexOf(textData) > -1;
            });

            const newDataPaniBhaban = newDataDhakaDist.filter((item) => {
                const itemData = item.officeAddress ? item.officeAddress.toLocaleLowerCase() : ''
                const textData = currentDistValue ? 'PANI BHABAN'.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });

            const newDataHydrologyBuilding = newDataDhakaDist.filter((item) => {
                const itemData = item.officeAddress ? item.officeAddress.toLocaleLowerCase() : ''
                const textData = currentDistValue ? 'Hydro'.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });

            const newData = [...newDataPaniBhaban, ...newDataHydrologyBuilding]

            setFilteredData(newData)
        }
        else {
            setdistName("in " + currentDistValue)
            const newData = DATA.filter((item) => {
                const itemData = item.officeDistrict ? item.officeDistrict.toLocaleLowerCase() : ''
                const textData = currentDistValue ? currentDistValue.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
        }


        // if (distValue != 0 && distValue != 65) {

        //     distValue && console.log(distValue, 'in sortByDistrict func', district[distValue].label);
        //     distValue && setdistName("in " + district[distValue].label)
        //     const newData = DATA.filter((item) => {
        //         const itemData = item.officeDistrict ? item.officeDistrict.toLocaleLowerCase() : ''
        //         const textData = distValue ? district[distValue].label.toLocaleLowerCase() : "";
        //         return itemData.indexOf(textData) > -1;
        //     });
        //     setFilteredData(newData)
        //     // console.log('newData.length', newData.length, 'DATA', DATA.length);

        // }
        // else if (distValue == 65) {

        //     distValue && setdistName("in " + district[distValue].label)
        //     const newData = DATA.filter((item) => {
        //         const itemData = item.officeAddress ? item.officeAddress.toLocaleLowerCase() : ''
        //         const textData = distValue ? district[distValue].label.toLocaleLowerCase() : "";


        //         return itemData.indexOf(textData) > -1;
        //     });
        //     setFilteredData(newData)


        // }
        // else {
        //     setFilteredData(DATA)
        //     setdistName("")
        // }




    }

    useEffect(() => {

        currentSelectedIds.length === 0 ? setselectIcon(selectAllInactive) : setselectIcon(selectAllActive)

    }, [currentSelectedIds]);


    // ********************************  Internet Connection checked *************************************
    NetInfo.fetch().then(state => {
        // __DEV__ && console.log('Connection type', state.type);
        // __DEV__ && console.log('Is connected?', state.isConnected);
        setnoInternetConnection(state.isConnected)
    });
    // ********************************  Internet Connection checked *************************************


    //  ******************************  fetching data ***************************************



    const fetchDataFromDb = async () => {
        __DEV__ && console.log('in fetchDataFromDb');
        setIsLoading(true);

        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true);
        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority";
        setseniorityText(snrTxt);


        console.log('designationContext=====================================', designationContext);


        designationContext.forEach((desigItem, index) => {
            if (desigItem.designame === designation) {
                if (index - 1 >= 0)
                    if (desigItem.cadre === designationContext[index - 1].cadre)
                        higherPost = designationContext[index - 1].designame
            }
        });

        setHigherPostForCurrentDesig(higherPost)

        console.log(designation, '---------higherPost  ---------------------------', higherPost);

        try {
            setRefreshing(false);

            // check if table exits or not

            const [tableExistsResult, dataResult] = await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql("SELECT name FROM sqlite_master WHERE type='table';", [], (_, tableExistsResult) => {
                        resolve([tableExistsResult, null]);
                    });
                });
            });

            const tableNames = tableExistsResult.rows._array.map((table) => table.name);
            __DEV__ && console.log('Total table = ', tableNames.length);
            __DEV__ && console.log('Table names:', tableNames);

            const tableExists = tableNames.includes(tablename);
            if (tableExists) {
                __DEV__ && console.log(tablename, ' table exists');

                const { rows } = await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql(`SELECT * FROM ${tablename};`, [], (_, result) => {
                            resolve(result);
                        });
                    });
                });

                const data = rows._array;


                const dataWithSelected = data.map(item => (
                    item = { ...item, selected: 'false' }

                ))

                // console.log(dataWithSelected);


                setDATA(dataWithSelected);


                /////////////////////// district calculation //////////////////////////


                const distMap = {};
                data.forEach(item => {
                    if (distMap[item.officeDistrict]) {
                        distMap[item.officeDistrict]++;
                    } else {
                        distMap[item.officeDistrict] = 1;
                    }
                });
                console.log("distMap =---------------------------", distMap);

                var sortedKeys = Object.keys(distMap).sort();

                tempDist = [...tempDist, { label: "All DISTRICT", value: "All DISTRICT" }]

                sortedKeys.map(item =>
                    // console.log(item, ' - ', distMap[item])
                    tempDist = [...tempDist, { label: item + ' - ' + distMap[item], value: item }],
                    // tempLevel = [...tempLevel, {item}],
                    //tempValue=[...tempValue,{item}]
                )

                tempDist = [...tempDist, { label: "HQ", value: "PANI BHABAN" }]

                console.log(tempDist);


                // setDistForDropDown(tempDist)
                // setDistrict(tempDist)



                /////////////////////// district calculation //////////////////////////


                __DEV__ && console.log(data.length);

            } else {
                __DEV__ && console.log(tablename, ' table does not exist');

                const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
                const data = response.rows;

                const dataWithSelected = data.map(item => (
                    item = { ...item, selected: 'false' }

                ))

                // console.log(dataWithSelected);


                setDATA(dataWithSelected);


                /////////////////////// district calculation //////////////////////////


                const distMap = {};
                data.forEach(item => {
                    if (distMap[item.officeDistrict]) {
                        distMap[item.officeDistrict]++;
                    } else {
                        distMap[item.officeDistrict] = 1;
                    }
                });


                var sortedKeys = Object.keys(distMap).sort();

                tempDist = [...tempDist, { label: "All DISTRICT", value: "All DISTRICT" }]

                sortedKeys.map(item =>
                    // console.log(item, ' - ', distMap[item])
                    tempDist = [...tempDist, { label: item + ' - ' + distMap[item], value: item }],

                )

                tempDist = [...tempDist, { label: "HQ", value: "PANI BHABAN" }]

                console.log(tempDist);

                // setDistForDropDown(tempDist)
                // setDistrict(tempDist)



                /////////////////////// district calculation //////////////////////////


                await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS ${tablename} (
                                id          TEXT,
                                name        TEXT,
                                designation TEXT,
                                post        TEXT,
                                charge      TEXT,
                                seniority   INTEGER,
                                office      TEXT,
                                officeAddress  TEXT,
                                officeDistrict  TEXT,
                                mobile      TEXT,
                                pabx        TEXT,
                                email       TEXT,
                                retiredate  TEXT,
                                bwdbJoiningDt TEXT,
                                photo       BLOB,
                                selected    TEXT
                                                 );`
                        );



                        data.forEach((it) => {
                            tx.executeSql(
                                `INSERT INTO ${tablename} (
                                      id,
                                      name,
                                      designation,
                                      post,
                                      charge,
                                      seniority,
                                      office,
                                      officeAddress,
                                      officeDistrict,
                                      mobile,
                                      pabx,
                                      email,
                                      retiredate,
                                      bwdbJoiningDt,
                                      photo,
                                      selected)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);`,
                                [
                                    it.id,
                                    it.name,
                                    it.designation,
                                    it.post,
                                    it.charge,
                                    it.seniority,
                                    it.office,
                                    it.officeAddress,
                                    it.officeDistrict,
                                    it.mobile,
                                    it.pabx,
                                    it.email,
                                    it.retiredate,
                                    it.bwdbJoiningDt,
                                    it.photo,
                                    it.selected]
                            );
                        });




                    }, null, resolve);
                });



            }
        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }


    const fetchDistrictFromDb = async () => {


        try {

            const { rows } = await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(`SELECT count(*) "count", officeDistrict FROM ${tablename} group by officeDistrict;`, [], (_, result) => {
                        resolve(result);
                    });
                });
            });

            const distData = rows._array;
            setDistrictFromDB(distData);
            // console.log(distData.length);
            // console.log(distData);

        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }


    const refreshData = async () => {

        try {

            console.log(districtFromDB.length);
            districtFromDB.map((item, index) => console.log(index + 1, ' ', item.officeDistrict, ' = ', item.count))

            setRefreshing(false);
            setIsLoading(true);
            setSearch()

            setDATA([])

            deleteAllData();

            fetchDataAndInsert()

            setIsLoading(false);

            setChecked(false)
            setisrtDateChecked(false)
            setisrtJoiningChecked(false)

            setdistName('')
            setDistrictValue()
            setCurrentDistValue()
            setIsOpen(false)



        } catch (error) {
            __DEV__ && console.error(error.message);
        }
    }


    const deleteAllData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${tablename};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );
        });
    };


    // Function to read data from API and insert into table
    const fetchDataAndInsert = async () => {
        __DEV__ && console.log('in refresh');
        setIsLoading(true);

        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true);
        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority";
        setseniorityText(snrTxt);

        try {
            setRefreshing(false);




            const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
            const data = response.rows;

            const dataWithSelected = data.map(item => (
                item = { ...item, selected: 'false' }

            ))

            setDATA(dataWithSelected);

            await new Promise((resolve, reject) => {
                db.transaction((tx) => {


                    data.forEach((it) => {
                        tx.executeSql(
                            `INSERT INTO ${tablename} (
                                id,
                                name,
                                designation,
                                post,
                                charge,
                                seniority,
                                office,
                                officeAddress,
                                officeDistrict,
                                mobile,
                                pabx,
                                email,
                                retiredate,
                                bwdbJoiningDt,
                                photo,
                                selected)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?);`,
                            [
                                it.id,
                                it.name,
                                it.designation,
                                it.post,
                                it.charge,
                                it.seniority,
                                it.office,
                                it.officeAddress,
                                it.officeDistrict,
                                it.mobile,
                                it.pabx,
                                it.email,
                                it.retiredate,
                                it.bwdbJoiningDt,
                                it.photo,
                                it.selected]
                        );
                    });
                }, null, resolve);
            });




        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }






    useEffect(() => {

        // fetchData();
        fetchDataFromDb();

        setisrtDateChecked(false)
        setisrtJoiningChecked(false)
        setChecked(false)

        setSearch('')
        setdistName('')
        tempDist = []
        // controller.reset()
        setCurrentDistValue() // for reseting dropdown picker
        // fetchDistrictFromDb()
        setItems(tempDist)
        setCurrentSelectedIds([])
        setIsFilterOn(false)
        setIsOpen(false)

    }, [desig_code]);

    //  ******************************  fetching data ***************************************

    useEffect(() => {

        setFilteredData(DATA);  // for updating filterdata at first

    }, [DATA]);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    const contact = data[0];
                    // __DEV__ && console.log(contact);
                }
            }
        })();
    }, []);



    const seniorityUpdate = () => {

        setisrtDateChecked(false)
        setisrtJoiningChecked(false)


        setChecked(!isChecked)


        !isChecked ? setFilteredData(filteredData.sort((a, b) => { return a.seniority - b.seniority })) :
            setFilteredData(filteredData.sort((a, b) => { return a.name > b.name }))


    }

    const joiningDateUpdate = () => {

        setChecked(false)
        setisrtDateChecked(false)


        setisrtJoiningChecked(!isrtJoiningChecked)



        !isrtJoiningChecked ? setFilteredData(filteredData.sort((a, b) => { return new Date(a.bwdbJoiningDt.toString().trim().slice(0, 10)) - new Date(b.bwdbJoiningDt.toString().trim().slice(0, 10)) })) :
            setFilteredData(filteredData.sort((a, b) => { return a.name > b.name }))


    }

    const retirementDateUpdate = () => {

        setChecked(false)
        setisrtJoiningChecked(false)


        setisrtDateChecked(!isrtDateChecked)


        !isrtDateChecked ? setFilteredData(filteredData.sort((a, b) => { return new Date(a.retiredate.toString().trim().slice(0, 10)) - new Date(b.retiredate.toString().trim().slice(0, 10)) })) :
            setFilteredData(filteredData.sort((a, b) => { return a.name > b.name }))


    }


    const searchFilter = (text) => {

        let firstCharacter = text.charAt(0);
        console.log(firstCharacter);
        let isNameSearch = (/[a-zA-Z]/).test(firstCharacter)

        let isMobileSearch = false
        let isPabxSearch = false

        if (firstCharacter === '3')
            isPabxSearch = true
        else
            isMobileSearch = true

        if (text) {
            const newData = DATA.filter((item) => {
                let itemData
                isMobileSearch ? itemData = item.mobile ? item.mobile.toLocaleLowerCase() : '' : ''
                isPabxSearch ? itemData = item.pabx ? item.pabx.toLocaleLowerCase() : '' : ''
                isNameSearch ? itemData = item.name ? item.name.toLocaleLowerCase() : '' : ''
                if (!(isMobileSearch || isPabxSearch || isNameSearch))
                    itemData = ''
                const textData = text.toLocaleLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
            setSearch(text)
        }
        else {
            setFilteredData(DATA)
            setSearch(text)
            setdistName('')
            setDistrictValue()
        }

    }

    const ModalViewForEditNumber = ({ viewModal, name }) => (

        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewModal}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{name}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        </View>
    )


    const onSelect = (index) => {

        let tempFilterData = [...filteredData]

        tempFilterData[index].selected === "true" ?
            tempFilterData[index].selected = "false"
            : tempFilterData[index].selected = "true"


        setFilteredData(tempFilterData)

    }


    const bulkEmail = () => {


        if (currentSelectedIds.length === 0)
            ToastAndroid.show(toastMsg, ToastAndroid.LONG, ToastAndroid.TOP)
        else {
            let numbers = [];

            currentSelectedIds.map((itemId) => (
                filteredData.map((itemData) => {
                    if (itemId === itemData.id)
                        numbers += `${itemData.email};`; //mobileNoList.push(itemData.mobile)
                })
            ))

            numbers = numbers.slice(0, -1);
            console.log(numbers);

            const url = (Platform.OS === 'android')
                ? `mailto:${numbers}?body=${msg}`
                : `mailto:/open?addresses=${numbers}&body=${msg}`;

            Linking.openURL(url)
        }
    }


    const bulkSMS = () => {

        if (currentSelectedIds.length === 0)
            ToastAndroid.show(toastMsg, ToastAndroid.LONG, ToastAndroid.TOP)
        else {
            let numbers = [];

            currentSelectedIds.map((itemId) => (
                filteredData.map((itemData) => {
                    if (itemId === itemData.id)
                        numbers += `${itemData.mobile};`; //mobileNoList.push(itemData.mobile)
                })
            ))

            numbers = numbers.slice(0, -1);
            console.log(numbers);

            const url = (Platform.OS === 'android')
                ? `sms:${numbers}?body=${msg}`
                : `sms:/open?addresses=${numbers}&body=${msg}`;

            Linking.openURL(url)
        }

    }

    const selectAll = () => {

        const allId = filteredData.map((item) => (item.id))

        currentSelectedIds.length === 0 ? setCurrentSelectedIds(allId) : setCurrentSelectedIds([])
    }



    return (
        !noInternetConnection ? <NoInternetScreen /> :

            isLoading ?
                <LoadingScreen /> :
                //DATA.length == 0 ? <NoDataFoundScreen /> :
                <SafeAreaView style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        // backgroundColor: `${currentTheme}`
                    }}>

                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    selectionColor={'black'}       // for changing curcsor color
                                    style={{
                                        height: height / 20,
                                        width: "97%",
                                        borderRadius: 5,
                                        marginBottom: 5,
                                        marginLeft: 5,
                                        borderColor: `${currentTheme}`,//'#6750a4',
                                        borderWidth: 2,
                                        paddingLeft: 15,
                                        backgroundColor: 'white'
                                    }}
                                    placeholder="Search Name or Mobile or PABX ( 3 . . )"
                                    value={search}
                                    //underlineColorAndroid='trasparent'
                                    onChangeText={(text) => searchFilter(text)}
                                    mode='outlined'
                                />
                            </View>
                            <View>

                            </View>
                        </View>


                        <TouchableOpacity style={{

                            height: height / 20,
                            flex: 1,
                            borderRadius: 5,
                            marginBottom: 5,
                            // marginLeft: 5,
                            marginRight: 5,
                            // borderColor: `${currentTheme}`,//'#6750a4',
                            // borderWidth: 2,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}
                            onPress={() => { selectAll() }}
                        >
                            {
                                currentSelectedIds.length === 0 ?
                                    <Image
                                        source={require(selectAllInactive)}
                                        style={styles.select_all_icon}
                                    />
                                    :
                                    <Image
                                        source={require(selectAllActive)}
                                        style={styles.select_all_icon}
                                    />
                            }

                        </TouchableOpacity>
                    </View>


                    {search ?
                        <TouchableOpacity
                            style={{
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                marginTop: height * .01,
                                paddingRight: width * .135,


                            }}
                            onPress={() => (
                                searchFilter("")
                                , setDistrictValue(),
                                setdistName("")
                            )}
                        >
                            <Image
                                style={{
                                    height: 22,
                                    width: 22,
                                }}
                                source={require("../assets/close.png")}
                            />
                        </TouchableOpacity> : ""
                    }
                    {refreshing ? <ActivityIndicator /> : null}
                    {
                        notDgOrAdg &&
                        <TouchableOpacity
                            onPress={() => setIsFilterOn(!isFilterOn)}
                            style={{
                                marginLeft: width * .036,
                                backgroundColor: `${currentTheme}`,
                                width: width * .23,
                                flexDirection: 'row',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignContent: 'center',
                                padding: 2
                            }}
                        >
                            <Image
                                source={require(filterIcon)}
                                style={{ height: 20, width: 20 }}
                            />
                            <Text style={{
                                color: 'white',
                                fontSize: width * .037,
                                fontWeight: '800'
                            }}>Filters</Text>
                            {
                                !isFilterOn ?
                                    <Image
                                        source={require(downArrowIcon)}
                                        style={{ height: 20, width: 20 }}
                                    />
                                    :
                                    <Image
                                        source={require(upArrowIcon)}
                                        style={{ height: 20, width: 20 }}
                                    />}
                        </TouchableOpacity>
                    }

                    {
                        notDgOrAdg && isAdmin && isFilterOn ?

                            <View style={{

                                marginRight: 5, marginLeft: 20, marginBottom: 10, marginTop: 10,
                                flexDirection: 'row',
                                borderRadius: 10,
                                justifyContent: 'space-between',
                                // elevation:.2

                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity onPress={() => seniorityUpdate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isChecked}

                                            color={isChecked ? `${currentTheme}` : undefined}
                                        />

                                        <Text style={{ marginLeft: 5, fontSize: 13 }}>According to seniority</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => joiningDateUpdate()}
                                        style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                        <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isrtJoiningChecked}

                                            color={isrtJoiningChecked ? `${currentTheme}` : undefined}
                                        />

                                        <Text style={{ marginLeft: 5, fontSize: 13 }}>According to joining date</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => retirementDateUpdate()}
                                        style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                        <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isrtDateChecked}

                                            color={isrtDateChecked ? `${currentTheme}` : undefined}
                                        />

                                        <Text style={{ marginLeft: 5, fontSize: 13 }}>According to retirement date</Text>

                                    </TouchableOpacity>

                                </View>
                                <View style={{ width: 160, marginRight: 10, }}>
                                    <View >
                                        <DropDownPicker
                                            items={tempDist}
                                            open={isOpen}
                                            setOpen={() => setIsOpen(!isOpen)}
                                            value={currentDistValue}
                                            setValue={setCurrentDistValue}
                                            maxHeight={450}
                                            placeholder="Select Office Location"
                                            onChangeValue={() => sortByDistrict()}
                                        />
                                    </View>

                                </View>


                            </View> : ""
                    }


                    {
                        !search && DATA ?
                            <Text style={{ marginLeft: width * .035, color: 'black', fontSize: height * .01505, marginRight: height * .02, fontWeight: 'bold' }}>Total {designation} {distName}: {filteredData.length}</Text>
                            : ""
                    }


                    {
                        // currentSelectedIds.length != 0 ?
                        true ?
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    marginBottom: 40,
                                    marginRight: 30,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 1000,
                                    borderRadius: 70
                                }}>

                                <Portal style={{ marginBottom: 100 }}>
                                    <FAB.Group
                                        fabStyle={{ backgroundColor: `${currentTheme}`, color: 'white', marginBottom: height * .045 }}
                                        color='white'

                                        open={open}
                                        visible
                                        icon={open ? 'close' : 'plus'}
                                        actions={[

                                            {
                                                style: { backgroundColor: `${currentTheme}`, color: 'white' },
                                                icon: 'export',
                                                fabStyle: { color: 'white' },
                                                label: 'Export',
                                                onPress: () => console.log('Pressed star'),
                                            },
                                            {
                                                style: { backgroundColor: `${currentTheme}` },
                                                icon: 'email',
                                                label: 'Email',
                                                onPress: () => bulkEmail(),
                                            },
                                            {
                                                style: { backgroundColor: `${currentTheme}` },
                                                icon: 'message',
                                                label: 'Message',
                                                onPress: () => bulkSMS(),
                                            },
                                        ]}
                                        onStateChange={onStateChange}
                                        onPress={() => {
                                            if (open) {
                                                // do something if the speed dial is open
                                            }
                                        }}
                                    />
                                </Portal>
                            </TouchableOpacity> : ''
                    }

                    <FlashList
                        data={filteredData}
                        estimatedItemSize={200}
                        // keyExtractor={(item) => item.id}    // do not set key for flashlist , it creates problem rendering ovelap
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
                        }
                        renderItem={({ item, index }) => (
                            <Item
                                id={item.id}
                                name={item.name}
                                office={item.office}
                                email={item.email}
                                mobile={item.mobile}
                                seniority={item.seniority}
                                retiredate={item.retiredate}
                                bwdbJoiningDt={item.bwdbJoiningDt}
                                pabx={item.pabx}
                                selected={item.selected}
                                photo={item.photo}
                                index={index}
                                designation={designation}
                                post={item.post}
                                higherPost={higherPostForCurrentDesig}
                                charge={item.charge}
                                isAdmin={isAdmin}
                                notDgOrAdg={notDgOrAdg}
                                currentTheme={currentTheme}
                                length={filteredData.length}
                            />


                        )}

                    />





                </SafeAreaView>
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


    },
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4'


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
        elevation: 5,
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
    fab: {
        position: 'absolute',
        marginBottom: 56,
        marginRight: 36,
        right: 0,
        bottom: 0,
    },
    select_all_icon: {
        height: height * .055,
        width: height * .055,
    }

});



export default DataRender