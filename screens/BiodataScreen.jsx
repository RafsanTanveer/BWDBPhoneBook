import React, { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import RowComponent from '../component/RowComponent';
import DoubleColumnComponent from '../component/DoubleColumnComponent';
import AddressComponent from '../component/AddressComponent';
import SingleColumnComponent from '../component/SingleColumnComponent';
import EducationComponent from '../component/EducationComponent';
import PromotionScreen from '../component/PromotionScreen';
import ExperienceScreen from '../component/ExperienceScreen';
import TrainingComponent from '../component/TrainingComponent';
import api from '../api/api';





const BiodataScreen = () => {
    const animation = useRef(null);



    //  ******************************  fetching data ***************************************

    const [personalData, setpersonalData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);



    const fetchPersonalData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("biodata", {
                params: {
                    id: '631231006'
                }
            });
            setpersonalData(response.rows);
            console.log("in persoanl data " + response.rows.name);
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

        <>
            {
                personalData.map((item) => (
                    <View style={{ flex: 1 }} key={item.id}>
                        <View style={{
                            flexDirection: 'row', borderBottomColor: '#0080FF',
                            borderBottomWidth: 1
                        }}>


                            <View style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5 }}>
                                <Image style={{ width: 60, height: 60 }} source={require('../assets/pani-unnoyon-board-logo-C7A6FE0B4E-seeklogo.com.png')} />
                            </View>
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: 15, marginBottom: 2 }} >BANGLADESH WATER DEVELOPMENT BOARD</Text>
                                <Text style={{ color: '#008023', fontWeight: '500', fontSize: 15, marginBottom: 2 }} >Human Resource Data Management (HRDM)</Text>
                                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: 15, }} >BIODATA</Text>

                            </View>
                        </View>
                        <ScrollView >
                            <View style={{ flex: 1, marginTop: 20, marginHorizontal: 10 }}>

                                <View style={{ marginTop: 7, flexDirection: 'row', marginBottom: 0 }}>
                                    <View style={{ flex: 1 }}>
                                        <RowComponent headingText='Employee ID' queryText={item.id} />
                                        <RowComponent headingText='Employee Name' queryText={item.name} />
                                        <RowComponent headingText="Father's Name" queryText={item.f_name} />
                                        <RowComponent headingText="Mother's Name" queryText={item.m_name} />
                                        <RowComponent headingText='Home District' queryText={item.homeDist} />
                                    </View>
                                    <View >
                                        <Image style={{ height: 100, width: 90 }} source={{ uri: "data:image/jpeg;base64," + item.photo }} />

                                    </View>
                                </View>
                                <SingleColumnComponent
                                    firstHeading="Religion"
                                    firstQueryResult={item.religion == "I" ? "ISLAM" :
                                        (item.religion == "H" ? "HINDU" :
                                            item.religion == "C" ? "CHRISTIAN" :
                                                item.religion == "B" ? "BUDDHIST" :
                                                    item.religion == "O" ? "OTHERS" :
                                                        item.religion == "N" ? "NONE" : ""
                                        )}
                                    delimiter=":"
                                />
                                <DoubleColumnComponent
                                    firstHeading="Date of Birth"
                                    firstQueryResult={item.bdate}
                                    secondHeading="Gender"
                                    secondQueryResult={item.gender == "M" ? 'Male' : 'Female'}
                                />
                                <DoubleColumnComponent
                                    firstHeading="Marital Status"
                                    firstQueryResult={item.gender == "U" ? 'Unmarried' : 'Married'}
                                    secondHeading="Employee Status"
                                    secondQueryResult="Promoted"
                                />

                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1.5 }}>
                                        <Text style={styles.textStyle}>Permanent Address</Text>
                                    </View>
                                    <View style={{ flex: 2.5 }}>
                                        <Text style={styles.textStyle}>:</Text>
                                    </View>
                                </View>

                                <AddressComponent
                                    firstHeading="Permanent Address"
                                    firstDelimiter=":"
                                    address=""
                                    delimiter=""
                                    addressQueryResult=""
                                />

                                <SingleColumnComponent
                                    firstHeading="Joined BWDB as"
                                    firstQueryResult={item.joinDesig}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Cadre"
                                    firstQueryResult={item.cadre}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Joined BWDB on"
                                    firstQueryResult={item.joinDate}
                                    delimiter=":"
                                />

                                <SingleColumnComponent
                                    firstHeading="Regularised on"
                                    firstQueryResult={item.regularDate}
                                    delimiter=":"
                                />


                                <SingleColumnComponent firstHeading="Present Post" firstQueryResult="Director (Admin)" delimiter=":" />

                                <SingleColumnComponent
                                    firstHeading="Office Name"
                                    firstQueryResult="Directorate Of Security And Intelligence (196000)"
                                    delimiter=":"
                                />

                                <SingleColumnComponent
                                    firstHeading="Office Address"
                                    firstQueryResult="Pani Bhaban, Level-Ground, 72 Green Road, Dhaka."
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Educational Qualification"
                                    firstQueryResult=""
                                    delimiter=":"
                                />

                                <EducationComponent  id={item.id} />
                                <SingleColumnComponent
                                    firstHeading="Appointment and Promotions"
                                    firstQueryResult=""
                                    delimiter=":"
                                />
                                <PromotionScreen id={item.id} />

                                <Text style={styles.textStyle}>Experience, Transfer and Posting : </Text>

                                <ExperienceScreen id={item.id} />

                                <SingleColumnComponent
                                    firstHeading="Training Received"
                                    firstQueryResult=""
                                    delimiter=":"
                                />

                                <TrainingComponent id={item.id} />




                            </View>
                        </ScrollView>
                    </View>
                ))
            }

            {/* <FlatList style={{height:2, width:2}}/> */}


        </>


    );
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
    queryTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2,
        marginLeft: 7

    }
});


export default BiodataScreen