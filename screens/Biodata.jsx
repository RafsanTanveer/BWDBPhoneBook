import React, { useRef, useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';
import RowComponent from '../component/RowComponent';
import DoubleColumnComponent from '../component/DoubleColumnComponent';
import AddressComponent from '../component/AddressComponent';
import SingleColumnComponent from '../component/SingleColumnComponent';
import EducationComponent from '../component/EducationComponent';
import PromotionScreen from '../component/PromotionScreen';
import ExperienceScreenGeneral from '../component/ExperienceScreenGeneral';
import TrainingComponent from '../component/TrainingComponent';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';





const Biodata = ({ id, navigation, route }) => {
    const animation = useRef(null);

    // const { generalPresentOffice, setgeneralPresentOffice, generalPresentPost, setgeneralPresentPost } = useContext(AuthContext);


    //  ******************************  fetching data ***************************************

    const [personalData, setpersonalData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    // console.log('in biodata -------- : ' + route.params.id)

    const fetchPersonalData = async () => {
        setIsLoading(true);
        setpersonalData([]);
        try {
            setRefreshing(false);
            const { data: response } = await api.get("biodata", {
                params: {
                    id: route.params.id
                }
            });
            setpersonalData(response.rows);


        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchPersonalData();

    }, [route.params.id]);

    //  ******************************  fetching data ***************************************




    return (

        <>

            {
                personalData.map((item) => (

                    <View style={{ flex: 1 }} key={item.id + Math.floor((Math.random() * 100) + 1)}>


                        <View style={{
                            flexDirection: 'row', borderBottomColor: '#0080FF',
                            borderBottomWidth: 1
                        }}>


                            <View style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5 }}>
                                <Image style={{ width: 60, height: 60 }} source={require('../assets/bwdLogo.png')} />
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
                                        {
                                            item.photo ?
                                                <Image style={{ height: 100, width: 90 }} source={{ uri: "data:image/jpeg;base64," + item.photo }} /> :
                                                <Image style={{ height: 100, width: 90, borderColor: 'purple', borderWidth: 1 }} source={require('../assets/person_photo_placeholder.jpg')} ></Image>
                                        }


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
                                <SingleColumnComponent
                                    firstHeading="Date of Birth"
                                    firstQueryResult={item.bdate}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Gender"
                                    firstQueryResult={item.gender == "M" ? 'Male' : 'Female'}
                                    delimiter=":"
                                />

                                <SingleColumnComponent
                                    firstHeading="Marital Status"
                                    firstQueryResult={item.gender == "U" ? 'Unmarried' : 'Married'}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Employee Status"
                                    firstQueryResult={item.regularDate == null ? "Probation" : "Regular"}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Permanent Address"
                                    firstQueryResult={item.homeAddress}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading=""
                                    firstQueryResult={"District : " + item.homeDist}
                                    delimiter=""
                                />
                                <SingleColumnComponent
                                    firstHeading=""
                                    firstQueryResult={"Upazila : "}
                                    delimiter=""
                                />
                                {
                                    item.village ?
                                        <SingleColumnComponent
                                            firstHeading=""
                                            firstQueryResult={"Village : " + item.village}
                                            delimiter=""
                                        />
                                        : ""
                                }


                                {

                                    item.postalCode ?
                                        <SingleColumnComponent
                                            firstHeading=""
                                            firstQueryResult={"Post Code : " + item.postalCode}
                                            delimiter=""
                                        />
                                        : ""

                                }
                                {/* <SingleColumnComponent
                                    firstHeading=""
                                    firstQueryResult=""
                                    delimiter=""
                                /> */}


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
                                <SingleColumnComponent
                                    firstHeading="PRL Date"
                                    firstQueryResult={item.retireDate}
                                    delimiter=":"
                                />

                                {/* {console.log("generalPresentPost  --- " + generalPresentPost)} */}
                                <SingleColumnComponent
                                    firstHeading="Present Post"
                                    firstQueryResult="" //{generalPresentPost}
                                    delimiter=":" />

                                <SingleColumnComponent
                                    firstHeading="Office Name"
                                    firstQueryResult=""//{generalPresentOffice}
                                    delimiter=":"
                                />

                                <SingleColumnComponent
                                    firstHeading="Office Address"
                                    firstQueryResult={item.officeAddress}
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Zone/Equivalent"
                                    firstQueryResult=""
                                    delimiter=":"
                                />
                                <SingleColumnComponent
                                    firstHeading="Circle/Directorate"
                                    firstQueryResult=""
                                    delimiter=":"
                                />


                                <SingleColumnComponent
                                    firstHeading=""
                                    firstQueryResult=""
                                    delimiter=""
                                />

                                <SingleColumnComponent
                                    firstHeading="Educational Qualification"
                                    firstQueryResult=""
                                    delimiter=":"
                                />

                                <EducationComponent id={item.id} />

                                <SingleColumnComponent
                                    firstHeading="Appointment and Promotions"
                                    firstQueryResult=""
                                    delimiter=":"
                                />
                                <PromotionScreen id={item.id} />

                                <Text style={styles.textStyle}>Experience, Transfer and Posting : </Text>

                                <ExperienceScreenGeneral id={item.id} />

                                <SingleColumnComponent
                                    firstHeading="Training Received"
                                    firstQueryResult=""
                                    delimiter=":"
                                />

                                <TrainingComponent id={item.id} />
                                
                                <SingleColumnComponent
                                    firstHeading=""
                                    firstQueryResult=""
                                    delimiter=""
                                />



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


export default Biodata