import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import DataRender from "../data/DataRender";
import { View, StyleSheet, ToastAndroid, Button, StatusBar, Text } from "react-native";
import * as SQLite from 'expo-sqlite'
import { DatabaseConnection } from "../data/DbConnection";
import BiodataScreen from "./BiodataScreen";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from '../screens/LoadingScreen'

const db = DatabaseConnection.getConnection();
const Home = ({ navigation }) => {


  const { userInfo, splashLoading, name, isLogged } = useContext(AuthContext);


  return (
    <>

      {
        isLogged &&
        <BiodataScreen id={userInfo.rows[0].id} />
      }
    </>

  )
}
export default Home