import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import Checkbox from 'expo-checkbox';
import * as Contacts from 'expo-contacts';
import React, { useContext, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { Modal, ActivityIndicator, Image, Keyboard, Linking, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import api from '../api/api';
import FloatingBtnComponent from '../component/FloatingBtnComponent';
import ItemBlood from '../component/ItemBlood';
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

import { Camera } from 'expo-camera'

import CreateGroupModalComponent from '../component/modalComponents/CreateGroupModalComponent'


import AddGroupModalComponent from '../component/modalComponents/AddGroupModalComponent'




let selectedPId = []
let chargeMap = {};
let tempDist = []
let postMap = {}
let ageMap = [
    { label: "All Age", value: "all" },
    { label: "Below 20", value: "below 20" },
    { label: "21-25", value: "21-25" },
    { label: "26-30", value: "26-30" },
    { label: "31-35", value: "31-35" },
    { label: "36-40", value: "36-40" },
    { label: "41-45", value: "41-45" },
    { label: "46-50", value: "46-50" },
    { label: "51-55", value: "51-55" },
    { label: "56-59", value: "56-59" },
]
let postKeys
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

let higherPost = ''



const DataRenderBlood = ({ designation, url, desig_code, tablename }) => {



    let listViewRef;
    const navigation = useNavigation();
    // const { currentSelectedIds, setCurrentSelectedIds } = useContext(DataContext);

    const [isSummeryVisible, setIsSummeryVisible] = useState(false);

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
    const [isReportActive, setIsReportActive] = useState(false);
    const [isCurrentActive, setIsCurrentActive] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [activeIcon, setActiveIcon] = useState();
    const [masterData, setMasterData] = useState([])
    const [filteredData, setFilteredData] = useState(DATA)
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [searchDesig, setSearchDesig] = useState('')
    const [refreshing, setRefreshing] = useState(true);
    const [noInternetConnection, setnoInternetConnection] = useState()
    const [seniorityText, setseniorityText] = useState()
    const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
    const [isAddModalVisible, setisAddModalVisible] = useState(false);
    const [distTempData, setdistTempData] = useState([]);

    const { presentOfficeCode } = useContext(AuthContext);
    const { photo,
        officeAddres,
        presentOffice,
        name,
        logout,
        presentPost,
        presentCharge,
        postGrade,
        adminLevel,
        canCallBulk,
        canAccessSeniority,
        isAdmin,
        designationContext } = useContext(AuthContext);

    const { currentTheme, currentSelectedIds, setCurrentSelectedIds, groupIds } = useContext(ThemeContext);  //currentSelectedIds, setCurrentSelectedIds

    const [isChecked, setChecked] = useState();
    const [isrtDateChecked, setisrtDateChecked] = useState();
    const [isrtJoiningChecked, setisrtJoiningChecked] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)

    const [isOpen, setIsOpen] = useState(false);
    const [isAgeOpen, setIsAgeOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    const [tabelCreationTime, setTabelCreationTime] = useState('');
    const [totalNBSPost, setTotalNBSPost] = useState('');

    const [currentDistValue, setCurrentDistValue] = useState();
    const [currentAge, setcurrentAge] = useState();
    const [currentChargeValue, setCurrentChargeValue] = useState();
    const [distName, setdistName] = useState();
    const [ageValue, setAgeValue] = useState();

    const [distForDropDown, setDistForDropDown] = useState();

    const [districtValue, setDistrictValue] = useState();
    const [district, setDistrict] = useState([]);


    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    const toggleCreateModal = (isVisible) => {
        setisCreateModalVisible(isVisible);
    };

    const toggleAddModal = (isVisible) => {
        setisAddModalVisible(isVisible);
    };



    function camelize(string) {
        string = string.toLowerCase()
        return string.replace(/(?:)([a-z])/g, (match, group1) => group1.toUpperCase())
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
                setIsFloatingBtnExteded(false)
                setGroupMenu(false)
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
    __DEV__ && console.log(charge);
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
        setcurrentAge("")

        __DEV__ && console.log('sortByDistrict', currentDistValue);

        if (currentDistValue === 'All DISTRICT') {
            setdistName('')
            setFilteredData(DATA)
            setdistTempData(DATA)
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
            setdistTempData(newData)

        }
        else {
            setdistName("in " + currentDistValue)
            const newData = DATA.filter((item) => {
                const itemData = item.officeDistrict ? item.officeDistrict.toLocaleLowerCase() : ''
                const textData = currentDistValue ? currentDistValue.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
            setdistTempData(newData)

        }





    }



    const sortByAge = () => {

        setisrtDateChecked(false)
        setChecked(false)
        setisrtJoiningChecked(false)

        __DEV__ && console.log('sortByDistrict', currentAge);

        if (currentAge === 'all') {
            setAgeValue('')
            setFilteredData(distTempData)
        }
        else if (currentAge === 'below 20') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) <= 20)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '21-25') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ &&  console.log(Number(itemData));
                if (Number(itemData) > 21 && Number(itemData) <= 25)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '26-30') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 26 && Number(itemData) <= 30)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '31-35') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 31 && Number(itemData) <= 35)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '36-40') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 36 && Number(itemData) <= 40)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '41-45') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 41 && Number(itemData) <= 45)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '46-50') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 46 && Number(itemData) <= 50)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '51-55') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 51 && Number(itemData) <= 55)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else if (currentAge === '56-59') {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.ageYear ? item.ageYear : ''

                __DEV__ && console.log(Number(itemData));
                if (Number(itemData) >= 56 && Number(itemData) <= 59)
                    return true
                else
                    return false

            });
            setFilteredData(newData)
        }
        else {
            setAgeValue('(' + currentAge + ')')
            const newData = distTempData.filter((item) => {
                const itemData = item.officeDistrict ? item.officeDistrict.toLocaleLowerCase() : ''
                const textData = currentAge ? currentAge.toLocaleLowerCase() : '';
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
        }







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

    const netInfo = useNetInfo();


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



            __DEV__ && console.log();
            __DEV__ && console.log('---------------------------------------------------------------------');
            __DEV__ && console.log("---------- UNREACHED BLOCK HAS BEEN REACHED FOR BLOOD SEARCH --------");
            __DEV__ && console.log('---------------------------------------------------------------------');

            __DEV__ &&  console.log('desig_code-----------blood----------' + desig_code);
            const { data: response } = await api.get('blood', { params: { bldgrp: desig_code } });
            // console.log('responseURL-------------------+++++ ' + response.config.url);
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
        } catch (error) {
            __DEV__ && console.error(error);
        }
        setIsLoading(false);
    }




    const refreshData = async () => {

        if (netInfo.isConnected) {

            try {


                // setRefreshing(false);
                // setIsLoading(true);
                setSearch()
                setSearchDesig()
                setDATA([])

                deleteDataFromDesignationTable(tablename)


                fetchDataAndInsert()
                chargeMap = {}

                setChecked(false)
                setisrtDateChecked(false)
                setisrtJoiningChecked(false)
                setTabelCreationTime(timeStamp())

                setdistName('')
                setDistrictValue()
                setCurrentDistValue()
                setcurrentAge()
                setCurrentChargeValue()
                setIsOpen(false)
                setIsAgeOpen(false)

                // setIsLoading(false);


            } catch (error) {
                __DEV__ && console.error(error.message);
            }
        }
        else {
            ToastAndroid.show("Please Connect Internet To Update Data", ToastAndroid.LONG, ToastAndroid.TOP)

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
        // fetchVacantDataFromDb()
        setDATA([]);
        setisrtDateChecked(false)
        setisrtJoiningChecked(false)
        setChecked(false)

        setSearch('')
        setSearchDesig('')
        setdistName('')
        tempDist = []
        chargeMap = {};
        postMap = {}
        setIsSummeryVisible(false)
        setIsVacantActive(false)
        setIsReportActive(false)
        setIsCurrentActive(true)
        setCurrentDistValue() // for reseting dropdown picker
        setcurrentAge()
        setCurrentChargeValue()
        setItems(tempDist)
        setCurrentSelectedIds([])
        setIsFilterOn(false)
        setIsOpen(false)
        setIsAgeOpen(false)
        setIsFloatingBtnExteded(false)
        setGroupMenu(false)

    }, [desig_code]);

    //  ******************************  fetching data ***************************************

    useEffect(() => {

        setFilteredData(DATA);  // for updating filterdata at first

    }, [DATA]);

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Contacts.requestPermissionsAsync();
    //         if (status === 'granted') {
    //             const { data } = await Contacts.getContactsAsync({
    //                 fields: [Contacts.Fields.Emails],
    //             });

    //             if (data.length > 0) {
    //                 const contact = data[0];
    //                 __DEV__ && console.log(contact);
    //             }
    //         }
    //     })();
    // }, []);



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
        let isBloodSearch = false

        if (firstCharacter === '3')
            isPabxSearch = true
        if (firstCharacter === '+')
            isBloodSearch = true
        else
            isMobileSearch = true

        if (text) {
            const newData = DATA.filter((item) => {

                let itemData

                isMobileSearch ? itemData = item.mobile ? item.mobile.toLocaleLowerCase() : '' : ''
                isPabxSearch ? itemData = item.pabx ? item.pabx.toLocaleLowerCase() : '' : ''
                isNameSearch ? itemData = item.name ? item.name.toLocaleLowerCase() : '' : ''
                isBloodSearch ? itemData = item.blood ? item.blood.toLocaleLowerCase() : '' : ''

                if (!(isMobileSearch || isPabxSearch || isNameSearch || isBloodSearch))
                    itemData = ''
                const textData = text.toLocaleLowerCase();


                if (isBloodSearch)

                    return itemData.indexOf(isBloodSearch ? textData.substring(1) : textData, 0) > -1;
                else
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

    const searchFilterDesignation = (text) => {


        let firstCharacter = text.charAt(0);
        __DEV__ && console.log(firstCharacter);
        let isNameSearch = (/[a-zA-Z]/).test(firstCharacter)

        let isMobileSearch = false
        let isPabxSearch = false
        let isBloodSearch = false

        if (firstCharacter === '3')
            isPabxSearch = true
        if (firstCharacter === '+')
            isBloodSearch = true
        else
            isMobileSearch = true

        if (text) {
            const newData = DATA.filter((item) => {

                let itemData


                itemData = item.blood ? item.designation.toLocaleLowerCase() : ''
                if (!(isMobileSearch || isPabxSearch || isNameSearch || isBloodSearch))
                    itemData = ''
                const textData = text.toLocaleLowerCase();


                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
            setSearchDesig(text)
        }
        else {
            setFilteredData(DATA)
            setSearchDesig(text)
            setdistName('')
            setDistrictValue()
        }

    }





    const groupHanlder = () => {
        setGroupMenu(!groupMenu)
        __DEV__ && console.log('groupHanlder');
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
        // !netInfo.isConnected ? <NoInternetScreen /> :

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
                            <View style={{}} >
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
                                    placeholder="Search Name"
                                    value={search}
                                    //underlineColorAndroid='trasparent'
                                    onChangeText={(text) => { searchFilter(text) }}
                                    mode='outlined'
                                />
                            </View>
                            {search ?
                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: 5


                                    }}
                                    onPress={() => (
                                        searchFilter("")
                                        , setCurrentDistValue(""),
                                        setdistName(""),
                                        setCurrentChargeValue(""),
                                        setcurrentAge("")

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
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{}} >
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
                                    placeholder="Search Designation"
                                    value={searchDesig}
                                    //underlineColorAndroid='trasparent'
                                    onChangeText={(text) => { searchFilterDesignation(text) }}
                                    mode='outlined'
                                />
                            </View>
                            {searchDesig ?
                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: 5


                                    }}
                                    onPress={() => (
                                        searchFilter("")
                                        , setCurrentDistValue(""),
                                        setdistName(""),
                                        setCurrentChargeValue(""),
                                        setSearchDesig(""),
                                        setcurrentAge("")

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
                        </View>
                        <View>

                        </View>
                    </View>


                    {
                        canCallBulk === 'true' && adminLevel === 'superAdmin' &&
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
                    }
                </View>



                {refreshing ? <ActivityIndicator /> : null}
                {
                    // notDgOrAdg && adminLevel === 'superAdmin' && canAccessSeniority === 'true' &&

                }


                {


                    <View style={{

                        marginRight: 5, marginLeft: 6, marginBottom: 3, marginTop: 3,
                        flexDirection: 'row',
                        borderRadius: 10,
                        justifyContent: 'space-between',


                    }}>


                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 1.5, width: width * .50, marginRight: 10, marginBottom: 2 }}>
                                <DropDownPicker
                                    style={{ zIndex: 1000 }}
                                    items={tempDist}
                                    open={isOpen}
                                    setOpen={() => { setIsOpen(!isOpen), setIsAgeOpen(false) }}
                                    value={currentDistValue}
                                    setValue={setCurrentDistValue}
                                    maxHeight={450}
                                    placeholder="Select Office Location"
                                    onChangeValue={() => sortByDistrict()}
                                />
                            </View>

                            <View style={{ flex: 1, width: width * .50, marginRight: 10, marginBottom: 2 }}>
                                <DropDownPicker
                                    style={{ zIndex: 1000 }}
                                    items={ageMap}
                                    open={isAgeOpen}
                                    setOpen={() => { setIsAgeOpen(!isAgeOpen), setIsOpen(false) }}
                                    value={currentAge}
                                    setValue={setcurrentAge}
                                    maxHeight={450}
                                    placeholder="Age Range"
                                    onChangeValue={() => sortByAge()}
                                />
                            </View>

                        </View>




                    </View>
                }


                {
                    !search && DATA ?
                        <View style={{ flexDirection: 'row', alignContent: 'center' }} >
                            <Text style={{ marginLeft: width * .035, color: 'black', fontSize: height * .016, marginRight: height * .001, fontWeight: 'bold' }}>Total {isVacantActive ? "vacant post of" : ""} {designation} Blood Donor {isVacantActive ? "" : distName}: {isVacantActive ? totalVacantPost : filteredData.length} {currentAge ? ageValue : ''} </Text>
                            <Text style={{ marginLeft: 1, color: 'grey', fontSize: height * .015, fontStyle: 'italic', justifyContent: 'center' }}>{canAccessSeniority != 'true' ? 'Alphabatically' : ''}</Text>
                        </View>
                        : ""
                }








                {
                    isCurrentActive &&
                    <FlashList
                        data={filteredData}
                        estimatedItemSize={200}
                        // keyExtractor={(item) => item.id}    // do not set key for flashlist , it creates problem rendering ovelap

                        renderItem={({ item, index }) => (
                            <ItemBlood
                                id={item.id}
                                name={item.name}
                                age={item.age}
                                ageYear={item.ageYear}
                                office={item.office}
                                email={item.email}
                                mobile={item.mobile}
                                blood={item.blood}
                                seniority={item.seniority}
                                retiredate={item.retiredate}
                                bwdbJoiningDt={item.bwdbJoiningDt}
                                pabx={item.pabx}
                                selected={item.selected}
                                photo={item.photo}
                                index={index}
                                designation={item.designation}
                                post={item.post}
                                higherPost={higherPostForCurrentDesig}
                                charge={item.charge}
                                isAdmin={isAdmin}
                                adminLevel={adminLevel}
                                canCallBulk={canCallBulk}
                                canAccessSeniority={canAccessSeniority}
                                notDgOrAdg={notDgOrAdg}
                                currentTheme={currentTheme}
                                length={filteredData.length}
                                reloadList={refreshData}
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

                                <Text style={{ textAlign: 'center', fontSize: txtSizeNormal, fontWeight: '500' }}>No.</Text>
                            </View>



                            <View style={{
                                flex: 8, backgroundColor: `${currentTheme}50`,
                                justifyContent: 'center', padding: 5

                            }}>

                                <Text style={{ textAlign: 'center', fontSize: txtSizeNormal, fontWeight: '500' }}>Office Name</Text>
                            </View>

                            <View style={{
                                flex: 2, backgroundColor: `${currentTheme}50`,

                                justifyContent: 'center', padding: 5

                            }}>

                                <Text style={{ textAlign: 'center', fontSize: txtSizeNormal, fontWeight: '500' }}>Vacant Post</Text>
                            </View>
                            <View style={{
                                flex: 2,
                                backgroundColor: `${currentTheme}50`,
                                justifyContent: 'center',
                                padding: 5,
                                borderTopRightRadius: height * .005,

                            }}>
                                <Text style={{ textAlign: 'center', fontSize: txtSizeNormal, fontWeight: '500' }}>Post Type</Text>
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
                                    postType={item.postType}

                                />

                            )}
                            ref={(ref) => {
                                listViewRef = ref;
                            }}

                        />
                    </>
                }


                {
                    isReportActive &&
                    <View style={{
                        margin: 10,
                        borderColor: 'black',
                        borderWidth: .5,
                        height: !isFilterOn ? height * .73 : height * .522,
                        // borderRadius: 5
                    }} >

                        <View style={{ margin: 5 }} >
                            <Text style={{ color: '#0080FF', textAlign: 'center', fontWeight: 'bold' }} >BANGLADESH WATER DEVELOPMENT BOARD</Text>
                            <Text style={{ color: '#008023', textAlign: 'center', fontWeight: 'bold' }} >Designation Occupency Report</Text>
                            <Text style={{ color: '#0080FF', textAlign: 'center', fontWeight: '500', fontSize: 12 }} >{designation}</Text>
                        </View>

                        <View style={{}} >
                            {
                                <View style={{ paddingLeft: width * .035 }} >
                                    <Text
                                        style={{
                                            marginLeft: width * .035,
                                            color: 'black',
                                            fontStyle: 'italic',
                                            fontSize: height * .014,
                                            marginRight: height * .02,
                                            fontWeight: '600'
                                        }}>
                                        Reguler = {chargeMap['R'] ? `${chargeMap['R']}` : ''}
                                    </Text>
                                </View>
                            }
                            {
                                chargeMap['C'] &&
                                <View style={{ paddingLeft: width * .035 }} >
                                    <Text
                                        style={{
                                            marginLeft: width * .035,
                                            color: 'black',
                                            fontStyle: 'italic',
                                            fontSize: height * .014,
                                            marginRight: height * .02,
                                            fontWeight: '600'
                                        }}>
                                        {chargeMap['C'] ? `${camelize(higherPost)}, CC             = ${chargeMap['C']}` : ''}
                                    </Text>
                                </View>
                            }

                            {
                                chargeMap['A'] &&
                                <View style={{ paddingLeft: width * .035 }} >
                                    <Text
                                        style={{
                                            marginLeft: width * .035,
                                            color: 'black',
                                            fontStyle: 'italic',
                                            fontSize: height * .014,
                                            marginRight: height * .02,
                                            fontWeight: '600'
                                        }}>
                                        {chargeMap['A'] ? `${higherPost}, Addl.         = ${chargeMap['A']}` : ''}
                                    </Text>
                                </View>
                            }
                            {
                                chargeMap['I'] &&
                                <View style={{ paddingLeft: width * .035 }} >
                                    <Text
                                        style={{
                                            marginLeft: width * .035,
                                            color: 'black',
                                            fontStyle: 'italic',
                                            fontSize: height * .014,
                                            marginRight: height * .02,
                                            fontWeight: '600'
                                        }}>
                                        {chargeMap['I'] ? `${higherPost}, Incharge   = ${chargeMap['I']}` : ''}
                                    </Text>
                                </View>
                            }
                            {
                                chargeMap['I'] &&
                                <View style={{ paddingLeft: width * .035 }} >
                                    <Text
                                        style={{
                                            marginLeft: width * .035,
                                            color: 'black',
                                            fontStyle: 'italic',
                                            fontSize: height * .014,
                                            marginRight: height * .02,
                                            fontWeight: '600'
                                        }}>
                                        {chargeMap['N'] ? `Without Post = ${chargeMap['N']}` : ''}
                                    </Text>
                                </View>
                            }
                        </View>


                        {
                            postKeys &&
                            <View style={{ marginTop: 10 }} >
                                {
                                    postKeys.map((key) =>

                                        <View key={key} style={{ paddingLeft: width * .035 }} >
                                            <Text
                                                style={{
                                                    marginLeft: width * .035,
                                                    color: 'black',
                                                    fontStyle: 'italic',
                                                    fontSize: height * .014,
                                                    marginRight: height * .02,
                                                    fontWeight: '600'
                                                }}>
                                                {key}: {postMap[key]}
                                            </Text>
                                        </View>
                                    )
                                }
                            </View>
                        }

                    </View>
                }


                {
                    isCurrentActive &&
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
                    !isKeyboardVisible && isCurrentActive && adminLevel === 'superAdmin' && canCallBulk === 'true' &&
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
                        <TouchableOpacity onPress={() => { setIsFloatingBtnExteded(!isFloatingBtnExteded), setGroupMenu(false), setIsFilterOn(false) }}>
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
                        zIndex: 1200,
                        elevation: 10

                    }}>

                    {
                        !isKeyboardVisible && groupMenu &&
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
                                callBackFn={setisCreateModalVisible}
                            />

                            <FloatingBtnComponent
                                currentTheme={currentTheme}
                                icon='addGroup'
                                txt="Add"
                                badgeCount={currentSelectedIds.length}
                                callBackFn={setisAddModalVisible}
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


                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isCreateModalVisible}
                    onRequestClose={() => toggleCreateModal(true)}
                >
                    <CreateGroupModalComponent number={'mobile'} toggleModal={toggleCreateModal} />
                </Modal>

                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isAddModalVisible}
                    onRequestClose={() => toggleAddModal(true)}
                >
                    <AddGroupModalComponent number={'mobile'} toggleModal={toggleAddModal} />
                </Modal>

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



export default DataRenderBlood