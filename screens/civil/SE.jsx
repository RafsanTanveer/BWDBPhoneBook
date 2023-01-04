import React, { useState, useEffect } from "react";
import api from "../../api/api";
import DataRender from "../../data/DataRender";
import LoadingScreen from "../LoadingScreen";

const SE = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: response } = await api.get("se_civil");
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
        <DataRender DATA={data} designation='Superintendent Engineer (Civil)' />

    )
}
export default SE