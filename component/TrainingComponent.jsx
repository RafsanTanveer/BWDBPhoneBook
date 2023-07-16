import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import api from '../api/api';

const TrainingComponent = ({ id }) => {



    //  ******************************  fetching data ***************************************


    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);



    const [training, settraining] = useState([])




    const fetchTrainingData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("training", {
                params: {
                    id: id
                }
            });
            settraining(response.rows);

        } catch (error) {
            __DEV__ && console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchTrainingData();

    }, []);

    //  ******************************  fetching data ***************************************



    return (


        <ScrollView horizontal={true} style={{ flex: 1, }}>
            <View style={{ marginBottom: 10, marginTop: 5 }}>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.secondTextStyle}>Training Title</Text>
                    </View>
                    <View style={{ flex: 1, width: 150, }}>
                        <Text style={styles.secondTextStyle}>Training Subject</Text>
                    </View>
                    <View style={{ flex: 1, width: 150, }}>
                        <Text style={styles.secondTextStyle}>Institute and Place</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>Country</Text>
                    </View>
                    <View style={{ flex: 1, width: 50, }}>
                        <Text style={styles.secondTextStyle}>Year</Text>
                    </View>
                    <View style={{ flex: 1, width: 50 }}>
                        <Text style={styles.secondTextStyle}>Days</Text>
                    </View>
                </View >
                {
                    training.map((item, index) => (
                        < View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: .75, width: 200, }}>
                                <Text style={styles.queryTextStyle}>{item.title}</Text>
                            </View>
                            <View style={{ flex: 1, width: 150, }}>
                                <Text style={styles.queryTextStyle}>{item.subject}</Text>
                            </View>
                            <View style={{ flex: 1, width: 150, }}>
                                <Text style={styles.queryTextStyle}>{item.institute}</Text>
                            </View>
                            <View style={{ flex: 1, width: 100, marginLeft: 10 }}>
                                <Text style={styles.queryTextStyle}>{item.country}</Text>
                            </View>
                            <View style={{ flex: 1, width: 50, marginLeft: 5, }}>
                                <Text style={styles.queryTextStyle}>{item.year}</Text>
                            </View>
                            <View style={{ flex: 1, width: 50 }}>
                                <Text style={styles.queryTextStyle}>{item.days}</Text>
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

export default TrainingComponent