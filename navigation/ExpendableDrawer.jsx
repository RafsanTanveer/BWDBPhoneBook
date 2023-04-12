import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { List } from 'react-native-paper';
import api from '../api/api';
import OfficeList from '../data/OfficeList';


//****************************************** icons ********************************************** */


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

//*******************************************icons ********************************************** */


const ExpendableDrawer = () => {

    const navigation = useNavigation();
    const [expendedList, setexpendedList] = React.useState([])


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

        console.log('in expendable fetch');

        try {
            console.log('in expendable fetch  try...........');

            setRefreshing(false);
            const { data: response } = await api.get("desiglist");
            setdesigList(response.rows);
            console.log(response.rows.length);
            console.log('in expendable fetch  try end ...........');


        } catch (error) {
            console.error(error.message);
        }


        setIsLoading(false);
    }

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
            for (let i = 1; i <= 18; i++) {

                arr[i] = false;
            }
        }
        else if (no == 12) {
            expendedList[12] ? arr[12] = false : arr[12] = true;
            for (let i = 0; i <= 18; i++) {
                if (i != 12)
                    arr[i] = false;
            }
        }
        else if (no > 0 && no <= 11) {
            arr[0] = true
            for (let i = 1; i <= 18; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else arr[i] = false;
            }
        }
        else if (no > 12 && no <= 18) {
            arr[12] = true
            for (let i = 0; i <= 18; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else if (i != 12) arr[i] = false;
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