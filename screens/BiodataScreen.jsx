import React, { useContext, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, RefreshControl, ActivityIndicator,Dimensions } from 'react-native';
import api from '../api/api';
import RowComponent from '../component/RowComponent';
import SingleColumnComponent from '../component/SingleColumnComponent';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen'
import LoadingScreen from '../screens/LoadingScreen'
import db from '../database/database'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const officeLevel = [
    "Board",
    "Region",
    "Zone/Equivalent",
    "Circle/Directorate",
    "Division",
    "Sub Division",
    "Section", "",
    "Project",
    "Others"

]

const BiodataScreen = ({ id, navigation }) => {
    const animation = useRef(null);

    const { setofficeAddres, setphoto, setpresentOfficeCode, setName, presentOffice, presentPost, setisAdmin, presentOfficeCode } = useContext(AuthContext);
    const { setpresentDesig, setpresentOffice, setpresentPost, setpresentCharge, pmisId, setPmisId, } = useContext(AuthContext);


    //  ******************************  fetching data ***************************************

    const [tabelCreationTime, setTabelCreationTime] = useState('');

    const [personalData, setpersonalData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    const [promotion, setpromotion] = useState([])
    const [edu, setEdu] = useState([])
    const [experience, setexperience] = useState([])
    const [training, settraining] = useState([])

    const padTo2Digits = (num) => {
        return num.toString().padStart(2, '0');
    }

    const timeStamp = () => {
        const months = ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        const date = new Date()
        const amOrpm = date.getHours() >= 12 ? 'PM' : 'AM'
        const dateStr = `${months[(date.getMonth())]} ${padTo2Digits(date.getDate())}, ${date.getFullYear()}, ${date.getHours() % 12}:${padTo2Digits(date.getMinutes())} ${amOrpm}`;
        // console.log(dateStr);
        return dateStr;
    }


    const updateBiodata = () => {
        __DEV__ && console.log('updateBiodata ++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
        setpersonalData([])
        setpromotion([])
        setEdu([])
        setexperience([])
        settraining([])
        deleteAllData([])
        fetchPersonalData()
        setTabelCreationTime(timeStamp())

    }
    const deleteAllData = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM biodata where id=${id};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );

            tx.executeSql(
                `DELETE FROM education where id=${id};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );

            tx.executeSql(
                `DELETE FROM training where id=${id};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );

            tx.executeSql(
                `DELETE FROM experience where id=${id};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );

            tx.executeSql(
                `DELETE FROM promotion where id=${id};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );







        });
    };


    const fetchDataAndInsertintoDatabase = async () => {
        //biodata
        const { data: personalresponse } = await api.get("biodata", { params: { id: id } });
        setpersonalData(personalresponse.rows);

        setPmisId(personalresponse.rows[0].id)
        setName(personalresponse.rows[0].name)

        setphoto(personalresponse.rows[0].photo)
        setofficeAddres(personalresponse.rows[0].officeAddress)
        setpresentOfficeCode(personalresponse.rows[0].offceCode)
        // response.rows[0].offceCode === 30 ?setisAdmin(true):setisAdmin(false)
        setisAdmin(true)
        // __DEV__ && console.log(response.rows[0].offceCode);


        //promotion
        const { data: promotionresponse } = await api.get("promotion", { params: { id: id } });
        setpromotion(promotionresponse.rows);




        //edu
        const { data: eduresponse } = await api.get("edu", { params: { id: id } });
        setEdu(eduresponse.rows);

        //exp
        const { data: expresponse } = await api.get("exp", { params: { id: id } });
        setexperience(expresponse.rows);

        setpresentOffice(expresponse.rows[0].office)
        setpresentDesig(expresponse.rows[0].desig)
        setpresentPost(expresponse.rows[0].post);
        setpresentCharge(expresponse.rows[0].charge)

        //training
        const { data: trainingresponse } = await api.get("training", { params: { id: id } });
        settraining(trainingresponse.rows);



        await new Promise((resolve, reject) => {
            db.transaction((tx) => {

                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS promotion (
                                id             TEXT,
                                desig          TEXT,
                                joinDate       TEXT,
                                postingDate    TEXT
                                                 );`
                );



                promotionresponse.rows.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO promotion (
                                    id,
                                    desig,
                                    joinDate,
                                    postingDate)
               VALUES (  ?, ?, ?, ?);`,
                        [
                            it.id,
                            it.desig,
                            it.joinDate,
                            it.postingDate
                        ]
                    );
                });


                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS experience (
                                id              TEXT,
                                office          TEXT,
                                post            TEXT,
                                charge          TEXT,
                                desig           TEXT,
                                joinDate        TEXT,
                                releaseDate     TEXT
                                                 );`
                );


                expresponse.rows.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO experience (
                                    id,
                                    office,
                                    post,
                                    charge,
                                    desig,
                                    joinDate,
                                    releaseDate)
               VALUES (  ?, ?, ?, ?, ?, ?, ?);`,
                        [
                            it.id,
                            it.office,
                            it.post,
                            it.charge,
                            it.desig,
                            it.joinDate,
                            it.releaseDate
                        ]
                    );
                });


                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS training (
                                id              TEXT,
                                title           TEXT,
                                subject         TEXT,
                                institute       TEXT,
                                country         TEXT,
                                year            TEXT,
                                startDate       TEXT,
                                days            TEXT
                                                 );`
                );

                trainingresponse.rows.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO training (
                                    id,
                                    title,
                                    subject,
                                    institute,
                                    country,
                                    year,
                                    startDate,
                                    days)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?);`,
                        [
                            id,
                            it.title,
                            it.subject,
                            it.institute,
                            it.country,
                            it.year,
                            it.startDate,
                            it.days
                        ]
                    );
                });

                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS education (
                              id                TEXT,
                              passingYear       TEXT,
                              qualification     TEXT,
                              discipline        TEXT,
                              institute         TEXT,
                              marks             TEXT,
                              result            TEXT,
                              scale             TEXT,
                              remarks           TEXT
                                                 );`
                );

                eduresponse.rows.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO education (
                                    id,
                                    passingYear,
                                    qualification,
                                    discipline,
                                    institute,
                                    marks,
                                    result,
                                    scale,
                                    remarks)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?,?);`,
                        [
                            it.id,
                            it.passingYear,
                            it.qualification,
                            it.discipline,
                            it.institute,
                            it.marks,
                            it.result,
                            it.scale,
                            it.remarks
                        ]
                    );
                });

                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS biodata (
                                id              TEXT,
                                name            TEXT,
                                namebn          TEXT,
                                f_name          TEXT,
                                m_name          TEXT,
                                bdate           TEXT,
                                mstatus         TEXT,
                                gender          TEXT,
                                religion        TEXT,
                                gpf             TEXT,
                                accountsid      TEXT,
                                retireDate      TEXT,
                                homeDist        TEXT,
                                homeAddress     TEXT,
                                postalCode      TEXT,
                                upazila         TEXT,
                                village         TEXT,
                                cadre           TEXT,
                                accfile         TEXT,
                                joinDesig       TEXT,
                                joinDate        TEXT,
                                regularDate     TEXT,
                                officeAddress   TEXT,
                                offceCode       TEXT,
                                officeLevel     TEXT,
                                officeLevel1    TEXT,
                                officeLevel2    TEXT,
                                timestamp       TEXT,
                                photo           BLOB
                                                 );`
                );


                personalresponse.rows.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO biodata (
                                   id,
                                   name,
                                   namebn,
                                   f_name,
                                   m_name,
                                   bdate,
                                   mstatus,
                                   gender,
                                   religion,
                                   gpf,
                                   accountsid,
                                   retireDate,
                                   homeDist,
                                   homeAddress,
                                   postalCode,
                                   upazila,
                                   village,
                                   cadre,
                                   accfile,
                                   joinDesig,
                                   joinDate,
                                   regularDate,
                                   officeAddress,
                                   offceCode,
                                   officeLevel,
                                   officeLevel1,
                                   officeLevel2,
                                   timestamp,
                                   photo)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?);`,
                        [
                            it.id,
                            it.name,
                            it.namebn,
                            it.f_name,
                            it.m_name,
                            it.bdate,
                            it.mstatus,
                            it.gender,
                            it.religion,
                            it.gpf,
                            it.accountsid,
                            it.retireDate,
                            it.homeDist,
                            it.homeAddress,
                            it.postalCode,
                            it.upazila,
                            it.village,
                            it.cadre,
                            it.accfile,
                            it.joinDesig,
                            it.joinDate,
                            it.regularDate,
                            it.officeAddress,
                            it.offceCode,
                            it.officeLevel,
                            it.officeLevel1,
                            it.officeLevel2,
                            timeStamp(),
                            it.photo
                        ]
                    );
                });





            }, null, resolve);
        });


    }


    const fetchPersonalData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);



            //////////////////////////////////

            /////// check if table exists or not

            const [tableExistsResult, dataResult] = await new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql("SELECT name FROM sqlite_master WHERE type='table';", [], (_, tableExistsResult) => {
                        resolve([tableExistsResult, null]);
                    });
                });
            });

            const tableNames = tableExistsResult.rows._array.map((table) => table.name);
            __DEV__ && console.log('Total table = ', tableNames.length);
            __DEV__ && console.log('Table names:', tableNames);

            const tableExists = tableNames.includes('biodata');


            if (tableExists) {
                __DEV__ && console.log('biodata', ' table exists............................................................................');

                /////// check if id exists or not

                const [idExistsResult, dataResult] = await new Promise((resolve, reject) => {
                    db.transaction((tx) => {
                        tx.executeSql("SELECT id FROM biodata;", [], (_, tableExistsResult) => {
                            resolve([tableExistsResult, null]);
                        });
                    });
                });

                const exsistingIDs = idExistsResult.rows._array.map((table) => table.id);
                __DEV__ && console.log('Total table = ', exsistingIDs.length);
                __DEV__ && console.log('exsistingIDs:**************', exsistingIDs);

                const isIdExist = exsistingIDs.includes(id);

                if (isIdExist) {
                    __DEV__ && console.log(id, 'exists');

                    await new Promise((resolve, reject) => {
                        var isIdExist = true;
                        db.transaction((tx) => {

                            tx.executeSql(
                                `SELECT * FROM training where id = ${id}`,
                                [],
                                (_, result) => {
                                    const tempTraining = result.rows._array
                                    settraining(tempTraining);
                                },
                                (_, error) => {
                                    __DEV__ && console.log(error);
                                }
                            );

                            tx.executeSql(
                                `SELECT * FROM biodata where id = ${id}`,
                                [],
                                (_, result) => {
                                    __DEV__ && console.log('biodata .................................');
                                    const tempBiodata = result.rows._array
                                    setpersonalData(tempBiodata);
                                    __DEV__ && console.log(tempBiodata[0].id);
                                    console.log(tempBiodata);
                                    setTabelCreationTime(tempBiodata[0].timestamp)

                                    setPmisId(tempBiodata[0].id)

                                    setName(tempBiodata[0].name)

                                    setphoto(tempBiodata[0].photo)
                                    setofficeAddres(tempBiodata[0].officeAddress)
                                    setpresentOfficeCode(tempBiodata[0].offceCode)
                                    //   tempBiodata.rows[0].offceCode === 30 ?setisAdmin(true):setisAdmin(false)
                                    setisAdmin(true)

                                },
                                (_, error) => {
                                    __DEV__ && console.log(error);
                                }
                            );

                            tx.executeSql(
                                `SELECT * FROM promotion where id = ${id}`,
                                [],
                                (_, result) => {
                                    const tempPromotion = result.rows._array
                                    setpromotion(tempPromotion);
                                },
                                (_, error) => {
                                    __DEV__ && console.log(error);
                                }
                            );

                            tx.executeSql(
                                `SELECT * FROM experience where id = ${id}`,
                                [],
                                (_, result) => {
                                    const tempExperience = result.rows._array
                                    setexperience(tempExperience);

                                    setpresentOffice(tempExperience[0].office)
                                    setpresentDesig(tempExperience[0].desig)
                                    setpresentPost(tempExperience[0].post);
                                    setpresentCharge(tempExperience[0].charge)


                                },
                                (_, error) => {
                                    __DEV__ && console.log(error);
                                }
                            );

                            tx.executeSql(
                                `SELECT * FROM education where id = ${id}`,
                                [],
                                (_, result) => {
                                    const tempEducation = result.rows._array
                                    setEdu(tempEducation);
                                },
                                (_, error) => {
                                    __DEV__ && console.log(error);
                                }
                            );

                        }, null, resolve);
                    });


                } else {
                    __DEV__ && console.log(id, 'does not exist');

                    //biodata
                    const { data: personalresponse } = await api.get("biodata", { params: { id: id } });
                    setpersonalData(personalresponse.rows);
                    setTabelCreationTime(timeStamp())
                    setPmisId(personalresponse.rows[0].id)

                    setName(personalresponse.rows[0].name)

                    setphoto(personalresponse.rows[0].photo)
                    setofficeAddres(personalresponse.rows[0].officeAddress)
                    setpresentOfficeCode(personalresponse.rows[0].offceCode)
                    // response.rows[0].offceCode === 30 ?setisAdmin(true):setisAdmin(false)
                    setisAdmin(true)
                    // __DEV__ && console.log(response.rows[0].offceCode);


                    //promotion
                    const { data: promotionresponse } = await api.get("promotion", { params: { id: id } });
                    setpromotion(promotionresponse.rows);




                    //edu
                    const { data: eduresponse } = await api.get("edu", { params: { id: id } });
                    setEdu(eduresponse.rows);

                    //exp
                    const { data: expresponse } = await api.get("exp", { params: { id: id } });
                    setexperience(expresponse.rows);

                    setpresentOffice(expresponse.rows[0].office)
                    setpresentDesig(expresponse.rows[0].desig)
                    setpresentPost(expresponse.rows[0].post);
                    setpresentCharge(expresponse.rows[0].charge)

                    //training
                    const { data: trainingresponse } = await api.get("training", { params: { id: id } });
                    settraining(trainingresponse.rows);

                    await new Promise((resolve, reject) => {


                        db.transaction((tx) => {

                            promotionresponse.rows.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO promotion (
                                    id,
                                    desig,
                                    joinDate,
                                    postingDate)
               VALUES (  ?, ?, ?, ?);`,
                                    [
                                        it.id,
                                        it.desig,
                                        it.joinDate,
                                        it.postingDate
                                    ]
                                );
                            });
                            expresponse.rows.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO experience (
                                    id,
                                    office,
                                    post,
                                    charge,
                                    desig,
                                    joinDate,
                                    releaseDate)
               VALUES (  ?, ?, ?, ?, ?, ?, ?);`,
                                    [
                                        it.id,
                                        it.office,
                                        it.post,
                                        it.charge,
                                        it.desig,
                                        it.joinDate,
                                        it.releaseDate
                                    ]
                                );
                            });
                            trainingresponse.rows.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO training (
                                    id,
                                    title,
                                    subject,
                                    institute,
                                    country,
                                    year,
                                    startDate,
                                    days)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?);`,
                                    [
                                        id,
                                        it.title,
                                        it.subject,
                                        it.institute,
                                        it.country,
                                        it.year,
                                        it.startDate,
                                        it.days
                                    ]
                                );
                            });
                            eduresponse.rows.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO education (
                                    id,
                                    passingYear,
                                    qualification,
                                    discipline,
                                    institute,
                                    marks,
                                    result,
                                    scale,
                                    remarks)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?,?);`,
                                    [
                                        it.id,
                                        it.passingYear,
                                        it.qualification,
                                        it.discipline,
                                        it.institute,
                                        it.marks,
                                        it.result,
                                        it.scale,
                                        it.remarks
                                    ]
                                );
                            });
                            personalresponse.rows.forEach((it) => {
                                tx.executeSql(
                                    `INSERT INTO biodata (
                                   id,
                                   name,
                                   namebn,
                                   f_name,
                                   m_name,
                                   bdate,
                                   mstatus,
                                   gender,
                                   religion,
                                   gpf,
                                   accountsid,
                                   retireDate,
                                   homeDist,
                                   homeAddress,
                                   postalCode,
                                   upazila,
                                   village,
                                   cadre,
                                   accfile,
                                   joinDesig,
                                   joinDate,
                                   regularDate,
                                   officeAddress,
                                   offceCode,
                                   timestamp,
                                   photo)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?);`,
                                    [
                                        it.id,
                                        it.name,
                                        it.namebn,
                                        it.f_name,
                                        it.m_name,
                                        it.bdate,
                                        it.mstatus,
                                        it.gender,
                                        it.religion,
                                        it.gpf,
                                        it.accountsid,
                                        it.retireDate,
                                        it.homeDist,
                                        it.homeAddress,
                                        it.postalCode,
                                        it.upazila,
                                        it.village,
                                        it.cadre,
                                        it.accfile,
                                        it.joinDesig,
                                        it.joinDate,
                                        it.regularDate,
                                        it.officeAddress,
                                        it.offceCode,
                                        timeStamp(),
                                        it.photo
                                    ]
                                );
                            });



                        }, null, resolve);
                    });



                }





            } else {
                __DEV__ && console.log('biodata', 'not table exists............................................................................');


                fetchDataAndInsertintoDatabase()


            }





        } catch (error) {
            __DEV__ && console.error(error.message);
        }



        setIsLoading(false);
    }




    useEffect(() => {
        // setIsLoading(true);

        fetchPersonalData();



    }, []);

    //  ******************************  fetching data ***************************************
    // __DEV__ && console.log('in biodata');



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
                            {refreshing ? <ActivityIndicator /> : null}

                            <ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={updateBiodata} />
                                }
                            >
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
                                        firstQueryResult={item.mstatus === "U" ? 'Unmarried' : 'Married'}
                                        delimiter=":"
                                    />
                                    <SingleColumnComponent
                                        firstHeading="Employee Status"
                                        firstQueryResult={item.regularDate === null ? "Probation" : "Regular"}
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
                                    {
                                        item.gpf ?
                                            <SingleColumnComponent
                                                firstHeading="GPF File No"
                                                firstQueryResult={item.gpf}
                                                delimiter=":"
                                            /> : ''
                                    }

                                    {
                                        item.accountsid ?
                                            <SingleColumnComponent
                                                firstHeading="Accounts File No "
                                                firstQueryResult={item.accountsid}
                                                delimiter=":"
                                            /> : ''
                                    }





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



                                    {item.officeLevel == 2 ?
                                        <>
                                            <SingleColumnComponent
                                                firstHeading={officeLevel[item.officeLevel - 1]}
                                                firstQueryResult={item.officeLevel1}
                                                delimiter=":"
                                            />

                                        </> : ''
                                    }

                                    {item.officeLevel >= 3 ?
                                        <>
                                            <SingleColumnComponent
                                                firstHeading={officeLevel[item.officeLevel - 1]}
                                                firstQueryResult={item.officeLevel1}
                                                delimiter=":"
                                            />
                                            <SingleColumnComponent
                                                firstHeading={officeLevel[item.officeLevel - 2]}
                                                firstQueryResult={item.officeLevel2}
                                                delimiter=":"
                                            />
                                        </> : ''
                                    }


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
                                    <Text style={{alignSelf:'center', fontStyle: 'italic', fontSize: height * .014, color: 'grey' }}>Last Update Taken : {tabelCreationTime}</Text>

                                </View>
                            </ScrollView >


                        </View >
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