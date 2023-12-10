import { View, Text, TextInput, ScrollView, FlatList, ToastAndroid, StyleSheet, TouchableOpacity, Image } from 'react-native'
import api from '../api/api';
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen';
import { ThemeContext } from '../context/ThemeContext'
import { txtSizeMini, txtSizeBig, txtSizeNormal } from '../utility/Scalling'


const ItemOfficeList = ({ officeData, index }) => {

    const navigation = useNavigation();

    const { currentTheme } = useContext(ThemeContext);
  return (
      <View style={{ marginTop: 5, flex: 1, marginBottom: 10 }}>
          {


              officeData.map((item, index) => (
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
                              <Text style={{ textAlign: 'center' }}>{index + 1}.</Text>
                          </View>
                          <View style={{
                              flex: 10, marginLeft: 3, borderBottomColor: 'gray',
                              // borderBottomWidth: StyleSheet.hairlineWidth
                          }}>
                              <View style={{ flexDirection: 'row', marginRight: 10, }} >
                                  {
                                      item.officeId === item.budgetoffice ?
                                          <Text style={{ fontSize: txtSizeNormal, fontWeight: '500', color: item.isbudgetoffice === 'true' ? 'black' : 'black' }}>{item.officeName}</Text>
                                          :
                                          <View style={{ flexDirection: 'row', flex: 1 }} >

                                              <View style={{}} >
                                                  <Text style={{ textAlign: 'center', fontSize: txtSizeNormal * .8, color: 'blue' }} >   ➥ </Text>
                                              </View>
                                              <View style={{}} >
                                                  <Text style={{ fontSize: txtSizeNormal * .9, flexWrap: 'wrap', flexShrink: 1 }}   >{item.officeName}</Text>
                                              </View>
                                          </View>
                                  }

                              </View>
                          </View>
                      </View>
                  </TouchableOpacity>

              ))
          }
      </View>
  )
}

export default ItemOfficeList