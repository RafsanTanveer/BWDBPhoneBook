import React, { useState, useEffect } from "react";
import api from "../../api/api";
import DataRender from "../../data/DataRender";
import { View, StyleSheet, ToastAndroid, Button, StatusBar, Text } from "react-native";
import { DatabaseConnection } from "../../data/DbConnection";



const db = DatabaseConnection.getConnection();


const AP = ({ navigation }) => {

   

    const [data, setData] = useState([]);
    const [names, setNames] = useState([])

    

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data: response } = await api.get("ap");
                setData(response.rows);
            } catch (error) {
                console.error(error.message);
            }

            
        }
        fetchData();
    }, []);

    return (
        <>
            {names.map((nam, index) => {<Text>nam</Text>} )}
            <Text style={{ color: 'black' }} >sdfsf</Text>
            <DataRender DATA={data} designation='Assistant Programmer' />
        </>

    )
}
export default AP