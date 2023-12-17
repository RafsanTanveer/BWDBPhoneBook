import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext, useCallback } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { List } from 'react-native-paper';
import api from '../api/api';
import OfficeList from '../data/OfficeList';
import OfficeListSingle from '../data/OfficeListSingle'
import GroupList from '../data/GroupList'
import ThemeContainer from '../component/ThemeContainer'
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext'
import { timeStamp } from '../utility/Time';
import { createDesignationTable, createDesignationListTable, createVacantDesignationTable } from '../database/CreateQueries'
import { insertDataIntoDesignationTable, insertDataIntoDesignationListTable, insertDataIntoVacantTable } from '../database/InsertQueries'
import db from '../database/database'
import Images from '../utility/Images'
import { useFonts } from 'expo-font'
import { useNetInfo } from "@react-native-community/netinfo";





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
const groupIcon = '../assets/icons/groupIcon.png'
const requestIcon = '../assets/icons/request.png'
const aprIcon = '../assets/icons/apr.png'
const staffListIcon = '../assets/icons/staff-list.png'
const bloodsearch = '../assets/icons/bloodsearch.png'

//*******************************************icons ********************************************** */


const ExpendableDrawer = () => {

    // const [fontsLoaded] = useFonts({
    //     'imperial-normal': require('../assets/fonts/imperial-normal.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [fontsLoaded]);
    const netInfo = useNetInfo();
    const navigation = useNavigation();
    const [expendedList, setexpendedList] = React.useState([])

    const { setcurrentTheme, themeColors, currentTheme } = useContext(ThemeContext);
    const { setDesignationContext,
        postGrade,
        isAdmin,
        presentOffice,
        presentOfficeCode,
        officelevel1code,
        adminLevel, name, pmisId, isPreloaing, setisPreloaing } = useContext(AuthContext);

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
            // __DEV__ && console.log('Total table = ', tableNames.length);
            // __DEV__ && console.log('Table names:', tableNames);

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

                // setisPreloaing(true)


                const { data: response } = await api.get("desiglist");
                setdesigList(response.rows);
                setDesignationContext(response.rows)
                // __DEV__ && console.log(response);
                // pre download all data at installatin time
                if (response.rows != 0) {
                    response.rows.forEach(async (it, index) => {

                        const desigUrl = it.desig === '001' ? "dg" : it.desig === '002' ? "adg" : "desig";

                        fetchDataAndStore(desigUrl, it.tablename, it.desig);

                    })
                }

                // response.rows.forEach(async (it, index) => {


                //     fetchDataAndStoreVacantData(`VACANT${it.tablename}`, it.desig)

                // })


                //fetchDataAndStoreVacantData

                createDesignationListTable('designation')

                insertDataIntoDesignationListTable('designation', response.rows)


                // setisPreloaing(false)



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



            __DEV__ && console.log('url = ', apiUrl);
            __DEV__ && console.log(`Data stored in  ${tableName} table.`);
        } catch (error) {
            console.error(`Error storing data in ${tableName} table:`, error);
        }
    };


    const fetchDataAndStoreVacantData = async (tableName, desig) => {
        try {



            const { data: vacantResponse } = await api.get("vacantDesigList", { params: { desig: desig } });
            const vacantData = vacantResponse.rows;


            // console.log("/////////////////////////////vacantDesigList/////////////////////////////////////////////");

           
            // console.log("/////////////////////////////vacantDesigList/////////////////////////////////////////////");




            createVacantDesignationTable(tableName)
            insertDataIntoVacantTable(tableName, vacantData)


        } catch (error) {
            console.error(`Error storing data in ${tableName} table:`, error);
        }
    };






    useEffect(() => {

        fetchData();

    }, []);

    useEffect(() => {

        if (desigList) {
            setdgAdgDesig(desigList.filter((it) => (it.cadre === '00')))
            setcivilDesig(desigList.filter((it) => (it.cadre === '10' || it.cadre === '12')))
            setmechDesig(desigList.filter((it) => (it.cadre === '20')))
            setadminDesig(desigList.filter((it) => (it.cadre === '30')))
            setfinanceDesig(desigList.filter((it) => (it.cadre === '40')))
            setwaterDesig(desigList.filter((it) => (it.cadre === '50')))
            setlandDesig(desigList.filter((it) => (it.cadre === '60')))
            setgeologyDesig(desigList.filter((it) => (it.cadre === '70')))
            seteconomicDesig(desigList.filter((it) => (it.cadre === '80')))
            setcomputerDesig(desigList.filter((it) => (it.cadre === '90')))
            setmedicalDesig(desigList.filter((it) => (it.cadre === '39')))
        }

    }, [desigList]);



    //  ******************************  fetching data ***************************************


    let highestHandlePressNumber = 34
    let desigStart = 0;
    let settingsStart = 19
    let aprStart = 24
    let staffListStart = 25
    let bloodStart = 26

    const handlePress = (no) => {
        const arr = []

        if (no == 0) {
            expendedList[0] ? arr[0] = false : arr[0] = true;
            for (let i = 1; i <= highestHandlePressNumber; i++) {

                arr[i] = false;
            }
        }
        else if (no == 12) {
            expendedList[12] ? arr[12] = false : arr[12] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != 12)
                    arr[i] = false;
            }
        }
        else if (no == 19) {
            expendedList[19] ? arr[19] = false : arr[19] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != 19)
                    arr[i] = false;
            }
        }
        else if (no == 22) {
            expendedList[22] ? arr[22] = false : arr[22] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != 22)
                    arr[i] = false;
            }
        }
        else if (no == 23) {
            expendedList[23] ? arr[23] = false : arr[23] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != 23)
                    arr[i] = false;
            }
        }
        else if (no == aprStart) {
            expendedList[aprStart] ? arr[aprStart] = false : arr[aprStart] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != aprStart)
                    arr[i] = false;
            }
        }
        else if (no == staffListStart) {
            expendedList[staffListStart] ? arr[staffListStart] = false : arr[staffListStart] = true;
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i != staffListStart)
                    arr[i] = false;
            }
        }
        else if (no > 0 && no <= 11) {
            arr[0] = true
            for (let i = 1; i <= highestHandlePressNumber; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else arr[i] = false;
            }
        }
        else if (no > 12 && no <= 18) {
            arr[12] = true
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else if (i != 12) arr[i] = false;
            }
        }
        else if (no > 19 && no <= highestHandlePressNumber) {
            arr[19] = true
            for (let i = 0; i <= highestHandlePressNumber; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else if (i != 19) arr[i] = false;
            }
        }
        setexpendedList(arr);
    }



    return (
        <>


            <List.Section title="" style={styles.sectionStyle}>

                {/**************************************** Designation *************************************/}

                {
                    adminLevel !== 'viewer' &&
                    <>
                        <List.Accordion
                            style={styles.sectionStyle}
                            title="Designations"
                            titleStyle={styles.titlestyle}

                            left={props => <List.Icon {...props} icon={() => (
                                <Image
                                    source={require(desig)}
                                    style={styles.iconStyle}
                                />
                            )} />}
                            expanded={expendedList[0]}
                            onPress={() => handlePress(0)}  >


                            {
                                adminLevel === 'superAdmin' &&
                                <List.Accordion
                                    style={styles.accordingStyle}
                                    title="DG & ADG"
                                    titleStyle={styles.titlestyle}

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
                            }

                            <List.Accordion
                                style={styles.accordingStyle}
                                title="Admin"
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                                title="Water Management"
                                titleStyle={styles.titlestyle}

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
                                titleStyle={styles.titlestyle}

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
                    </>

                }

                {/**************************************** Designation *************************************/}

                {/**************************************** Office *************************************/}

                {
                    true && netInfo.isConnected ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Offices"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(office)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[12]}
                                onPress={() => handlePress(12)} >


                                {
                                    adminLevel !== 'viewer' ?
                                        <>

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
                                                titleStyle={styles.titlestyle}

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
                                                titleStyle={styles.titlestyle}

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

                                        </> :
                                        <>
                                            <List.Accordion
                                                style={styles.accordingStyle}
                                                title={presentOffice}
                                                titleStyle={styles.titlestyle}

                                                left={props => <List.Icon {...props} icon={() => (
                                                    <Image
                                                        source={require(rightArrow)}
                                                        style={styles.iconStyle}
                                                    />
                                                )} />}
                                                expanded={expendedList[18]}
                                                onPress={() => handlePress(18)}  >

                                                <OfficeListSingle lcode={officelevel1code} officeId={presentOfficeCode} />
                                                {/* <OfficeListSingle lcode={officelevel1code} officeId={presentOfficeCode}  /> */}
                                                {/* <ADGWEST presentOfficeCode, officelevel1code  /> */}


                                            </List.Accordion>

                                        </>
                                }

                            </List.Accordion>
                        </>
                        : ''
                }

                {/**************************************** Office *************************************/}

                {/**************************************** Group Email & SMS *************************************/}
                {
                    false ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Group Email & SMS"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(groupIcon)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[22]}
                                onPress={() => handlePress(22)} >



                                <GroupList />

                            </List.Accordion>
                        </>
                        : ''
                }
                {/**************************************** Group Email & SMS *************************************/}

                {/*******************************************  Change Request ******************************** */}
                {
                    false ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Change Request"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(requestIcon)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[23]}
                                onPress={() => handlePress(23)} >



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
                                            }}>Make Change Request</Text>
                                    </TouchableOpacity>

                                </View>

                            </List.Accordion>
                        </>
                        : ''
                }
                {/*******************************************  Change Request ******************************** */}

                {/*******************************************  APR ******************************** */}
                {
                    false ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="APR"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(aprIcon)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[aprStart]}
                                onPress={() => handlePress(aprStart)} >



                                {/* <View style={{ flexDirection: 'row' }}>
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
                                            }}>Make Change Request</Text>
                                    </TouchableOpacity>

                                </View> */}
                                <Text>Apr</Text>

                            </List.Accordion>
                        </>
                        : ''
                }
                {/*******************************************  APR ******************************** */}

                {/*******************************************  Staff List ******************************** */}
                {
                    false ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Staff List"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(staffListIcon)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[staffListStart]}
                                onPress={() => handlePress(staffListStart)} >

                                <List.Item key={'Individual'}

                                    onPress={() => {
                                        navigation.navigate('ReportScreen', {
                                            id: pmisId,
                                            name: name,
                                            recStatus: "C",
                                            officecode: presentOfficeCode,
                                            individualOrOffice: true
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="INDIAVIDUAL" />


                                <List.Item key={'office'}

                                    onPress={() => {
                                        navigation.navigate('ReportScreen', {
                                            id: pmisId,
                                            name: presentOffice,
                                            recStatus: "C",
                                            officecode: presentOfficeCode,
                                            individualOrOffice: false
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="OFFICE" />







                            </List.Accordion>
                        </>
                        : ''
                }
                {/*******************************************  Staff List ******************************** */}

                {/*******************************************  Blood Search ******************************** */}
                {
                    true ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Blood Search"
                                titleStyle={styles.titlestyle}

                                left={props => <List.Icon {...props} icon={() => (
                                    <Image
                                        source={require(bloodsearch)}
                                        style={styles.iconStyle}
                                    />
                                )} />}
                                expanded={expendedList[staffListStart]}
                                onPress={() => handlePress(staffListStart)} >

                                <List.Item key={'A+'}
                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'A+',
                                            desig_code: 'APOS',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}
                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title={'A+'} />

                                <List.Item key={'A-'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'A-',
                                            desig_code: 'ANEG',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, fontWeight:'600' }} title="A-" />

                                <List.Item key={'B+'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'B+',
                                            desig_code: 'BPOS',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="B+" />

                                <List.Item key={'B-'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'B-',
                                            desig_code: 'BNEG',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="B-" />

                                <List.Item key={'O+'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'O+',
                                            desig_code: 'OPOS',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="O+" />

                                <List.Item key={'O-'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'O-',
                                            desig_code: 'ONEG',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="O-" />

                                <List.Item key={'AB+'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'AB+',
                                            desig_code: 'ABPOS',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16, }} title="AB+" />

                                <List.Item key={'AB-'}

                                    onPress={() => {
                                        navigation.navigate('BloodScreen', {
                                            designation: 'AB-',
                                            desig_code: 'ABNEG',
                                            title: 'Employee List',
                                            tablename: 'BLOODTABLE'
                                        })
                                    }}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Text style={{ color: '#DC143C' }} >  ➥</Text>
                                    )} />} style={{ marginLeft: 20, marginTop: -16,  }} title="AB-" />










                            </List.Accordion>
                        </>
                        : ''
                }
                { }

                {/*******************************************  Settings ******************************** */}
                {
                    true ?
                        <>
                            <List.Accordion
                                style={styles.accordingStyleOffice}
                                title="Setting"
                                titleStyle={styles.titlestyle}
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
                                    titleStyle={styles.titlestyle}

                                    left={props => <List.Icon {...props} icon={() => (
                                        <Image
                                            source={require(rightArrow)}
                                            style={styles.iconStyle}
                                        />
                                    )} />}
                                    expanded={expendedList[20]}
                                    onPress={() => handlePress(20)}  >

                                    {/* <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Addl. Director General" /> */}
                                    <View style={{ flexDirection: 'row', height: height * .05, paddingTop: 3 }}>
                                        <TouchableOpacity onPress={() => setcurrentTheme(themeColors[0])} style={{ ...styles.themeStyle, backgroundColor: themeColors[0] }} />
                                        <TouchableOpacity onPress={() => setcurrentTheme(themeColors[3])} style={{ ...styles.themeStyle, backgroundColor: themeColors[3] }} />
                                        <TouchableOpacity onPress={() => setcurrentTheme(themeColors[6])} style={{ ...styles.themeStyle, backgroundColor: themeColors[6] }} />
                                        <TouchableOpacity onPress={() => setcurrentTheme(themeColors[9])} style={{ ...styles.themeStyle, backgroundColor: themeColors[9] }} />


                                    </View>

                                </List.Accordion>



                                <List.Accordion
                                    style={styles.accordingStyle}
                                    title="Update Organogram"
                                    titleStyle={styles.titlestyle}
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


                                                backgroundColor: `${currentTheme}`,
                                                marginRight: 6,
                                                borderRadius: height * .005,
                                                alignContent: 'center',
                                                justifyContent:'center'
                                            }}
                                            onPress={() => { }}
                                        >
                                            <Text
                                                style={{
                                                    padding:10,
                                                    color: 'white',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    fontSize: width*.036

                                                }}>Update Organogram</Text>
                                        </TouchableOpacity>

                                    </View>




                                </List.Accordion>




                            </List.Accordion>
                        </> : ''
                }
                {/*******************************************  Settings ******************************** */}



            </List.Section>
        </>
    );
};



const styles = StyleSheet.create({
    sectionStyle: {
        // marginVertical: 5,
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
    titlestyle: {
        // fontFamily: 'imperial-normal',
        fontWeight: 'normal'
    },
    themeStyle: {
        height: width * .080,
        width: width * .080,
        //backgroundColor: '#0069C4',
        marginRight: width * .015,
        borderRadius: width * .05
    }

})

export default ExpendableDrawer;
