import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';


const ExperienceScreenGeneral = ({ id }) => {


    //  ******************************  fetching data ***************************************

    const { generalPresentOffice, setgeneralPresentOffice, generalPresentPost, setgeneralPresentPost } = useContext(AuthContext);



    const [isLoading, setIsLoading] = useState(false);

    const [refreshing, setRefreshing] = useState(true);
    const [experience, setexperience] = useState([])




    const fetchPersonalData = async () => {
        setIsLoading(true);
        setexperience([])
        setgeneralPresentOffice('')
        setgeneralPresentPost('')
        try {
            setRefreshing(false);
            const { data: response } = await api.get("exp", {
                params: {
                    id: id
                }
            });
            setexperience(response.rows);

        } catch (error) {
            __DEV__ && console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchPersonalData();

    }, []);



    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 20, marginTop: 5 }}>
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.secondTextStyle}>Post Name</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>Office Name</Text>
                    </View>
                    <View style={{ flex: 1, width: 90, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>From</Text>
                    </View>
                    <View style={{ flex: 1, width: 90, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>To</Text>
                    </View>

                </View >

                {
                    experience.map((item, index) => (

                        < View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <View style={{ flex: .75, width: 200, }}>
                                <Text style={styles.queryTextStyle}>{item.post ? item.post : item.desig} {item.charge == 'C' ? ',CC' : item.charge == 'A' ? 'Addl.' : ''}</Text>
                            </View>
                            <View style={{ flex: 1, width: 200, marginLeft: 8 }}>
                                <Text style={styles.queryTextStyle}>{item.office}</Text>
                            </View>
                            <View style={{ flex: 1, width: 90, marginLeft: 8 }}>
                                <Text style={styles.queryTextStyle}>{item.joinDate}</Text>
                            </View>
                            <View style={{ flex: 1, width: 90, marginLeft: 8 }}>
                                <Text style={styles.queryTextStyle}>{item.releaseDate}</Text>
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

export default ExperienceScreenGeneral