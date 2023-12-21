import { View, Text, TextInput, ScrollView, FlatList, ToastAndroid, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import api from '../api/api';
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import { ThemeContext } from '../context/ThemeContext'
import { FlashList } from "@shopify/flash-list";

import { txtSizeMini, txtSizeBig, txtSizeNormal } from '../utility/Scalling'
import {heightScreen, widthScreen} from '../utility/ScreenDimensions'
import ItemOfficeList from '../component/ItemOfficeList';

const rightArrow = '../assets/icons/right.png'



const OfficeList = ({ lcode }) => {

    const navigation = useNavigation();



    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [filteredData, setFilteredData] = useState(DATA)
    const [search, setSearch] = useState('')

    const { currentTheme } = useContext(ThemeContext);


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
            __DEV__ && console.error(error.message);
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
            <View style={{ marginLeft: 10, flex:1 }} >
               <View style={{  }} >
                 <TextInput
                     style={{ borderRadius: 5, borderWidth: 1, width: '98%', height: 35, paddingLeft: 10 }}
                     placeholder="Search Office"
                     value={search}
                     //underlineColorAndroid='trasparent'

                     textAlign={'left'}
                     onChangeText={(text) => searchFilter(text)}
                     mode='outlined'


                 />

               </View>


                <View style={{ flex: 1, width: '98%',height:'95%', flexDirection: 'row' }} >
                  <FlashList
                        estimatedItemSize={200}
                        estimatedListSize={{ height: heightScreen*30, width: widthScreen*.7, }}
                        data={filteredData}

                        renderItem={({ item,index }) =>
                            <TouchableOpacity key={item.officeId}
                                onPress={() => {
                                    navigation.navigate('OfficeScreen', {
                                        officeId: item.officeId,
                                        officeName: item.officeName,
                                        title: 'Employee List'
                                    })
                                }}
                            >
                                <View style={{
                                    width: '98%',
                                    flexDirection: 'row', paddingVertical: 5, marginBottom: 2, alignItems: 'center',
                                    backgroundColor: `${currentTheme}10`, borderRadius: 5
                                }}>
                                    <View style={{ flex: 1.5 }}>
                                        <Text style={{ textAlign: 'center', fontWeight: '500' }}>{index + 1}.</Text>
                                    </View>
                                    <View style={{
                                        flex: 10, marginLeft: 3, borderBottomColor: 'gray',
                                        // borderBottomWidth: StyleSheet.hairlineWidth
                                    }}>
                                        <View style={{ flexDirection: 'row', marginRight: 10, }} >
                                            {
                                                item.officeId === item.budgetoffice ?
                                                    <Text style={{ fontSize: txtSizeNormal, fontWeight: '700', color: item.isbudgetoffice === 'true' ? 'black' : 'black' , }}>{item.officeName}</Text>
                                                    :
                                                    <View style={{ flexDirection: 'row', flex: 1 }} >

                                                        <View style={{}} >
                                                            <Text style={{ textAlign: 'center', fontSize: txtSizeNormal * .8, color: 'blue' }} >   ➥ </Text>
                                                        </View>
                                                        <View style={{}} >
                                                            <Text style={{ fontSize: txtSizeNormal * .9, flexWrap: 'wrap', flexShrink: 1 , fontWeight:'500'}}   >{item.officeName}</Text>
                                                        </View>
                                                    </View>
                                            }

                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                    }
                  />

              </View>


            </View >
    )
}

export default OfficeList