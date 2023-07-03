import NetInfo from '@react-native-community/netinfo';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import Checkbox from 'expo-checkbox';
import * as Contacts from 'expo-contacts';
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Keyboard, Linking, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../api/api';
import FloatingBtnComponent from '../component/FloatingBtnComponent';
import Item from '../component/Item';
import ItemVacant from '../component/ItemVacant'
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoadingScreen from "../screens/LoadingScreen";
import NoInternetScreen from '../screens/NoInternetScreen';
import { Images } from '../utility/Images';
import { height, width } from '../utility/ScreenDimensions';
import { timeStamp } from '../utility/Time';
import { Charges } from '../utility/Charges';
import db from '../database/database';
import { imgSizeMini, txtSizeNormal } from '../utility/Scalling'

import { createDesignationTable } from '../database/CreateQueries'
import { deleteDataFromDesignationTable } from '../database/DeleteQueries'
import { insertDataIntoDesignationTable } from '../database/InsertQueries'




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



let charges = [
    { label: "All", value: "All" },
    { label: "Current", value: "C" },
    { label: "Additional", value: "A" },
    { label: "Incharge", value: "I" },
]


const selectAllActive = '../assets/icons/select-all-active.png'
const selectAllInactive = '../assets/icons/select-all-inactive.png'

//selectAll-theme-9
const selectAll_9 = '../assets/icons/selectAll-theme-9.png'
const selectAll_0 = '../assets/icons/selectAll-theme-0.png'
const selectAll_3 = '../assets/icons/selectAll-theme-3.png'
const selectAll_6 = '../assets/icons/selectAll-theme-6.png'





const DataRender = ({ designation, url, desig_code, tablename }) => {



    let listViewRef;
    const navigation = useNavigation();
    // const { currentSelectedIds, setCurrentSelectedIds } = useContext(DataContext);
    let higherPost = ''
    const [higherPostForCurrentDesig, setHigherPostForCurrentDesig] = useState('');
    const [selectIcon, setselectIcon] = useState(selectAllInactive);
    const [isFilterOn, setIsFilterOn] = useState(false);
    const [state, setState] = React.useState({ open: false });
    const [vacantData, setvacantData] = useState([]);
    const [totalVacantPost, setTotalVacantPost] = useState(0);
    const onStateChange = ({ open }) => setState({ open });
    const [groupMenu, setGroupMenu] = useState(false);
    const { open } = state;
    const [isFloatingBtnExteded, setIsFloatingBtnExteded] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [districtFromDB, setDistrictFromDB] = useState([]);
    const { handleSubmit, control } = useForm();
    const [districtOpen, setDistrictOpen] = useState(false);
    const [isVacantActive, setIsVacantActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeIcon, setActiveIcon] = useState();
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
    const { currentTheme, currentSelectedIds, setCurrentSelectedIds, groupIds } = useContext(ThemeContext);  //currentSelectedIds, setCurrentSelectedIds

    const [isChecked, setChecked] = useState();
    const [isrtDateChecked, setisrtDateChecked] = useState();
    const [isrtJoiningChecked, setisrtJoiningChecked] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const [isChargeOpen, setIsChargeOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [tabelCreationTime, setTabelCreationTime] = useState('');
    const [totalNBSPost, setTotalNBSPost] = useState('');

    const [currentDistValue, setCurrentDistValue] = useState();
    const [currentChargeValue, setCurrentChargeValue] = useState();
    const [distName, setdistName] = useState();

    const [distForDropDown, setDistForDropDown] = useState();

    const [districtValue, setDistrictValue] = useState();
    const [district, setDistrict] = useState([]);


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
                setIsFloatingBtnExteded(false)
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);




    let charge = Charges(presentCharge)
    console.log(charge);
    let msg = `\n\n\n\n\n...\nBest Regards, \n\n${name}\n${presentPost} ${charge}\n${presentOffice},BWDB.`

    let totalNeedBaseSetup = `Total ${totalNBSPost} post of ${designation} (Need Base Setup)`


    let toastMsg = `Please Select at least 1\n ${designation}`



    useEffect(() => {
        sortByDistrict()
    }, [district]);

    const sortByDistrict = () => {

        setisrtDateChecked(false)
        setChecked(false)
        setisrtJoiningChecked(false)

        __DEV__ && console.log('sortByDistrict', currentDistValue);

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

    const chargeFilter = () => {

        setisrtDateChecked(false)
        setChecked(false)
        setisrtJoiningChecked(false)

        // console.log('chargeFilter', Charges(currentChargeValue));


        // setdistName("in " + Charges(currentChargeValue))


        if (currentChargeValue === 'All') {
            setdistName('')
            setFilteredData(DATA)
        }
        else {
            const newData = DATA.filter((item) => {
                const itemData = item.charge ? item.charge.toLocaleLowerCase() : ''
                const textData = currentChargeValue ? currentChargeValue.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
        }


    }




    // useEffect(() => {

    //     currentSelectedIds.length === 0 ? setselectIcon(selectAllInactive) : setselectIcon(activIcon)

    // }, [currentSelectedIds]);


    // ********************************  Internet Connection checked *************************************
    NetInfo.fetch().then(state => {
        // __DEV__ && console.log('Connection type', state.type);
        // __DEV__ && console.log('Is connected?', state.isConnected);
        setnoInternetConnection(state.isConnected)
    });
    // ********************************  Internet Connection checked *************************************


    //  ******************************  fetching data ***************************************

    const downButtonHandler = () => {
        //OnCLick of down button we scrolled the list to bottom
        listViewRef.scrollToEnd({ animated: true });
    };

    const upButtonHandler = () => {
        //OnCLick of Up button we scrolled the list to top
        listViewRef.scrollToOffset({ offset: 0, animated: true });
    };

    const fetchDataFromDb = async () => {
        __DEV__ && console.log('in fetchDataFromDb');
        setIsLoading(true);

        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true);
        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority";
        setseniorityText(snrTxt);


        // console.log(`designationContext==============\n=\n=\n=====================`, designationContext);


        designationContext.forEach((desigItem, index) => {
            if (desigItem.designame === designation) {
                setTotalNBSPost(desigItem.totalPostNBS)
                // console.log('desigItem.totalPostNBS ######################################',desigItem.totalPostNBS);
                if (index - 1 >= 0)
                    if (desigItem.cadre === designationContext[index - 1].cadre)
                        higherPost = designationContext[index - 1].designame
            }
        });

        setHigherPostForCurrentDesig(higherPost)

        __DEV__ && console.log(designation, '---------higherPost  ---------------------------', higherPost);

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

            // const vacantTableNames = tableNames.map(it => (it.includes('vacant') ? it : ''))

            // const vacantTableName = `vacant${tablename}`




            // console.log(vacantTableName);


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

                console.log('data[0] === ', data.length);

                data.length && setTabelCreationTime(data[0].timestamp)


                // const dataWithSelected = data.map(item => (
                //     item = { ...item, selected: 'false' }

                // ))

                // console.log(dataWithSelected);


                setDATA(data);




                ////////////////////////////////////////vacant list //////////////////////////////////////

                // const { vacantRows } = await new Promise((resolve, reject) => {
                //     db.transaction((tx) => {
                //         tx.executeSql(`SELECT * FROM ${vacantTableName};`, [], (_, result) => {
                //             resolve(result);
                //         });
                //     });
                // });

                // const vacantData = vacantRows._array;

                ////////////////////////////////////////vacant list //////////////////////////////////////


                /////////////////////// district calculation //////////////////////////

                const distMap = {};
                data.forEach(item => {
                    if (distMap[item.officeDistrict]) {
                        distMap[item.officeDistrict]++;
                    } else {
                        distMap[item.officeDistrict] = 1;
                    }
                });
                // console.log("distMap =---------------------------", distMap);

                var sortedKeys = Object.keys(distMap).sort();

                tempDist = [...tempDist, { label: "All DISTRICT", value: "All DISTRICT" }]

                sortedKeys.map(item =>
                    // console.log(item, ' - ', distMap[item])
                    tempDist = [...tempDist, { label: item + ' - ' + distMap[item], value: item }],
                    // tempLevel = [...tempLevel, {item}],
                    //tempValue=[...tempValue,{item}]
                )

                tempDist = [...tempDist, { label: "HQ", value: "PANI BHABAN" }]

                /////////////////////// district calculation //////////////////////////

            } else {

                //////////////////////////////////////// UNREACHABLE CODE /////////////////////////////////////

                // This block possibaly can not be reached due to preload data while installation or first opening the app

                console.log();
                console.log('---------------------------------------------------------------------');
                console.log("----------------- UNREACHED BLOCK HAS BEEN REACHED ------------------");
                console.log('---------------------------------------------------------------------');


                const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
                const data = response.rows;

                const dataWithSelected = data.map(item => (
                    item = { ...item, selected: 'false' }

                ))

                // console.log(dataWithSelected);

                setTabelCreationTime(timeStamp())

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


                /////////////////////// district calculation //////////////////////////
                createDesignationTable(tablename)

                insertDataIntoDesignationTable(tablename, data)


                //////////////////////////////////////// UNREACHABLE CODE /////////////////////////////////////


            }
        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }

    const fetchVacantDataFromDb = async () => {

        setIsLoading(true);


        // console.log(`designationContext==============\n=\n=\n=====================`, designationContext);



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
            __DEV__ && console.log('Total table number = ', tableNames.length);
            // __DEV__ && console.log('Table names:', tableNames);

            const tableExists = tableNames.includes(tablename);

            // const vacantTableNames = tableNames.map(it => (it.includes('vacant') ? it : ''))

            const vacantTableName = `VACANT${tablename}`




            console.log(vacantTableName);

            if (tableExists) {


                const { data: vacantResponse } = await api.get("vacantDesigList", { params: { desig: desig_code } });
                const vacantData = vacantResponse.rows;

                let totalVacanPost=0
                vacantData.forEach(it => {
                    totalVacanPost += parseInt(it.postNo)
                });

                setTotalVacantPost(totalVacanPost)

                console.log('totalVacanPost ' + totalVacanPost);

                setvacantData(vacantData)

                console.log("in data render");
                // console.log(vacantData);


                ////////////////////////////////////////vacant list //////////////////////////////////////

                const { vacantRows } = await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql(`SELECT * FROM vacantSUBDIVENGCIV;`, [], (_, result) => {
                            resolve(result);
                        });
                    });
                });

                console.log(vacantRows);
                // const vacantData = vacantRows._array;

                ////////////////////////////////////////vacant list //////////////////////////////////////




            }
        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }



    const refreshData = async () => {

        try {


            setRefreshing(false);
            setIsLoading(true);
            setSearch()

            setDATA([])

            deleteDataFromDesignationTable(tablename)


            fetchDataAndInsert()


            setChecked(false)
            setisrtDateChecked(false)
            setisrtJoiningChecked(false)
            setTabelCreationTime(timeStamp())

            setdistName('')
            setDistrictValue()
            setCurrentDistValue()
            setCurrentChargeValue()
            setIsOpen(false)
            setIsChargeOpen(false)

            setIsLoading(false);


        } catch (error) {
            __DEV__ && console.error(error.message);
        }
    }





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

            insertDataIntoDesignationTable(tablename, data)




        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }





    // useeffect for initializing first
    useEffect(() => {

        // fetchData();
        fetchDataFromDb();
        fetchVacantDataFromDb()

        setisrtDateChecked(false)
        setisrtJoiningChecked(false)
        setChecked(false)

        setSearch('')
        setdistName('')
        tempDist = []

        setIsVacantActive(false)
        setCurrentDistValue() // for reseting dropdown picker
        setCurrentChargeValue()
        setItems(tempDist)
        setCurrentSelectedIds([])
        setIsFilterOn(false)
        setIsOpen(false)
        setIsChargeOpen(false)
        setIsFloatingBtnExteded(false)
        setGroupMenu(false)

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
        __DEV__ && console.log(firstCharacter);
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





    const groupHanlder = () => {
        setGroupMenu(!groupMenu)
        console.log('groupHanlder');
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
            __DEV__ && console.log(numbers);

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
            __DEV__ && console.log(numbers);

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
                                    onChangeText={(text) => { searchFilter(text) }}
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
                                    : currentTheme === '#6750a4' ?
                                        <Image
                                            source={Images['selectAll_0']}
                                            style={styles.select_all_icon}
                                        /> : currentTheme === '#048BB3' ?
                                            <Image
                                                source={Images['selectAll_3']}
                                                style={styles.select_all_icon}
                                            /> : currentTheme === '#0089E3' ?
                                                <Image
                                                    source={Images['selectAll_6']}
                                                    style={styles.select_all_icon}
                                                /> : currentTheme === '#0069C4' ?
                                                    <Image
                                                        source={Images['selectAll_9']}
                                                        style={styles.select_all_icon}
                                                    /> : ''
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
                                , setCurrentDistValue(""),
                                setdistName(""),
                                setCurrentChargeValue("")

                            )}
                        >
                            <Image
                                style={{
                                    height: 22,
                                    width: 22,
                                }}
                                source={Images['close']}
                            />
                        </TouchableOpacity> : ""
                    }
                    {refreshing ? <ActivityIndicator /> : null}
                    {
                        notDgOrAdg &&
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => setIsFilterOn(!isFilterOn)}
                                style={{
                                    marginLeft: width * .036,
                                    backgroundColor: `${currentTheme}`,
                                    width: width * .23,
                                    flexDirection: 'row',
                                    borderRadius: height * .009,
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    padding: 2,
                                    elevation: 5
                                }}
                            >
                                <Image
                                    source={Images['filterIcon']}
                                    style={{ height: imgSizeMini, width: imgSizeMini }}
                                />
                                <Text style={{
                                    color: 'white',
                                    fontSize: width * .037,
                                    fontWeight: '800'
                                }}>Filter</Text>
                                {
                                    !isFilterOn ?
                                        <Image
                                            source={Images['downArrowIcon']}
                                            style={{ height: imgSizeMini, width: imgSizeMini }}
                                        />
                                        :
                                        <Image
                                            source={Images['upArrowIcon']}
                                            style={{ height: imgSizeMini, width: imgSizeMini }}
                                        />}
                            </TouchableOpacity>
                            {
                                !isFilterOn &&
                                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                                    <Text
                                        style={{
                                            marginLeft: 3, color: 'grey', fontSize: height * .015
                                        }}> {isChecked ? 'Seniority' :
                                            isrtDateChecked ? 'Retirement Date' :
                                                isrtJoiningChecked ? 'Joining Date' : 'Alphabetically'}</Text>
                                </View>
                            }
                        </View>
                    }


                    {
                        notDgOrAdg && isAdmin && isFilterOn ?

                            <View style={{

                                marginRight: 5, marginLeft: 20, marginBottom: 10, marginTop: 10,
                                flexDirection: 'row',
                                borderRadius: 10,
                                justifyContent: 'space-between',


                            }}>
                                <View style={{ flex: 1.25, flexDirection: 'column' }}>
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
                                    <Text style={{ fontSize: width * .032, fontWeight: '600', paddingTop: 10 }}>{totalNeedBaseSetup}</Text>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 7,
                                            backgroundColor: 'white',
                                            borderRadius: height * .005,
                                            width: 140,
                                            elevation: 5
                                            // borderColor: 'black',
                                            // borderWidth:1
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => setIsVacantActive(false)}
                                            style={{
                                                height: 20,
                                                width: 70,
                                                backgroundColor: isVacantActive ? 'white' : `${currentTheme}`,
                                                borderRadius: height * .005,
                                            }}>
                                            <Text
                                                style={{
                                                    color: isVacantActive ? 'black' : 'white',
                                                    height: height * (1 / 40),
                                                    fontSize: txtSizeNormal,
                                                    fontFamily: 'serif',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>Current</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => setIsVacantActive(true)}
                                            style={{
                                                height: 20,
                                                width: 70,
                                                backgroundColor: !isVacantActive ? 'white' : `${currentTheme}`,
                                                borderRadius: height * .005,
                                            }}>
                                            <Text
                                                style={{
                                                    color: !isVacantActive ? 'black' : 'white',
                                                    height: height * (1 / 40),
                                                    fontSize: txtSizeNormal,
                                                    fontFamily: 'serif',
                                                    textAlign: 'center',
                                                    fontWeight: 'bold'
                                                }}>Vacant</Text>
                                        </TouchableOpacity>
                                    </View>



                                </View>

                                <View style={{ flex: 1 }}>

                                    <View style={{ width: width * .40, marginRight: 10, marginBottom: 2 }}>
                                        <DropDownPicker
                                            style={{ zIndex: 1000 }}
                                            items={tempDist}
                                            open={isOpen}
                                            setOpen={() => { setIsOpen(!isOpen), setIsChargeOpen(false) }}
                                            value={currentDistValue}
                                            setValue={setCurrentDistValue}
                                            maxHeight={450}
                                            placeholder="Select Office Location"
                                            onChangeValue={() => sortByDistrict()}
                                        />
                                    </View>
                                    <View style={{ width: width * .40, marginRight: 10, }}>
                                        <DropDownPicker
                                            style={{ zIndex: 900 }}
                                            items={charges}
                                            open={isChargeOpen}
                                            setOpen={() => { setIsChargeOpen(!isChargeOpen), setIsOpen(false) }}
                                            value={currentChargeValue}
                                            setValue={setCurrentChargeValue}
                                            maxHeight={200}
                                            placeholder="Select Charge"
                                            onChangeValue={() => chargeFilter()}
                                        />
                                    </View>

                                </View>




                            </View> : ""
                    }


                    {
                        !search && DATA ?
                            <Text style={{ marginLeft: width * .035, color: 'black', fontSize: height * .016, marginRight: height * .02, fontWeight: 'bold' }}>Total {isVacantActive ? "vacant post of" : ""} {designation} {isVacantActive ? "" : distName}: {isVacantActive ? totalVacantPost : filteredData.length}</Text>
                            : ""
                    }
                    <Text style={{ marginLeft: width * .035, color: 'grey', fontStyle: 'italic', fontSize: height * .014, marginRight: height * .02, fontWeight: 'bold' }}>Last Update Taken : {tabelCreationTime}</Text>




                    {
                        !isVacantActive &&
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
                            ref={(ref) => {
                                listViewRef = ref;
                            }}

                        />
                    }



                    {
                        isVacantActive &&
                        <>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 5,

                            }}>

                                <View style={{
                                    flex: 1, backgroundColor: `${currentTheme}50`,
                                    borderTopLeftRadius: height * .005,
                                    justifyContent: 'center',
                                    padding: 5


                                }}>

                                    <Text style={{ textAlign: 'center', fontSize: txtSizeNormal }}>No.</Text>
                                </View>

                                <View style={{
                                    flex: 2, backgroundColor: `${currentTheme}50`,
                                    justifyContent: 'center', padding: 5

                                }}>
                                    <Text style={{ textAlign: 'center', fontSize: txtSizeNormal }}>Office Code</Text>
                                </View>

                                <View style={{
                                    flex: 8, backgroundColor: `${currentTheme}50`,
                                    justifyContent: 'center', padding: 5

                                }}>

                                    <Text style={{ textAlign: 'center', fontSize: txtSizeNormal }}>Office Name</Text>
                                </View>

                                <View style={{
                                    flex: 2, backgroundColor: `${currentTheme}50`,
                                    borderTopRightRadius: height * .005,
                                    justifyContent: 'center', padding: 5

                                }}>

                                    <Text style={{ textAlign: 'center', fontSize: txtSizeNormal }}>Vacant Post</Text>
                                </View>
                            </View>

                            <FlashList
                                data={vacantData}
                                estimatedItemSize={200}
                                // keyExtractor={(item) => item.id}    // do not set key for flashlist , it creates problem rendering ovelap
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
                                }
                                renderItem={({ item, index }) => (
                                    <ItemVacant

                                        index={index + 1}
                                        office={item.office}
                                        officeName={item.officeName}
                                        postNo={item.postNo}

                                    />

                                )}
                                ref={(ref) => {
                                    listViewRef = ref;
                                }}

                            />
                        </>
                    }



                    {
                        !isVacantActive &&
                        <>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={downButtonHandler}
                                style={{
                                    position: 'absolute',
                                    width: width * .1,
                                    height: width * .1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    right: width * .0598,
                                    bottom: height * .069,
                                    backgroundColor: `${currentTheme}`,
                                    borderTopRightRadius: height * .005,
                                    borderBottomEndRadius: height * .005,
                                    elevation: 2


                                }}>
                                <Image
                                    source={Images['downArrowIcon']}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 50,
                                        height: 30,
                                        marginTop: 2
                                    }}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={upButtonHandler}
                                style={{
                                    position: 'absolute',
                                    width: width * .1,
                                    height: width * .1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    right: width * .163,
                                    bottom: height * .069,
                                    backgroundColor: `${currentTheme}`,
                                    borderTopLeftRadius: height * .005,
                                    borderBottomStartRadius: height * .005,
                                    elevation: 2

                                }}>
                                <Image
                                    source={Images['upArrowIcon']}
                                    style={{
                                        resizeMode: 'contain',
                                        width: 55,
                                        height: 30,
                                        marginTop: 0
                                    }}
                                />

                            </TouchableOpacity>
                        </>
                    }

                    {
                        !isKeyboardVisible && !isVacantActive &&
                        <View
                            // activeOpacity={0.5}

                            style={{
                                flexDirection: 'row-reverse',
                                position: 'absolute',
                                // width: width * .1,
                                // height: width * .1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                right: 0,
                                bottom: height * .35,
                                //  backgroundColor: `${currentTheme}`,

                                elevation: 10

                            }}>
                            <TouchableOpacity onPress={() => { setIsFloatingBtnExteded(!isFloatingBtnExteded), setGroupMenu(false) }}>
                                <Image
                                    source={Images['leftArrowIcon']}
                                    style={{
                                        resizeMode: 'contain',
                                        width: width * .1,
                                        height: width * .1,
                                        marginTop: 0

                                    }}
                                />
                            </TouchableOpacity>

                            {
                                isFloatingBtnExteded &&
                                <View style={{
                                    backgroundColor: `${currentTheme}`,
                                    flexDirection: 'row',
                                    borderRadius: height * .005,
                                    borderColor: 'white',
                                    borderWidth: 2
                                }}>
                                    <FloatingBtnComponent
                                        currentTheme={currentTheme}
                                        icon='groupIcon'
                                        txt="Group"
                                        badgeCount={groupIds.length}
                                        callBackFn={groupHanlder}
                                    />
                                    <FloatingBtnComponent
                                        currentTheme={currentTheme}
                                        icon='msglIcon'
                                        txt="SMS"
                                        badgeCount={currentSelectedIds.length}
                                        callBackFn={bulkSMS}
                                    />

                                    <FloatingBtnComponent
                                        currentTheme={currentTheme}
                                        icon='emailIcon'
                                        txt="Email"
                                        badgeCount={currentSelectedIds.length}
                                        callBackFn={bulkEmail}
                                    />

                                </View>
                            }

                        </View>


                    }


                    <View
                        // activeOpacity={0.5}

                        style={{
                            flexDirection: 'column',
                            position: 'absolute',
                            // width: width * .1,
                            // height: width * .1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            right: width * .40,
                            bottom: height * .46,
                            //  backgroundColor: `${currentTheme}`,

                            elevation: 10

                        }}>

                        {
                            groupMenu &&
                            <View style={{
                                backgroundColor: `${currentTheme}`,
                                flexDirection: 'column',
                                borderRadius: height * .005,
                                borderColor: 'white',
                                borderWidth: 2
                            }}>

                                <FloatingBtnComponent
                                    currentTheme={currentTheme}
                                    icon='creatGroup'
                                    txt="Create"
                                    badgeCount={currentSelectedIds.length}
                                    callBackFn={bulkSMS}
                                />

                                <FloatingBtnComponent
                                    currentTheme={currentTheme}
                                    icon='addGroup'
                                    txt="Add"
                                    badgeCount={currentSelectedIds.length}
                                    callBackFn={bulkEmail}
                                />

                                <FloatingBtnComponent
                                    currentTheme={currentTheme}
                                    icon='clearGroup'
                                    txt="Clear"
                                    badgeCount={currentSelectedIds.length}
                                    callBackFn={bulkEmail}
                                />

                            </View>
                        }

                    </View>

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
    },
    downButtonStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 70,
        backgroundColor: 'white',
        borderRadius: 20

    },
    downButtonImageStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 30,
    },

});



export default DataRender