import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import api from '../api/api';


const EducationComponent = ({ id }) => {


    //  ******************************  fetching data ***************************************


    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    const [edu, setEdu] = useState([])




    const fetchEduData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("edu", {
                params: {
                    id: id
                }
            });
            setEdu(response.rows);
            // console.log("in persoanl data " + response.rows.name);
        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchEduData();

    }, []);

    //  ******************************  fetching data ***************************************

    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 50, }}>
                        <Text style={styles.secondTextStyle}>Year</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, }}>
                        <Text style={styles.secondTextStyle}>Qualification</Text>
                    </View>
                    <View style={{ flex: 1, width: 120, }}>
                        <Text style={styles.secondTextStyle}>Decipline</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>Institution</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, alignItems: 'center' }}>
                        <Text style={styles.secondTextStyle}>Class/GPA</Text>
                    </View>
                    <View style={{ flex: 1, width: 80 }}>
                        <Text style={styles.secondTextStyle}>Remarks</Text>
                    </View>
                </View >

                {
                    edu.map((item, index) => (
                        < View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: .75, width: 50, }}>
                                <Text style={styles.queryTextStyle}>{item.passingYear}</Text>
                            </View>
                            <View style={{ flex: 1, width: 100, }}>
                                <Text style={styles.queryTextStyle}>{item.qualification}</Text>
                            </View>
                            <View style={{ flex: 1, width: 120, }}>
                                <Text style={styles.queryTextStyle}>{item.discipline}</Text>
                            </View>
                            <View style={{ flex: 1, width: 200, marginLeft: 10 }}>
                                <Text style={styles.queryTextStyle}>{item.institute}</Text>
                            </View>
                            <View style={{ flex: 1, width: 100, marginLeft: 5, alignItems:'center' }}>
                                <Text style={styles.queryTextStyle}>{item.marks ? item.marks.toString().trim().slice(0, 4) : item.result}</Text>
                            </View>
                            <View style={{ flex: 1, width: 80 }}>
                                <Text style={styles.queryTextStyle}>{item.remarks}</Text>
                            </View>
                        </View >
                    ))


                }
                
            </View>

        </ScrollView >


    )
}


const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
    headingTxt: {
        fontSize: 15,
        fontWeight: '500',
        color: '#00ced1',

    },
    textStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#0080FF',
        marginBottom: 2

    },
    secondTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8040BF',
        marginBottom: 2,
        textDecorationLine: "underline",

    },
    queryTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2,


    }
});

export default EducationComponent