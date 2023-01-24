import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Linking, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
import { TextInput } from "react-native-paper";
import api from '../api/api';
import LoadingScreen from "../screens/LoadingScreen";
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../screens/NoInternetScreen'
import NoDataFoundScreen from '../screens/NoDataFoundScreen';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



const DataRender = ({ designation, url, desig_code }) => {

    const [masterData, setMasterData] = useState(DATA)
    const [filteredData, setFilteredData] = useState(DATA)
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true);
    const [noInternetConnection, setnoInternetConnection] = useState()

    // ********************************  Internet Connection checked *************************************
    NetInfo.fetch().then(state => {
        console.log('Connection type', state.type);
        console.log('Is connected?', state.isConnected);
        setnoInternetConnection(state.isConnected)
    });
    // ********************************  Internet Connection checked *************************************


    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])

    const fetchData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("desig", {
                params: {
                    desig: desig_code
                }
            });
            setDATA(response.rows);
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
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.mobile}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                            <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                            <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.mobile} </Text>
                        </TouchableOpacity>
                    }
                    {
                        item.pabx &&
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${item.pabx}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                            <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                            <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.pabx} </Text>
                        </TouchableOpacity>
                    }
                    {
                        item.mobile &&
                        <TouchableOpacity onPress={() => (Linking.openURL(`sms:${item.mobile}`))}
                            style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingRight: 9, paddingLeft: 12 }}>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                        <TextInput style={{ height: height / 20, width: "98%", borderRadius: 10, marginBottom: 5 }}
                            placeholder="Search"
                            value={search}
                            //underlineColorAndroid='trasparent'
                            onChangeText={(text) => searchFilter(text)}
                            mode='outlined'


                        />
                    </View>
                    {refreshing ? <ActivityIndicator /> : null}
                    <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
                        <Text style={{ color: 'black', fontSize: 10 }}>* not according to seniority list</Text>
                    </View>
                    <FlatList

                        data={ filteredData}
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
    }
});



export default DataRender