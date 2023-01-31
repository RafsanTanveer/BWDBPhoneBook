import { View, Text, TextInput, ScrollView, FlatList, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native'
import api from '../api/api';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';







const OfficeList = ({ lcode }) => {

    const navigation = useNavigation();



    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [filteredData, setFilteredData] = useState(DATA)
    const [search, setSearch] = useState('')

    const fetchData = async () => {
        setIsLoading(true);

        try {

            const { data: response } = await api.get("officelist", {
                params: {
                    levelcode: lcode
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
                const itemData = item.officeName ? item.officeName.toLocaleLowerCase() : ''
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


        <View style={{ borderBottomWidth: .5, borderBottomColor: 'gray' }}>
            <Text>{item.officeName}</Text>
        </View>

    )




    return (
        isLoading ?
            <LoadingScreen /> :
            <View style={{ marginLeft: 10 }} >
                <TextInput
                    style={{ borderRadius: 5, borderWidth: 1, width: '98%', height: 30, paddingLeft:10 }}
                    placeholder="Search Office"
                    value={search}
                    //underlineColorAndroid='trasparent'

                    textAlign={'left'}
                    onChangeText={(text) => searchFilter(text)}
                    mode='outlined'


                />

                <View style={{ marginTop: 5, flex: 1, marginBottom: 10 }}>
                    {


                        filteredData.map((item, index) => (
                            <TouchableOpacity key={item.officeId}
                                onPress={() => { navigation.navigate('OfficeScreen', { officeId: item.officeId, officeName: item.officeName, title: 'Employee List' }) }}
                            >
                                <View style={{
                                    width: '98%',
                                    flexDirection: 'row', paddingVertical: 5, marginBottom: 2, alignItems: 'center',
                                    backgroundColor: '#F1EFF8', borderRadius: 5
                                }}>
                                    <View style={{ flex: 1.5 }}>
                                        <Text style={{ textAlign: 'center' }}>{index + 1}.</Text>
                                    </View>
                                    <View style={{
                                        flex: 10, marginLeft: 3, borderBottomColor: 'gray',
                                        // borderBottomWidth: StyleSheet.hairlineWidth
                                    }}>
                                        <Text style={{ fontSize: 12 }}>{item.officeName}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        ))
                    }
                </View>

                {/* <ScrollView style={{ height: 300, }}> */}

                {/* <FlatList
                    data={DATA}
                    renderItem={Item}
                    keyExtractor={(item) => item.officeName}
                /> */}

                {/* </ScrollView> */}
            </View >
    )
}

export default OfficeList