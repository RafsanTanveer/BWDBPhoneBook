import React, { useState, useEffect } from "react";
import api from "../../api/api";
import DataRender from "../../data/DataRender";

const PROG = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data: response } = await api.get("prog");
                setData(response.rows);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <DataRender DATA={data} designation='Programmer' />

    )
}
export default PROG