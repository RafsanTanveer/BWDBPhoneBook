import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, Linking, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { TextInput } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import api from '../api/api';
import ItemOffice from '../component/ItemOffice';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoadingScreen from "../screens/LoadingScreen";
import NoDataFoundScreen from '../screens/NoDataFoundScreen';
import { Images } from '../utility/Images';
import FloatingBtnComponent from '../component/FloatingBtnComponent';



const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const person_photo_placeholder = '../assets/person_photo_placeholder.jpg'
let officeHead = ''
const selectAllInactive = '../assets/icons/select-all-inactive.png'


const DataRenderOffice = ({ office_code, navigation }) => {


    const { currentTheme, currentSelectedIds, setCurrentSelectedIds } = useContext(ThemeContext);
    const { isAdmin, designationContext, pmisId } = useContext(AuthContext);



    const [masterData, setMasterData] = useState(DATA)
    const [filteredData, setFilteredData] = useState()
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true);
    const [isFloatingBtnExteded, setIsFloatingBtnExteded] = useState(false);


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
            if (response.rows.length!=0) officeHead = response.rows[0].id
            console.log(officeHead, ' ', pmisId);
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
        isLoading ?
            <LoadingScreen /> :
              DATA.length == 0 ? <NoDataFoundScreen /> :
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>

                    <View style={{ flex: 10, }} >
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
                                marginHorizontal: 5,

                            }}
                            placeholder="Search"
                            value={search}
                            //underlineColorAndroid='trasparent'
                            onChangeText={(text) => searchFilter(text)}
                            mode='outlined'


                        />
                    </View>
                    {
                        officeHead === pmisId &&
                        true &&
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
                {
                    !search ?
                        DATA &&
                        <Text style={{ marginBottom: 2, marginLeft: 12, color: 'black', fontSize: height * .01505, marginRight: height * .02, fontWeight: 'bold' }}>Total Employee : {DATA.length}</Text>
                        : ""
                }


                {refreshing ? <ActivityIndicator /> : null}

                <FlashList
                    estimatedItemSize={200}

                    data={filteredData}

                    renderItem={({ item, index }) => (
                        <ItemOffice
                            id={item.id}
                            name={item.name}
                            designation={item.designation}
                            office={office_code}
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
                            reload={fetchData}
                            officeHead={officeHead}
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
                {
                    officeHead === pmisId &&
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
                        <TouchableOpacity onPress={() => { setIsFloatingBtnExteded(!isFloatingBtnExteded) }}>
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
    select_all_icon: {
        height: height * .055,
        width: height * .055,
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