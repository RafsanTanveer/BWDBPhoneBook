import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from "react";
import { Dimensions, FlatList, Image, Linking, TextInput, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
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

import * as SQLite from 'expo-sqlite'



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
}


function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => { },
                };
            },
        };
    }

    const db = SQLite.openDatabase("db.db");
    return db;
}

const db = openDatabase();





const DataRender = ({ designation, url, desig_code, tablename }) => {


    //////////////////////////sqlite////////////////////////////////////

    const [text, setText] = useState(null);
    const [forceUpdate, forceUpdateId] = useForceUpdate();
    const [items, setItems] = useState(null);


    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(

                `CREATE TABLE ${tablename} (
                          id          TEXT,
                          name        TEXT,
                          designation TEXT,
                          seniority   TEXT,
                          office      TEXT,
                          mobile      TEXT,
                          pabx        TEXT,
                          email       TEXT,
                          photo       BLOB);`
            );
        });
    }

    const dropTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DROP TABLE IF EXISTS ${tablename}`
            );
        });
    }


   

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
    const [ifTableExists, setifTableExists] = useState(0)

    const fetchData = async () => {
        setIsLoading(true);
        // console.log('desig_code: ' + desig_code);
        desig_code === '001' || desig_code === '002' ? setnotDgOrAdg(false) : setnotDgOrAdg(true)
        let desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig"
        let snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority"
        setseniorityText(snrTxt)


        // SELECT name FROM sqlite_master WHERE type = 'table' AND name = '{table_name}';
        
        db.transaction((tx) => {                       
            tx.executeSql(
                `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ${tablename};`,
                [],
                (_, { rows: { _array } }) => console.log(_array.length) //setifTableExists(_array)
            );
        });

        console.log(ifTableExists);

        try {
            setRefreshing(false);
            const { data: response } = await api.get(desigUrl, {
                params: {
                    desig: desig_code
                }
            });
            // setDATA(response.rows);
            // setMasterData(response.rows);





            response.rows.map((it) => (

                db.transaction(
                    (tx) => {
                        // tx.executeSql(`DELETE FROM ${tablename}`, []);

                        dropTable();
                        createTable();
                        tx.executeSql(`insert into ${tablename} (id, name,designation,seniority,office,mobile,pabx,email,photo) values (?,?,?,?,?,?,?,?,?)`, [it.id, it.name, it.designation, it.seniority, it.office, it.mobile, it.pabx, it.email, it.photo]);

                    },
                    null,
                    forceUpdate
                )

            ))


            db.transaction((tx) => {
                // tx.executeSql(`select * from ${tablename}`, [], (_, { rows }) =>
                //     console.log(JSON.stringify(rows))
                // );
                setDATA([])
                tx.executeSql(
                    `select * from ${tablename};`,
                    [],
                    (_, { rows: { _array } }) => setDATA(_array)
                );
            });

            setChecked(false)


        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchData();

    }, []);

    //  ******************************  fetching data ***************************************

    useEffect(() => {

        setFilteredData(DATA);  // for updating filterdata at first 

    }, [DATA]);


    const seniorityUpdate = () => {


        !isChecked ? setChecked(true) : setChecked(false)



        !isChecked ? setFilteredData(DATA.sort((a, b) => { return a.seniority - b.seniority })) :
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
                {item.photo ?
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
                                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>Seniority : {item.seniority}</Text> : ""
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
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.mobile}`) }}
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
                            <View style={{ alignItems: 'flex-end', marginRight: 5, marginLeft: 20, marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => seniorityUpdate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox
                                        style={{ height: 18, width: 18 }}
                                        value={isChecked}

                                        color={isChecked ? '#6750a4' : undefined}
                                    />

                                    <Text style={{ marginLeft: 5, fontSize: 13 }}>According to seniority</Text>

                                </TouchableOpacity>

                            </View> : ""}


                    {
                        !search && DATA?
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
                            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                        }

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