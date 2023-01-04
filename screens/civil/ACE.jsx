import React, { useState, useEffect } from "react";
import api from "../../api/api";
import LoadingScreen from "../LoadingScreen";
import DataRender from "../../data/DataRender";

const ACE = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data: response } = await api.get("ace_civil");
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
        <DataRender DATA={data} designation='Addl. Chief Engineer (Civil)' />

    )
}
export default ACE