import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true)
    const [offices, setoffices] = useState()

    const fetchData = async () => {
        setIsLoading(true);

        try {
            setRefreshing(false);
            const { data: response } = await api.get("officelist");
            setoffices(response.rows);
        } catch (error) {
            console.error(error.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {

        fetchData();

    }, []);

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
            arr[11] = true
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
                        expanded={expendedList[8]}
                        onPress={() => handlePress(8)}  >
                        <List.Item onPress={() => { navigation.navigate('Director General') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director General" />

                        <List.Item onPress={() => { navigation.navigate('Addl. Director General') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Director General" />

                       

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
                        expanded={expendedList[1]}
                        onPress={() => handlePress(1)} >

                        <List.Item onPress={() => { navigation.navigate('Director (Admin)', { officeId: '4015', title: 'Director (Admin)' }) }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Admin)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Asst. Director (Admin)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Asst. Director (Admin)" />

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
                        expanded={expendedList[2]}
                        onPress={() => handlePress(2)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Addl. Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Superintendent Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Superintendent Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Executive Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Executive Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Sub-divisional Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Sub-divisional Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Engineer (Civil)" />
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
                        expanded={expendedList[3]}
                        onPress={() => handlePress(3)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Senior System Analyst') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Senior System Analyst" />
                        <List.Item onPress={() => { navigation.navigate('System Analyst') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="System Analyst" />

                        <List.Item onPress={() => { navigation.navigate('Programmer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Programmer" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Programmer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Programmer" />


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
                        expanded={expendedList[10]}
                        onPress={() => handlePress(10)} >
                        
                        <List.Item onPress={() => { navigation.navigate('Joint Chief') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Joint Chief" />

                        <List.Item onPress={() => { navigation.navigate('Director (Economic Evaluation)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Economic Evaluation)" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief, Economics') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief, Economics" />


                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Economics') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Economics" />

                       
                        <List.Item onPress={() => { navigation.navigate('Research Officer, Economics') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, Economics" />

                       

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
                        expanded={expendedList[4]}
                        onPress={() => handlePress(4)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Controller (Fa&A)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Controller (Fa&A)" />
                        <List.Item onPress={() => { navigation.navigate('Director (Fa&A)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Fa&A)" />
                        <List.Item onPress={() => { navigation.navigate('Addl. Director (Fa&A)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Director (Fa&A)" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Fa&A)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Fa&A)" />
                        <List.Item onPress={() => { navigation.navigate('Asstt. Director (Fa&A)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Asstt. Director (Fa&A)" />
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
                        expanded={expendedList[5]}
                        onPress={() => handlePress(5)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Director (Geology)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Geology)" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Geology)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Geology)" />
                        <List.Item onPress={() => { navigation.navigate('Geologist') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Geologist" />

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
                        expanded={expendedList[6]}
                        onPress={() => handlePress(6)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Director Land') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Director Land" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Land)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Land)" />
                        <List.Item onPress={() => { navigation.navigate('Asstt. Director (Land)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Asstt. Director (Land)" />
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
                        expanded={expendedList[7]}
                        onPress={() => handlePress(7)}
                    >

                        <List.Item onPress={() => { navigation.navigate('Chief Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Engineer (M/E)" />
                        <List.Item onPress={() => { navigation.navigate('Addl. Chief Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Chief Engineer (M/E)" />
                        <List.Item onPress={() => { navigation.navigate('Superintendent Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Superintendent Engineer (M/E)" />
                        <List.Item onPress={() => { navigation.navigate('Executive Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Executive Engineer (M/E)" />
                        <List.Item onPress={() => { navigation.navigate('Sub-divisional Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Sub-divisional Engineer (M/E)" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Engineer (M/E)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Engineer (M/E)" />

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
                        expanded={expendedList[9]}
                        onPress={() => handlePress(9)}
                    >

                        <List.Item onPress={() => { navigation.navigate('Chief Water Management') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Water Management" />

                        <List.Item onPress={() => { navigation.navigate('Principal Extension Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Principal Extension Officer" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief, Agriculture') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief, Agriculture" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief, Soil') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief, Soil" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief, Fishery') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief, Fishery" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief, Sociology') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief, Sociology" />

                        <List.Item onPress={() => { navigation.navigate('Deputy Chief Extension Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Chief Extension Officer" />

                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Fishery') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Fishery" />

                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Sociology') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Sociology" />

                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Agriculture') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Agriculture" />

                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Environment & Forest') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Environment & Forest" />

                        <List.Item onPress={() => { navigation.navigate('Assistant Chief, Soil') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Chief, Soil" />

                        <List.Item onPress={() => { navigation.navigate('Extension Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Extension Officer" />


                        <List.Item onPress={() => { navigation.navigate('Research Officer, E&F') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, E&F" />

                        <List.Item onPress={() => { navigation.navigate('Research Officer, Agri') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, Agri" />

                        <List.Item onPress={() => { navigation.navigate('Research Officer, Fishery') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, Fishery" />

                        <List.Item onPress={() => { navigation.navigate('Research Officer, Sociology') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, Sociology" />

                       
                        <List.Item onPress={() => { navigation.navigate('Research Officer, Soil') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Research Officer, Soil" />

                        <List.Item onPress={() => { navigation.navigate('Asstt. Extension Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Asstt. Extension Officer" />

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

                        <List.Item onPress={() => { navigation.navigate('Chief Medical Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Medical Officer" />

                        <List.Item onPress={() => { navigation.navigate('Medical Officer') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={styles.iconStyle}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Medical Officer" />

                       

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