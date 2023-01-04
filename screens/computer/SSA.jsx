import React, { useState, useEffect } from "react";
import api from "../../api/api";
import DataRender from "../../data/DataRender";

const SSA = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const { data: response } = await api.get("ssa");
                setData(response.rows);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <DataRender DATA={data} designation='Senior System Analyst' />

    )
}
export default SSA