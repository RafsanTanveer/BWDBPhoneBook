import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from "react";
import { Modal, Dimensions, FlatList, Image, Linking, TextInput, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
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

import * as Contacts from 'expo-contacts'

import SearchableDropdown from 'react-native-searchable-dropdown';

import * as SQLite from 'expo-sqlite'

import db from '../database/database'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;





const up = 0
const sublength = 100
const ITEM_HEIGHT=200






const DataRender = ({ designation, url, desig_code, tablename }) => {

    // console.log(designation,  desig_code, tablename); 

    //////////////////////////sqlite////////////////////////////////////






    ////////////////////////////////sqlite//////////////////////////////////////////////////////////////////////


    const navigation = useNavigation();


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

    const [notDgOrAdg, setnotDgOrAdg] = useState(false)





    // ********************************  Internet Connection checked *************************************
    NetInfo.fetch().then(state => {
        // console.log('Connection type', state.type);
        // console.log('Is connected?', state.isConnected);
        setnoInternetConnection(state.isConnected)
    });
    // ********************************  Internet Connection checked *************************************


    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])


    const fetchDataFromDb = async () => {
        console.log('in fetchDataFromDb');
        setIsLoading(true);

        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true);
        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority";
        setseniorityText(snrTxt);

        try {
            setRefreshing(false);

            const [tableExistsResult, dataResult] = await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql("SELECT name FROM sqlite_master WHERE type='table';", [], (_, tableExistsResult) => {
                        resolve([tableExistsResult, null]);
                    });
                });
            });

            const tableNames = tableExistsResult.rows._array.map((table) => table.name);
            console.log('Total table = ', tableNames.length);
            console.log('Table names:', tableNames);

            const tableExists = tableNames.includes(tablename);
            if (tableExists) {
                console.log(tablename, ' table exists');

                const { rows } = await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql(`SELECT * FROM ${tablename};`, [], (_, result) => {
                            resolve(result);
                        });
                    });
                });

                const data = rows._array;
                setDATA(data);
                console.log(data.length);
            } else {
                console.log(tablename, ' table does not exist');

                const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
                const data = response.rows;
                setDATA(data);

                await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS ${tablename} (
                                id          TEXT,
                                name        TEXT,
                                designation TEXT,
                                seniority   TEXT,
                                office      TEXT,
                                mobile      TEXT,
                                pabx        TEXT,
                                email       TEXT,
                                retiredate  TEXT,
                                photo       BLOB
                                                 );`
                        );


                        if (tablename === 'SUBDIVENGCIV') {
                            for (let i = up; i <= sublength; i++) {
                                 if(i!==74)
                                tx.executeSql(
                                    `INSERT INTO ${tablename} (
                                        id, 
                                        name, 
                                        designation,
                                        seniority, 
                                        office, 
                                        mobile, 
                                        pabx, 
                                        email, 
                                        retiredate, 
                                        photo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                                    [
                                        data[i].id,
                                        data[i].name,
                                        data[i].designation,
                                        data[i].seniority,
                                        data[i].office,
                                        data[i].mobile,
                                        data[i].pabx,
                                        data[i].email,
                                        data[i].retiredate,
                                        data[i].photo
                                    ]
                                    );
                                 else
                                     tx.executeSql(
                                         `INSERT INTO ${tablename} (
                                            id, 
                                            name, 
                                            designation, 
                                            seniority, 
                                            office, 
                                            mobile, 
                                            pabx, 
                                            email, 
                                            retiredate, 
                                            photo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                                         [data[i].id,
                                         data[i].name,
                                         data[i].designation,
                                         data[i].seniority,
                                         data[i].office,
                                         data[i].mobile,
                                         data[i].pabx,
                                         data[i].email,
                                         data[i].retiredate,
                                         ""
                                         ]
                                     );
                            }

                        } else {
                            data.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO ${tablename} (id, name, designation, seniority, office, mobile, pabx, email, retiredate, photo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                                    [it.id, it.name, it.designation, it.seniority, it.office, it.mobile, it.pabx, it.email, it.retiredate, it.photo]
                                );
                            });
                        }



                    }, null, resolve);
                });



            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }




    const refreshData = async () => {

        try {
            setRefreshing(false);
            setIsLoading(true);

            setDATA([])

            deleteAllData();

            fetchDataAndInsert()

            setIsLoading(false);
            setChecked(false)
            setisrtDateChecked(false)

        } catch (error) {
            console.error(error.message);
        }
    }


    const deleteAllData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${tablename};`,
                [],
                (tx, result) => {
                    console.log('Data deleted');
                },
                (tx, error) => {
                    console.log('Error deleting data:', error);
                }
            );
        });
    };


    // Function to read data from API and insert into table
    const fetchDataAndInsert = async () => {
        console.log('in refresh');
        setIsLoading(true);

        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true);
        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority";
        setseniorityText(snrTxt);

        try {
            setRefreshing(false);




            const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
            const data = response.rows;
            setDATA(data);

            await new Promise((resolve, reject) => {
                db.transaction((tx) => {


                    data.forEach((it) => {
                        tx.executeSql(
                            `INSERT INTO ${tablename} (id, name, designation, seniority, office, mobile, pabx, email, retiredate, photo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                            [it.id, it.name, it.designation, it.seniority, it.office, it.mobile, it.pabx, it.email, it.retiredate, it.photo]
                        );
                    });
                }, null, resolve);
            });




        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }






    useEffect(() => {

        // fetchData();
        fetchDataFromDb();
        setisrtDateChecked(false)
        setChecked(false)


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
                    // console.log(contact);
                }
            }
        })();
    }, []);



    const seniorityUpdate = () => {

        setisrtDateChecked(false)

        !isChecked ? setChecked(true) : setChecked(false)



        !isChecked ? setFilteredData(DATA.sort((a, b) => { return a.seniority - b.seniority })) :
            setFilteredData(DATA.sort((a, b) => { return a.name > b.name }))


    }

    const retirementDateUpdate = () => {

        setChecked(false)
        !isrtDateChecked ? setisrtDateChecked(true) : setisrtDateChecked(false)
        // isrtDateChecked, setisrtDateChecked   .toString().trim().slice(0, 10)


        !isrtDateChecked ? setFilteredData(DATA.sort((a, b) => { return new Date(a.retiredate.toString().trim().slice(0, 10)) - new Date(b.retiredate.toString().trim().slice(0, 10)) })) :
            setFilteredData(DATA.sort((a, b) => { return a.name > b.name }))


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
        }

    }


    const Item = ({ item, index }) => (



        <View style={{
            flexDirection: 'row', paddingLeft: 10, paddingRight: 10,
        }}>
            {
                // items.map((it => (<Text>it</Text>)))
                // console.log("items length "+items.length)
            }

            <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                <View style={{ borderRadius: 10 }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }} >{index + 1}</Text>
                </View>
                {
                    item.photo ?
                        <Image style={styles.logo} source={{ uri: "data:image/jpeg;base64," + item.photo }} />
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
                        {/* {console.log('isAdmin : '+isAdmin)} */}
                        {
                            // presentOfficeCode === 30 ?
                            isAdmin ?
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Biodata', { id: item.id })
                                }}>
                                    <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>PMIS ID   : {item.id}</Text>
                                    {
                                        notDgOrAdg ?
                                            <View style={{ justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>Seniority : {item.seniority}</Text>
                                                <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.retiredate.toString().trim().slice(0, 10)}</Text>
                                            </View>
                                            : ""
                                    }
                                </TouchableOpacity>
                                : null
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
                        <TouchableOpacity onLongPress={() => console.warn('STARTED LONG PRESS')} onPress={() => { Linking.openURL(`tel:${item.mobile}`) }}
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
                        // <TouchableOpacity onLongPress={() => console.warn('STARTED LONG PRESS')}
                            
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
                        //                     console.log(err);
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

    );



    return (
        !noInternetConnection ? <NoInternetScreen /> :

            isLoading ?
                <LoadingScreen /> :
                //DATA.length == 0 ? <NoDataFoundScreen /> :
                <SafeAreaView style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>

                        <TextInput
                            selectionColor={'black'}       // for changing curcsor color 
                            style={{
                                height: height / 20,
                                width: "98%",
                                borderRadius: 5,
                                marginBottom: 5,
                                borderColor: '#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,

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
                            onPress={() => searchFilter("")}
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

                            }}>
                                <View style={{ flexDirection: 'column' }}>
                                    <TouchableOpacity onPress={() => seniorityUpdate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isChecked}

                                            color={isChecked ? '#6750a4' : undefined}
                                        />

                                        <Text style={{ marginLeft: 5, fontSize: 13 }}>According to seniority</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => retirementDateUpdate()}
                                        style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                                        <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isrtDateChecked}

                                            color={isrtDateChecked ? '#6750a4' : undefined}
                                        />

                                        <Text style={{ marginLeft: 5, fontSize: 13 }}>According to retirement date</Text>

                                    </TouchableOpacity>
                                </View>


                            </View> : ""}


                    {
                        !search && DATA ?
                            <Text style={{ marginLeft: 12, color: 'black', fontSize: height * .01505, marginRight: height * .02, fontWeight: 'bold' }}>Total {designation} : {DATA.length}</Text>
                            : ""
                    }


                    <FlatList

                        data={filteredData}
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


});



export default DataRender