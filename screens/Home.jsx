import React, { useState, useEffect } from "react";
import { View, FlatList, Box, Text } from "react-native";

import { DATA_AE } from '../data/DATA'
import DataRender from "../data/DataRender";
import TestDataRender from "../data/TestDataRender";
import axios from 'axios'


const renderItem = ({ item }) => {
  return (
    <Box px={5} py={2} rounded="md" bg="primary.300" my={2}>
      {item.title}
    </Box>
  );
};

const Home = ({ navigation }) => {

  const url = 'https://api.sampleapis.com/coffee/hot'
  const mockApi ='https://testapi-raf.free.mockoapp.net/AP'

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const dataFetch = () => {
    axios.get(mockApi).then(response => {
      const result = response.data
      setData(...data,...result)
       console.log(result);
      
    })
  }

  useEffect(() => {
    //dataFetch();
  }, []);


  // useEffect(() => {
  //   console.log(data.length);
  // }, [data]);

  useEffect(() => {
    axios.get(mockApi)
      .then((response) => {
        setData(response.data)
        //console.log(response.data);
      })
  }, []) 

  return (
    <DataRender DATA={data} />
    // <TestDataRender testData={data} />

  )
}
export default Home