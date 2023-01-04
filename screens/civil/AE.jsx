import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import api from "../../api/api";
import DataRender from "../../data/DataRender";
import LoadingScreen from "../LoadingScreen";
import PullDownScreen from '../PullDownScreen'


const AE = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: response } = await api.get("ae_civil");
                setData(response.rows);
            } catch (error) {
                console.error(error.message);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (

        isLoading ?
            <LoadingScreen /> :
            < DataRender DATA={data} designation='Assistant Engineer (Civil)' />
    )
}
export default AE