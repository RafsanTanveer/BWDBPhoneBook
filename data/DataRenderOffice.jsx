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


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const person_photo_placeholder = '../assets/person_photo_placeholder.jpg'


const DataRenderOffice = ({ office_code, navigation }) => {

    const { presentOfficeCode, adminLevel } = useContext(AuthContext);
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


  



    return (
        isLoading ?
            <LoadingScreen /> :
          //  DATA.length == 0 ? <NoDataFoundScreen /> :
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