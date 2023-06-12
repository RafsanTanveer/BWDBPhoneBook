import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState, useContext } from "react";
import { Dimensions, FlatList, Image, Linking, TextInput, RefreshControl, ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from "react-native";
// import { TextInput } from "react-native-paper";
import api from '../api/api';
import LoadingScreen from "../screens/LoadingScreen";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NoDataFoundScreen from '../screens/NoDataFoundScreen';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { FAB, Portal } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import ItemOffice from '../component/ItemOffice'
import FABComponent from '../component/FABComponent'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const person_photo_placeholder = '../assets/person_photo_placeholder.jpg'


const DataRenderOffice = ({ office_code, navigation }) => {

    const { presentOfficeCode } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
    const { isAdmin, designationContext } = useContext(AuthContext);



    const [masterData, setMasterData] = useState(DATA)
    const [filteredData, setFilteredData] = useState()
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true);


    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])

    // ToastAndroid.show('in datarenderoffice screen ' + office_code, ToastAndroid.SHORT);
    // __DEV__ && console.log('in office data render ' + presentOfficeCode)
    const fetchData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("office", {
                params: {
                    office: office_code
                }
            });
            setDATA(response.rows);
        } catch (error) {
            __DEV__ && console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();


    }, [office_code]);


    useEffect(() => {

        setFilteredData(DATA);  // for updating filterdata at first

    }, [DATA]);


    //  ******************************  fetching data ***************************************


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
            {/* <View style={{ elevation: 10,zIndex: 9, }}>
                <Text style={{color:'black'}} >{index + 1}</Text>
            </View> */}
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
                                    <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>{item.id}</Text>
                                </TouchableOpacity>
                                : null
                        }



                        <Text style={{ fontSize: height * .019, fontFamily: 'serif', fontWeight: 'bold' }} >{item.name}  </Text>
                    </View>
                    {
                        item.post ?
                            <View style={{ flex: 1, }}>
                                <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'black', fontWeight: '600' }}>Po: {item.post} {item.charge == 'C' ? ', cc' : item.charge == 'A' ? ', Addl.' : ''} </Text>
                            </View> : ''
                    }

                    <View style={{ flex: 1, }}>
                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'grey', fontWeight: '600' }}>De: {item.designation} </Text>
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
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.mobile}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                            <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                            <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.mobile} </Text>
                        </TouchableOpacity>
                    }
                    {
                        item.pabx &&
                        <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${item.pabx}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                            <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                            <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.pabx} </Text>
                        </TouchableOpacity>
                    }
                    {
                        item.mobile &&
                        <TouchableOpacity onPress={() => (Linking.openURL(`sms:${item.mobile}`))}
                            style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: `${currentTheme}`, borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingRight: 9, paddingLeft: 12 }}>
                            <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={height * .017} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>

    );



    return (
        isLoading ?
            <LoadingScreen /> :
            DATA.length == 0 ? <NoDataFoundScreen /> :
                <SafeAreaView style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>

                        <TextInput
                            selectionColor={'black'}       // for changing curcsor color
                            style={{
                                height: height / 20,
                                width: "98%",
                                borderRadius: 5,
                                marginBottom: 5,
                                borderColor: `${currentTheme}`,
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
                                marginTop: height * .015,
                                paddingRight: width * .025,


                            }}
                            onPress={() => searchFilter("")}
                        >
                            <Image
                                style={{
                                    height: height * .03,
                                    width: height * .03,
                                }}
                                source={require("../assets/close.png")}
                            />
                        </TouchableOpacity> : ""
                    }
                    {!search ? <Text style={{ marginBottom: 2, marginLeft: 12, color: 'black', fontSize: height * .01505, marginRight: height * .02, fontWeight: 'bold' }}>Total Employee : {DATA.length}</Text> : ""}

                    {refreshing ? <ActivityIndicator /> : null}

                    <FlashList
                        estimatedItemSize={200}

                        data={filteredData}

                        renderItem={({ item, index }) => (
                            <ItemOffice
                                id={item.id}
                                name={item.name}
                                designation={item.designation}
                                office={item.office}
                                email={item.email}
                                mobile={item.mobile}
                                pabx={item.pabx}
                                selected={item.selected}
                                photo={item.photo}
                                index={index}

                                post={item.post}

                                charge={item.charge}
                                isAdmin={isAdmin}
                                currentTheme={currentTheme}
                                length={filteredData.length}
                            />


                        )}

                        keyExtractor={(item) => item.id}
                        extraData={selectedId}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                        }

                    />

                    {/* <Portal.Host>
                        <FABComponent />
                    </Portal.Host> */}


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



export default DataRenderOffice