import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import api from '../api/api';

const PromotionScreen = ({id}) => {


    //  ******************************  fetching data ***************************************


    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    const [promotion, setpromotion] = useState([])




    const fetchPersonalData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("promotion", {
                params: {
                    id: id
                }
            });
            setpromotion(response.rows);
            // console.log("in persoanl data " + response.rows.name);
        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchPersonalData();

    }, []);

    //  ******************************  fetching data ***************************************


    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 20, marginTop: 5 }} >
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1.5, width: 40, }}>   
                        <Text style={styles.secondTextStyle}></Text>   
                    </View>
                    <View style={{ flex: 1.5, width: 150, }}>
                        <Text style={styles.secondTextStyle}>Rank</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, }}>
                        <Text style={styles.secondTextStyle}>Posting Date</Text>
                    </View>
                    <View style={{ flex: 1, width: 120, }}>
                        <Text style={styles.secondTextStyle}>Join Date</Text>
                    </View>
                   
                </View >

                {
                    promotion.map((item,index) => (
                        < View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: 1.5, width: 40, }}>
                                <Text style={styles.secondTextStyle}></Text>
                            </View>
                            <View style={{ flex: 1.5, width: 150, }}>
                                <Text style={styles.queryTextStyle}>{item.desig}</Text>
                            </View>
                            <View style={{ flex: 1, width: 100, }}>
                                <Text style={styles.queryTextStyle}>{item.postingDate}</Text>
                            </View>
                            <View style={{ flex: 1, width: 120, marginRight:10 }}>
                                <Text style={styles.queryTextStyle}>{item.joinDate}</Text>
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

export default PromotionScreen