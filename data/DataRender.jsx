import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from "react";
import { Dimensions, FlatList, Image, Linking, TextInput, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
// import { TextInput } from "react-native-paper";
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
// import second from '../assets/close.png'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



const DataRender = ({ designation, url, desig_code }) => {

    const navigation = useNavigation();


    const [masterData, setMasterData] = useState([])
    const [filteredData, setFilteredData] = useState(DATA)
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true);
    const [noInternetConnection, setnoInternetConnection] = useState()
    const [seniorityText, setseniorityText] = useState()

    const { presentOfficeCode } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);

    const [isChecked, setChecked] = useState();





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

    const fetchData = async () => {
        setIsLoading(true);
        let desigUrl = desig_code === '001' ? "dg" : desig_code === '992' ? "adg" : "desig"
        let snrTxt = desig_code === '001' ? "" : desig_code === '' ? "" : "* not according to seniority"
        setseniorityText(snrTxt)
        try {
            setRefreshing(false);
            const { data: response } = await api.get(desigUrl, {
                params: {
                    desig: desig_code
                }
            });
            setDATA(response.rows);
            setMasterData(response.rows);

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


    // useEffect(() => {

    //     seniorityUpdate();  // for updating filterdata at first 

    // }, [isChecked]);


    const seniorityUpdate = () => {

        console.log("----------------");

        console.log("Before : isChecked: " + isChecked);



        isChecked ? setChecked(false) : setChecked(true)

        console.log("After: isChecked: " + isChecked);

        isChecked ? setFilteredData(DATA.sort((a, b) => { return a.seniority - b.seniority })) :
            setFilteredData(DATA.sort((a, b) => { return a.name > b.name }))


    }





    const searchFilter = (text) => {
        //setMasterData(DATA)
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
                        {
                            presentOfficeCode === 30 ?
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Biodata', { id: item.id })
                                }}>
                                    <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>PMIS ID   : {item.id}</Text>
                                    <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>Seniority : {item.seniority}</Text>
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
                                     height: height*.03,
                                    width: height * .03,
                                }}
                                source={require("../assets/close.png")}
                            />
                        </TouchableOpacity> : ""
                    }
                    {refreshing ? <ActivityIndicator /> : null}
                    <View style={{ alignItems: 'flex-end', marginRight: 5, marginLeft: 20, marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => seniorityUpdate()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Checkbox
                                style={{ height: 18, width: 18 }}
                                value={isChecked}
                                
                                color={isChecked ? '#6750a4' : undefined}
                            />

                            <Text style={{ marginLeft: 5, fontSize: 13 }}>According to seniority</Text>

                        </TouchableOpacity>

                        {/* {
                            !isChecked ?
                                <Text style={{ color: 'black', fontSize: 12 }}>{seniorityText}</Text> : ""
                        } */}
                    </View>
                    <FlatList

                        data={filteredData}
                        renderItem={Item}
                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
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
    closeButton: {
        height: 20,
        width: 20,
    },
    closeButtonParent: {
        // justifyContent: 'flex-end',
        // alignItems: "center",
        // marginRight: 5,
        // zIndex: 100,
        // position: 'absolute'
    },

});



export default DataRender
