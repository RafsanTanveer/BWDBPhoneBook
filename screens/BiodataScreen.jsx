import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import api from '../api/api';
import RowComponent from '../component/RowComponent';
import SingleColumnComponent from '../component/SingleColumnComponent';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen'
import LoadingScreen from '../screens/LoadingScreen'




const BiodataScreen = ({ id, navigation }) => {
    const animation = useRef(null);

    const { setofficeAddres, setphoto, setpresentOfficeCode, setName, presentOffice, presentPost, setisAdmin, presentOfficeCode } = useContext(AuthContext);
    const { setpresentDesig, setpresentOffice, setpresentPost, setpresentCharge } = useContext(AuthContext);


    //  ******************************  fetching data ***************************************

    const [personalData, setpersonalData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    const [promotion, setpromotion] = useState([])
    const [edu, setEdu] = useState([])
    const [experience, setexperience] = useState([])
    const [training, settraining] = useState([])



    const fetchPersonalData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("biodata", { params: { id: id } });
            setpersonalData(response.rows);


            setName(response.rows[0].name)

            setphoto(response.rows[0].photo)
            setofficeAddres(response.rows[0].officeAddress)
            setpresentOfficeCode(response.rows[0].offceCode)
            // response.rows[0].offceCode === 30 ?setisAdmin(true):setisAdmin(false)
            setisAdmin(true)
            // console.log(response.rows[0].offceCode);


            const { data: promotionresponse } = await api.get("promotion", { params: { id: id } });
            setpromotion(promotionresponse.rows);

            const { data: eduresponse } = await api.get("edu", { params: { id: id } });
            setEdu(eduresponse.rows);

            const { data: expresponse } = await api.get("exp", { params: { id: id } });
            setexperience(expresponse.rows);

            setpresentOffice(expresponse.rows[0].office)
            setpresentDesig(expresponse.rows[0].desig)
            setpresentPost(expresponse.rows[0].post);
            setpresentCharge(expresponse.rows[0].charge)

            const { data: trainingresponse } = await api.get("training", { params: { id: id } });
            settraining(trainingresponse.rows);



        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }


   

    useEffect(() => {
        // setIsLoading(true);

        fetchPersonalData();
      


    }, []);

    //  ******************************  fetching data ***************************************
    // console.log('in biodata');



    return (


        <>

            {
                isLoading ?
                    <LoadingScreen />
                    :
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
                                            <RowComponent headingText='Employee Name (Bangla)' queryText={item.namebn} />
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
                                    <SingleColumnComponent
                                        firstHeading=""
                                        firstQueryResult={"Village : " + item.village}
                                        delimiter=""
                                    />
                                    <SingleColumnComponent
                                        firstHeading=""
                                        firstQueryResult={"Post Code : " + item.postalCode}
                                        delimiter=""
                                    />

                                    <SingleColumnComponent
                                        firstHeading=""
                                        firstQueryResult=""
                                        delimiter=""
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

                                    <SingleColumnComponent
                                        firstHeading="PRL Date"
                                        firstQueryResult={item.retireDate}
                                        delimiter=":"
                                    />

                                    <SingleColumnComponent
                                        firstHeading="GPF File No"
                                        firstQueryResult={item.gpf}
                                        delimiter=":"
                                    />

                                    <SingleColumnComponent
                                        firstHeading="Accounts File No "
                                        firstQueryResult={item.accountsid}
                                        delimiter=":"
                                    />


                                    <SingleColumnComponent
                                        firstHeading="Present Post"
                                        firstQueryResult={presentPost}
                                        delimiter=":" />

                                    <SingleColumnComponent
                                        firstHeading="Office Name"
                                        firstQueryResult={presentOffice}
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

                                    {/* <EducationComponent id={item.id} /> */}

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
                                                        <View style={{ flex: 1, width: 100, marginLeft: 5, alignItems: 'center' }}>
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

                                    <SingleColumnComponent
                                        firstHeading="Appointment and Promotions"
                                        firstQueryResult=""
                                        delimiter=":"
                                    />
                                    {/* <PromotionScreen id={item.id} /> */}


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
                                                promotion.map((item, index) => (
                                                    < View key={index} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                        <View style={{ flex: 1.5, width: 40, }}>
                                                            <Text style={styles.queryTextStyle}></Text>
                                                        </View>
                                                        <View style={{ flex: 1.5, width: 150, }}>
                                                            <Text style={styles.queryTextStyle}>{item.desig}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, width: 100, }}>
                                                            <Text style={styles.queryTextStyle}>{item.postingDate}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, width: 120, marginRight: 10 }}>
                                                            <Text style={styles.queryTextStyle}>{item.joinDate}</Text>
                                                        </View>

                                                    </View >
                                                ))
                                            }

                                        </View>

                                    </ScrollView >


                                    <Text style={styles.textStyle}>Experience, Transfer and Posting : </Text>

                                    {/* <ExperienceScreen id={item.id} /> */}

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

                                    <SingleColumnComponent
                                        firstHeading="Training Received"
                                        firstQueryResult=""
                                        delimiter=":"
                                    />

                                    {/* <TrainingComponent id={item.id} /> */}

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
        marginLeft: 1

    },
    secondTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8040BF',
        marginBottom: 2,
        textDecorationLine: "underline",


    },
});


export default BiodataScreen