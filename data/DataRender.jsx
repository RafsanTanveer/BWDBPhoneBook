import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext, useCallback } from "react";
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
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from 'react-hook-form';
import * as Contacts from 'expo-contacts'
import ItemComponent from '../component/ItemComponent'
import SearchableDropdown from 'react-native-searchable-dropdown';
import { Picker } from '@react-native-picker/picker';

import * as SQLite from 'expo-sqlite'

import db from '../database/database'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


let selectedPId = []

let tempDist = [{ level: 'ALL DISTRICT', vlaue: 0 }]
let tempValue = []
let tempLevel = []





const DataRender = ({ designation, url, desig_code, tablename }) => {


    const navigation = useNavigation();

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
    const { isAdmin } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);

    const [isChecked, setChecked] = useState();
    const [isrtDateChecked, setisrtDateChecked] = useState();

    const [modalVisible, setModalVisible] = useState(false);

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    const [distValue, setdistValue] = useState(0);
    const [distName, setdistName] = useState();

    const [distForDropDown, setDistForDropDown] = useState();

    const [districtValue, setDistrictValue] = useState(null);
    const [district, setDistrict] = useState([]);

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


                var sortedKeys = Object.keys(distMap).sort();

                tempDist = [...tempDist, { level: "All DISTRICT", vlaue: 0 }]

                sortedKeys.map(item =>
                    // console.log(item, ' - ', distMap[item])
                    tempDist = [...tempDist, { level: item + ' ' + distMap[item], vlaue: distMap[item] }],
                    // tempLevel = [...tempLevel, {item}],
                    //tempValue=[...tempValue,{item}]
                )

                tempDist = [...tempDist, { level: "PANI BHABAN", vlaue: 65 }]

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

                tempDist = [...tempDist, { level: "All DISTRICT", vlaue: 0 }]

                sortedKeys.map(item =>
                    // console.log(item, ' - ', distMap[item])
                    tempDist = [...tempDist, { level: item + ' ' + distMap[item], vlaue: distMap[item] }]
                )

                tempDist = [...tempDist, { level: "PANI BHABAN", vlaue: 65 }]

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
                                seniority   INTEGER,
                                office      TEXT,
                                officeAddress  TEXT,
                                officeDistrict  TEXT,
                                mobile      TEXT,
                                pabx        TEXT,
                                email       TEXT,
                                retiredate  TEXT,
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
                                      seniority,
                                      office,
                                      officeAddress,
                                      officeDistrict,
                                      mobile,
                                      pabx,
                                      email,
                                      retiredate,
                                      photo,
                                      selected)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`,
                                [
                                    it.id,
                                    it.name,
                                    it.designation,
                                    it.seniority,
                                    it.office,
                                    it.officeAddress,
                                    it.officeDistrict,
                                    it.mobile,
                                    it.pabx,
                                    it.email,
                                    it.retiredate,
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
            setdistName('')
            setDistrictValue()

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
                                seniority,
                                office,
                                officeAddress,
                                officeDistrict,
                                mobile,
                                pabx,
                                email,
                                retiredate,
                                photo,
                                selected)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);`,
                            [
                                it.id,
                                it.name,
                                it.designation,
                                it.seniority,
                                it.office,
                                it.officeAddress,
                                it.officeDistrict,
                                it.mobile,
                                it.pabx,
                                it.email,
                                it.retiredate,
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
        setChecked(false)
        setSearch()
        setdistName('')
        tempDist = []
        // controller.reset()
        // setDistrictValue() // for reseting dropdown picker
        // fetchDistrictFromDb()
        setItems(tempDist)

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

        !isChecked ? setChecked(true) : setChecked(false)



        !isChecked ? setFilteredData(filteredData.sort((a, b) => { return a.seniority - b.seniority })) :
            setFilteredData(filteredData.sort((a, b) => { return a.name > b.name }))


    }

    const retirementDateUpdate = () => {

        setChecked(false)
        !isrtDateChecked ? setisrtDateChecked(true) : setisrtDateChecked(false)
        // isrtDateChecked, setisrtDateChecked   .toString().trim().slice(0, 10)


        !isrtDateChecked ? setFilteredData(filteredData.sort((a, b) => { return new Date(a.retiredate.toString().trim().slice(0, 10)) - new Date(b.retiredate.toString().trim().slice(0, 10)) })) :
            setFilteredData(filteredData.sort((a, b) => { return a.name > b.name }))


    }


    const searchFilter = (text) => {

        if (text) {
            const newData = DATA.filter((item) => {
                const itemData = item.name ? item.name.toLocaleLowerCase() : ''
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



    const Item = ({ item, index }) => (

        <TouchableOpacity onPress={() => (
            onSelect(index)

        )}>

            <View style={
                item.selected === 'true' ?
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
                {
                    // items.map((it => (<Text>it</Text>)))
                    // __DEV__ && console.log("items length "+items.length)
                }

                <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                    <View style={{ borderRadius: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }} >{index + 1}</Text>
                    </View>

                    <TouchableOpacity >
                        {

                            item.photo ?
                                <Image style={styles.logo} source={{ uri: "data:image/jpeg;base64," + item.photo }} />
                                :
                                <Image style={styles.place_holder_logo} source={require('../assets/person_photo_placeholder.jpg')} ></Image>

                        }
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 2, paddingHorizontal: 9, paddingVertical: 6, borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1, }}>
                            {/* {__DEV__ && console.log('isAdmin : '+isAdmin)} */}
                            {
                                // presentOfficeCode === 30 ?
                                isAdmin ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Biodata', { id: item.id })
                                        }}>
                                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>PMIS ID   : {item.id}</Text>


                                        </TouchableOpacity>
                                        {/* <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isChecked}
                                            onValueChange={() => (console.log('sdf'))}
                                            color={isChecked ? `${currentTheme}` : undefined}
                                        /> */}
                                    </View>
                                    : null
                            }
                            {
                                notDgOrAdg ?
                                    <View style={{ justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>Seniority : {item.seniority}</Text>
                                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.retiredate.toString().trim().slice(0, 10)}</Text>
                                        {/* <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.officeAddress}</Text> */}

                                    </View>
                                    : ""
                            }
                            <Text style={{ fontSize: height * .019, fontFamily: 'serif', fontWeight: 'bold' }} >{item.name} </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'black', fontWeight: '600' }}>{designation} </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'grey', }}>{item.office} </Text>
                        </View>

                    </View>

                    {
                        item.email &&
                        <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${item.email}`) }}  >
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#5f9ea0', }}>{item.email} </Text>
                        </TouchableOpacity>
                    }

                    <View style={{ flexDirection: "row-reverse", marginTop: 3 }}>

                        {
                            item.mobile &&
                            <TouchableOpacity
                                onLongPress={() => (
                                    <>

                                        < ModalViewForEditNumber viewModal={true} name={item.mobile} />
                                    </>
                                )} onPress={() => { Linking.openURL(`tel:${item.mobile}`) }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 5
                                }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.mobile} </Text>
                            </TouchableOpacity>
                        }
                        {
                            item.pabx &&
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${item.pabx}`) }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 10
                                }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.pabx} </Text>
                            </TouchableOpacity>
                        }
                        {
                            item.mobile &&
                            <TouchableOpacity onPress={() => (Linking.openURL(`sms:${item.mobile}`))}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 12
                                }}>
                                <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={height * .017} color="white" />
                            </TouchableOpacity>
                        }
                        {
                            // item.mobile &&
                            // <TouchableOpacity onLongPress={() => __DEV__ && console.warn('STARTED LONG PRESS')}

                            //         onPress={async () => {
                            //             const contact = {
                            //                 [Contacts.Fields.FirstName]: "Test",
                            //                 [Contacts.Fields.LastName]: "McTest",
                            //                 [Contacts.Fields.PhoneNumbers]: [
                            //                     {
                            //                         number: "(123) 456-7890",
                            //                         isPrimary: true,
                            //                         digits: "1234567890",
                            //                         countryCode: "PA",
                            //                         id: "1",
                            //                         label: "mobile",
                            //                     },
                            //                 ],
                            //                 [Contacts.Fields.Emails]: [
                            //                     {
                            //                         email: "test@gmail.com",
                            //                         isPrimary: true,
                            //                         id: "2",
                            //                         label: "mobile",
                            //                     },
                            //                 ],
                            //             };

                            //             await Contacts.addContactAsync(contact)
                            //                 .then((contactId) => {
                            //                     alert("Se creó exitosamente");
                            //                 })
                            //                 .catch((err) => {
                            //                     alert(err);
                            //                     __DEV__ && console.log(err);
                            //                 });
                            //         }}

                            //     style={{
                            //         alignItems: 'center',
                            //         flexDirection: 'row',
                            //         backgroundColor: `${currentTheme}`,
                            //         borderRadius: height * .005,
                            //         marginHorizontal: 5,
                            //         paddingVertical: 1,
                            //         paddingHorizontal: 5
                            //     }}>
                            //     {/* <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" /> */}
                            //     <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>ADD</Text>
                            // </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );



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

                        <TextInput
                            selectionColor={'black'}       // for changing curcsor color
                            style={{
                                height: height / 20,
                                width: "98%",
                                borderRadius: 5,
                                marginBottom: 5,
                                borderColor: `${currentTheme}`,//'#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,
                                backgroundColor: 'white'

                            }}
                            placeholder="Search"
                            value={search}
                            //underlineColorAndroid='trasparent'
                            onChangeText={(text) => searchFilter(text)}
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
                                paddingRight: width * .025,


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
                        notDgOrAdg ?

                            <View style={{

                                marginRight: 5, marginLeft: 20, marginBottom: 10, marginTop: 10,
                                flexDirection: 'row',
                                borderRadius: 10,
                                justifyContent: 'space-between'

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
                                <View >
                                    <Picker
                                        style={{
                                            color: 'grey',
                                            borderWidth: 5,
                                            width: width * .5,
                                            height: height * .05
                                        }}

                                        selectedValue={district}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setDistrict(itemValue)

                                        }>


                                        {
                                            //tempDist = [...tempDist, { level: "PANI BHABAN", vlaue: 65 }]
                                            tempDist.map((item, index) => (

                                                <Picker.Item key={index + 1} label={item.level} value={index} />
                                            ))

                                        }



                                    </Picker>
                                </View>

                            </View> : ""}


                    {
                        !search && DATA ?
                            <Text style={{ marginLeft: 12, color: 'black', fontSize: height * .01505, marginRight: height * .02, fontWeight: 'bold' }}>Total {designation} {distName}: {filteredData.length}</Text>
                            : ""
                    }


                    <FlatList

                        data={filteredData}
                        // renderItem={ItemComponent}
                        // renderItem={({ item, index }) => (
                        //     <ItemComponent
                        //         item={item}
                        //         index={index}
                        //         isAdmin={isAdmin}
                        //         notDgOrAdg={notDgOrAdg}
                        //         currentTheme={currentTheme}
                        //     />
                        // )}
                        renderItem={Item}
                        keyExtractor={(item) => item.id + Math.random()}
                        extraData={selectedId}
                        //  estimatedItemSize={8}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
                        }

                    // getItemLayout={(data, index) => (
                    //     { length: filteredData.length, offset: filteredData.length * index, index }
                    // )}

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

});



export default DataRender