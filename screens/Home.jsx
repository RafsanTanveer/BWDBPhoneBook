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

  useEffect(() => {

    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );


      txn.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        ["Rafsan", 477, "userAddress"],
        (txn, results) => {
          console.log('Results', results.rowsAffected);

        }
      );


      txn.executeSql(
        'SELECT * FROM table_user',
        [],
        (txn, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
          {
            temp.push(results.rows.item(i));
            console.log(results.rows.item(i));
          }
          
          setFlatListItems(temp);
        }
      );

    });

  }, [])

  return (
    <>
      <BiodataScreen />
    </>

  )
}
export default Home