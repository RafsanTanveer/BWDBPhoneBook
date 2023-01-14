import React, { useState, useEffect } from "react";
import api from "../api/api";
import DataRender from "../data/DataRender";
import { View, StyleSheet, ToastAndroid, Button, StatusBar, Text } from "react-native";
import * as SQLite from 'expo-sqlite'
import { DatabaseConnection } from "../data/DbConnection";
import BiodataScreen from "./BiodataScreen";

const db = DatabaseConnection.getConnection();

const Home = ({ navigation }) => {

  let [flatListItems, setFlatListItems] = useState([]);

  

  return (
    <>
      {/* <BiodataScreen /> */}
    </>

  )
}
export default Home