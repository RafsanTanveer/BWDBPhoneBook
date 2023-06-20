import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { List } from 'react-native-paper';
import api from '../api/api';
import OfficeList from '../data/OfficeList';
import ThemeContainer from '../component/ThemeContainer'
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext'
import { timeStamp } from '../utility/Time';
import { createDesignationTable } from '../database/CreateQueries'
import { insertDataIntoDesignationTable } from '../database/InsertQueries'
import db from '../database/database'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

//****************************************** icons ********************************************** */

let storage = {}


const bwdbLogo = '../assets/bwdLogo.png'
const rightArrow = '../assets/icons/right.png'
const engLogo = '../assets/icons8-architect-48.png'
const desig = '../assets/icons/designation.png'
const dg = '../assets/icons/dg.png'
const admin = '../assets/icons/admin.png'
const computer = '../assets/icons/computer.png'
const land = '../assets/icons/land.png'
const geology = '../assets/icons/geology.png'
const fa = '../assets/icons/accounts.png'
const civil = '../assets/icons/civil.png'
const economic = '../assets/icons/economic.png'
const me = '../assets/icons/me.png'
const water = '../assets/icons/water.png'
const office = '../assets/icons/office.png'
const medical = '../assets/icons/medical.png'
const settings = '../assets/icons/settings.png'


//*******************************************icons ********************************************** */


const ExpendableDrawer = () => {

    const navigation = useNavigation();
    const [expendedList, setexpendedList] = React.useState([])

    const { setcurrentTheme, themes, currentTheme } = useContext(ThemeContext);
    const { setDesignationContext } = useContext(AuthContext);

    //  ******************************  fetching data ***************************************

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [desigList, setdesigList] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [offices, setoffices] = useState()

    const [dgAdgDesig, setdgAdgDesig] = useState([])
    const [adminDesig, setadminDesig] = useState([])
    const [civilDesig, setcivilDesig] = useState([])
    const [computerDesig, setcomputerDesig] = useState([])
    const [economicDesig, seteconomicDesig] = useState([])
    const [financeDesig, setfinanceDesig] = useState([])
    const [landDesig, setlandDesig] = useState([])
    const [geologyDesig, setgeologyDesig] = useState([])
    const [waterDesig, setwaterDesig] = useState([])
    const [mechDesig, setmechDesig] = useState([])
    const [medicalDesig, setmedicalDesig] = useState([])





    const fetchData = async () => {
        setIsLoading(true);

        __DEV__ && console.log('in expendable fetch');

        try {
            __DEV__ && console.log('in expendable fetch  try...........');

            setRefreshing(false);



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

            const tableExists = tableNames.includes('designation');

            if (tableExists) {
                await new Promise((resolve, reject) => {
                    __DEV__ && console.log('desig table  exists [][][][][][][][][][][][][]');

                    db.transaction((tx) => {


                        tx.executeSql(
                            `SELECT * FROM designation`,
                            [],
                            (_, result) => {
                                const desig = result.rows._array
                                // console.log('desig table extist ____________________________________________________',desig);
                                setdesigList(desig);
                                setDesignationContext(desig)
                            },
                            (_, error) => {
                                __DEV__ && console.log(error);
                            }
                        );


                    }, null, resolve);

                });
            } else {

                __DEV__ && console.log('desig table not exists [][][][][][][][][][][][][]');

                const { data: response } = await api.get("desiglist");
                setdesigList(response.rows);
                setDesignationContext(response.rows)
                // console.log('desig table does not extist ____________________________________________________', response.rows);

                __DEV__ && console.log(response.rows.length);


                response.rows.forEach(async (it, index) => {


                    const desigUrl = it.desig === '001' ? "dg" : it.desig === '002' ? "adg" : "desig";
                    // const { data: response } = await api.get(desigUrl, { params: { desig: it.desig } });
                    // const data = response.rows;

                    fetchDataAndStore(desigUrl, it.tablename, it.desig);


                })



                await new Promise((resolve, reject) => {
                    db.transaction((tx) => {


                        tx.executeSql(
                            `CREATE TABLE IF NOT EXISTS designation (
                                cadre       TEXT,
                                paygrade    TEXT,
                                desig       TEXT,
                                designame   TEXT,
                                tablename   TEXT,
                                totalPostNBS TEXT
                                                 );`
                        );


                        response.rows.forEach((it) => {
                            tx.executeSql(
                                `INSERT INTO designation (
                                    cadre,
                                    paygrade,
                                    desig,
                                    designame,
                                    tablename,
                                    totalPostNBS)
               VALUES (  ?, ?, ?, ?,?,?);`,
                                [
                                    it.cadre,
                                    it.paygrade,
                                    it.desig,
                                    it.designame,
                                    it.tablename,
                                    it.totalPostNBS
                                ]
                            );
                        });


                    }, null, resolve);

                });


                // await new Promise((resolve, reject) => {
                //     db.transaction((tx) => {


                //         response.rows.forEach(async (it, index) => {


                //             const desigUrl = it.desig === '001' ? "dg" : it.desig === '002' ? "adg" : "desig";
                //             const { data: response } = await api.get(desigUrl, { params: { desig: it.desig } });
                //             const data = response.rows;
                //             console.log(index, ' it.desig, tablename ------------------', it.desig, it.tablename, ' length === ', data.length);

                //             const dataWithSelected = data.map(item => (
                //                 item = { ...item, selected: 'false' }

                //             ))

                //             // dataWithSelected.length && console.log('dataWithSelected  ((()))  ', dataWithSelected[0].name);

                //             storage[`${it.tablename}`] = dataWithSelected

                //             // console.log('storage.length llllllllllllllllllllllllllllll  ', storage[`${it.tablename}`].rows);

                //             // storage[`${it.tablename}`].forEach((it,index) => {
                //             //     console.log(it[index].name);
                //             // });


                //             tx.executeSql(
                //                 `CREATE TABLE IF NOT EXISTS ${it.tablename} (
                //                 id          TEXT,
                //                 name        TEXT,
                //                 designation TEXT,
                //                 post        TEXT,
                //                 charge      TEXT,
                //                 seniority   INTEGER,
                //                 office      TEXT,
                //                 officeAddress  TEXT,
                //                 officeDistrict  TEXT,
                //                 mobile      TEXT,
                //                 pabx        TEXT,
                //                 email       TEXT,
                //                 retiredate  TEXT,
                //                 bwdbJoiningDt TEXT,
                //                 photo       BLOB,
                //                 selected    TEXT,
                //                 timestamp   TEXT
                //                                  );`
                //             );


                //         });



                //     }, null, resolve);

                // });

                await new Promise((resolve, reject) => { console.log('storage  ----  ', storage.length) })


                // storage['DIRADMIN'].forEach((it,index) => {
                //                 console.log(it[index].name);
                //             });


                // await new Promise((resolve, reject) => {
                //     db.transaction((tx) => {
                //         response.rows.forEach(async (it, index) => {

                //             tx.executeSql(
                //                 `CREATE TABLE IF NOT EXISTS ${it.tablename} (
                //                 id          TEXT,
                //                 name        TEXT,
                //                 designation TEXT,
                //                 post        TEXT,
                //                 charge      TEXT,
                //                 seniority   INTEGER,
                //                 office      TEXT,
                //                 officeAddress  TEXT,
                //                 officeDistrict  TEXT,
                //                 mobile      TEXT,
                //                 pabx        TEXT,
                //                 email       TEXT,
                //                 retiredate  TEXT,
                //                 bwdbJoiningDt TEXT,
                //                 photo       BLOB,
                //                 selected    TEXT,
                //                 timestamp   TEXT
                //                                  );`
                //             );


                //         });



                //     }, null, resolve);

                // });










            }



        } catch (error) {
            __DEV__ && console.error(error.message);
        }


        setIsLoading(false);
    }



    const fetchDataAndStore = async (apiUrl, tableName, desig) => {
        try {


            const { data: response } = await api.get(apiUrl, { params: { desig: desig } });
            const data = response.rows;


            await createDesignationTable(tableName); // Create table if it doesn't exist
            await insertDataIntoDesignationTable(tableName, data); // Insert data into table

            console.log('url = ', apiUrl);
            console.log(`Data stored in  ${tableName} table.`);
        } catch (error) {
            console.error(`Error storing data in ${tableName} table:`, error);
        }
    };

    useEffect(() => {

        fetchData();

    }, []);

    useEffect(() => {

        setdgAdgDesig(desigList.filter((it) => (it.cadre === '00')))
        setcivilDesig(desigList.filter((it) => (it.cadre === '01')))
        setmechDesig(desigList.filter((it) => (it.cadre === '02')))
        setadminDesig(desigList.filter((it) => (it.cadre === '03')))
        setfinanceDesig(desigList.filter((it) => (it.cadre === '04')))
        setwaterDesig(desigList.filter((it) => (it.cadre === '05')))
        setlandDesig(desigList.filter((it) => (it.cadre === '06')))
        setgeologyDesig(desigList.filter((it) => (it.cadre === '07')))
        seteconomicDesig(desigList.filter((it) => (it.cadre === '08')))
        setcomputerDesig(desigList.filter((it) => (it.cadre === '09')))
        setmedicalDesig(desigList.filter((it) => (it.cadre === '10')))

    }, [desigList]);



    //  ******************************  fetching data ***************************************


    const handlePress = (no) => {
        const arr = []

        if (no == 0) {
            expendedList[0] ? arr[0] = false : arr[0] = true;
            for (let i = 1; i <= 21; i++) {

                arr[i] = false;
            }
        }
        else if (no == 12) {
            expendedList[12] ? arr[12] = false : arr[12] = true;
            for (let i = 0; i <= 21; i++) {
                if (i != 12)
                    arr[i] = false;
            }
        }
        else if (no == 19) {
            expendedList[19] ? arr[19] = false : arr[19] = true;
            for (let i = 0; i <= 21; i++) {
                if (i != 19)
                    arr[i] = false;
            }
        }
        else if (no > 0 && no <= 11) {
            arr[0] = true
            for (let i = 1; i <= 21; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else arr[i] = false;
            }
        }
        else if (no > 12 && no <= 18) {
            arr[12] = true
            for (let i = 0; i <= 21; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else if (i != 12) arr[i] = false;
            }
        }
        else if (no > 19 && no <= 21) {
            arr[19] = true
            for (let i = 0; i <= 21; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else if (i != 19) arr[i] = false;
            }
        }
        setexpendedList(arr);
    }



    return (
        <>


            <List.Section title="" style={styles.sectionStyle}>

                <List.Accordion
                    style={styles.sectionStyle}
                    title="Designations"
                    left={props => <List.Icon {...props} icon={() => (
                        <Image
                            source={require(desig)}
                            style={styles.iconStyle}
                        />
                    )} />}
                    expanded={expendedList[0]}
                    onPress={() => handlePress(0)}  >

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="DG & ADG"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(dg)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[1]}
                        onPress={() => handlePress(1)}  >
                        {
                            dgAdgDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }



                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Admin"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(admin)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[2]}
                        onPress={() => handlePress(2)} >

                        {
                            adminDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }

                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Civil"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(civil)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[3]}
                        onPress={() => handlePress(3)}
                    >

                        {
                            civilDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }


                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Computer"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(computer)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[4]}
                        onPress={() => handlePress(4)}
                    >


                        {
                            computerDesig.map((it) => (

                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />

                            ))
                        }


                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Economic"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(economic)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[5]}
                        onPress={() => handlePress(5)} >

                        {
                            economicDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }



                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="FA&A"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(fa)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[6]}
                        onPress={() => handlePress(6)}
                    >
                        {
                            financeDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }
                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Geology"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(geology)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[7]}
                        onPress={() => handlePress(7)}
                    >
                        {
                            geologyDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }

                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Land & Revenue"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(land)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[8]}
                        onPress={() => handlePress(8)}
                    >
                        {
                            landDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }
                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ME"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(me)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[9]}
                        onPress={() => handlePress(9)}
                    >

                        {
                            mechDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }

                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Water"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(water)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[10]}
                        onPress={() => handlePress(10)}
                    >

                        {
                            waterDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }

                    </List.Accordion>


                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Medical"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(medical)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[11]}
                        onPress={() => handlePress(11)}
                    >

                        {
                            medicalDesig.map((it) => (
                                <List.Item key={it.desig}
                                    onPress={() => {
                                        navigation.navigate('DesignationScreen', {
                                            designation: it.designame,
                                            desig_code: it.desig,
                                            title: 'Employee List',
                                            tablename: it.tablename
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={it.designame} />
                            ))
                        }



                    </List.Accordion>


                </List.Accordion>

                <List.Accordion
                    style={styles.accordingStyleOffice}
                    title="Office"
                    left={props => <List.Icon {...props} icon={() => (
                        <Image
                            source={require(office)}
                            style={styles.iconStyle}
                        />
                    )} />}
                    expanded={expendedList[12]}
                    onPress={() => handlePress(12)} >




                    <List.Accordion
                        style={styles.accordingStyle}
                        title="DIRECTOR GENERAL"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[13]}
                        onPress={() => handlePress(13)}  >

                        <OfficeList lcode='01' />

                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ADG(ADMIN)"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[14]}
                        onPress={() => handlePress(14)}  >

                        <OfficeList lcode='02' />


                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ADG(FIANANCE)"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[15]}
                        onPress={() => handlePress(15)}  >

                        <OfficeList lcode='03' />

                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ADG(PLANNING)"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[16]}
                        onPress={() => handlePress(16)}  >

                        <OfficeList lcode='04' />


                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ADG(EAST)"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[17]}
                        onPress={() => handlePress(17)}  >

                        <OfficeList lcode='05' />


                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ADG(WEST)"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[18]}
                        onPress={() => handlePress(18)}  >

                        <OfficeList lcode='06' />
                        {/* <ADGWEST  /> */}


                    </List.Accordion>



                </List.Accordion>


                <List.Accordion
                    style={styles.accordingStyleOffice}
                    title="Settings"
                    left={props => <List.Icon {...props} icon={() => (
                        <Image
                            source={require(settings)}
                            style={styles.iconStyle}
                        />
                    )} />}
                    expanded={expendedList[19]}
                    onPress={() => handlePress(19)} >




                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Theme"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[20]}
                        onPress={() => handlePress(20)}  >

                        {/* <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Addl. Director General" /> */}
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => setcurrentTheme(themes[9])} style={{ height: width * .080, width: width * .080, backgroundColor: '#0069C4', marginRight: width * .015 }} />
                            <TouchableOpacity onPress={() => setcurrentTheme(themes[3])} style={{ height: width * .080, width: width * .080, backgroundColor: '#048BB3', marginRight: width * .015 }} />
                            <TouchableOpacity onPress={() => setcurrentTheme(themes[6])} style={{ height: width * .080, width: width * .080, backgroundColor: '#0089E3', marginRight: width * .015 }} />
                            <TouchableOpacity onPress={() => setcurrentTheme(themes[0])} style={{ height: width * .080, width: width * .080, backgroundColor: '#6750a4', marginRight: width * .015 }} />


                        </View>

                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Update Organogram"
                        left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />}
                        expanded={expendedList[21]}
                        onPress={() => handlePress(21)}  >

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{

                                    height: width * .1,
                                    width: width * .35,
                                    backgroundColor: `${currentTheme}`,
                                    marginRight: 6
                                }}
                                onPress={() => { }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                        paddingLeft: width * .015,
                                        paddingTop: width * .015,
                                    }}>Update Organogram</Text>
                            </TouchableOpacity>

                        </View>




                    </List.Accordion>




                </List.Accordion>




            </List.Section>
        </>
    );
};



const styles = StyleSheet.create({
    sectionStyle: {
        marginVertical: -5,
        backgroundColor: "white"
    },
    accordingStyle: {
        marginVertical: -6,
        marginHorizontal: 10,
        backgroundColor: "white"
    },
    accordingStyleOffice: {
        marginVertical: 0,
        backgroundColor: "white"
    },
    listItem: {
        marginLeft: 17,
        marginTop: -10
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

})

export default ExpendableDrawer;