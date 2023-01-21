import * as React from "react";
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { Divider, List, } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { DATA_AE } from '../data/DATA'
// import CustomLogo from "../component/CustomLogo";  right-chevron

const bwdbLogo = '../assets/bwdLogo.png'
const rightArrow = '../assets/icons/right.png'
const engLogo = '../assets/icons8-architect-48.png'
const desig = '../assets/icons/designation.png'
const dg = '../assets/icons/dg.png'
const admin = '../assets/icons/admin.png'
const computer = '../assets/icons/computer.png'
const land = '../assets/icons/land.png'
const geology ='../assets/icons/geology.png'
const fa ='../assets/icons/accounts.png'
const civil = '../assets/icons/civil.png'
const economic ='../assets/icons/economic.png'
const me = '../assets/icons/me.png'
const water = '../assets/water.png'
const office='../assets/icons/office.png'




const CustomLogo = ({logo}) => {
    return (
        <Image
            source={require(engLogo)}
            style={{ width: 30, height: 30, }}
        />
    )
}

const ExpendableDrawer = () => {

    const navigation = useNavigation();
    const [expendedList, setexpendedList] = React.useState([])

    const handlePress = (no) => {
        const arr = []

        if (no == 0) {
            expendedList[0] ? arr[0] = false : arr[0] = true;
            for (let i = 1; i < 12; i++) {

                arr[i] = false;
            }
        }
        else if (no == 11) {
            expendedList[11] ? arr[11] = false : arr[11] = true;
            for (let i = 0; i < 11; i++) {

                arr[i] = false;
            }
        }
        else {
            arr[11] = true
            for (let i = 0; i < 11; i++) {
                if (i == no) expendedList[no] ? arr[i] = false : arr[i] = true;
                else arr[i] = false;
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
                    left={props => <List.Icon {...props}
                    
                        icon={() => (
                            <Image
                                source={require(desig)}
                                style={{ width: 30, height: 30, }}
                            />
                        )}
                        
                    />}
                    expanded={expendedList[11]}
                    onPress={() => handlePress(11)}  >

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="DG & ADG"
                        left={props => <List.Icon {...props}
                            icon={() => (
                                <Image
                                    source={require(dg)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[8]}
                        onPress={() => handlePress(8)}  >
                        <List.Item left={props => <List.Icon {...props}
                            icon={() => (
                                <Image
                                    source={require(rightArrow)}
                                    style={{ width: 20, height: 20, }}
                                />
                            )}
                        />} style={{ marginLeft: 20, marginTop: -10, }} title="Director General" />
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Addl. Director General" />

                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Admin"
                        left={props => <List.Icon {...props}
                        
                            icon={() => (
                                <Image
                                    source={require(admin)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[1]}
                        onPress={() => handlePress(1)} >

                        <List.Item onPress={() => { navigation.navigate('Director (Admin)', { officeId: '4015', title: 'AD(Adc  Min)' }) }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Deputy Director (Admin)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Deputy Director (Admin)" />
                        <List.Item onPress={() => { navigation.navigate('Asst. Director (Admin)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Asst. Director (Admin)" />

                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Civil"
                        left={props => <List.Icon {...props}
                            icon={() => (
                                <Image
                                    source={require(civil)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[2]}
                        onPress={() => handlePress(2)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={{ width: 20, height: 20, }}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Addl. Chief Engineer (Civil)') }} left={props => <List.Icon {...props} icon={() => (
                            <Image
                                source={require(rightArrow)}
                                style={{ width: 20, height: 20, }}
                            />
                        )} />} style={{ marginLeft: 20, marginTop: -16, }} title="Addl. Chief Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Superintendent Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Superintendent Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Executive Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Executive Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Sub-divisional Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Sub-divisional Engineer (Civil)" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Engineer (Civil)') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Engineer (Civil)" />
                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Computer"
                        left={props => <List.Icon {...props}
                        
                            icon={() => (
                                <Image
                                    source={require(computer)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[3]}
                        onPress={() => handlePress(3)}
                    >
                        <List.Item onPress={() => { navigation.navigate('Senior System Analyst') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Senior System Analyst" />
                        <List.Item onPress={() => { navigation.navigate('System Analyst') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="System Analyst" />

                        <List.Item onPress={() => { navigation.navigate('Programmer') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Programmer" />
                        <List.Item onPress={() => { navigation.navigate('Assistant Programmer') }} left={props => <List.Icon {...props} icon="meteor" />} style={{ marginLeft: 20, marginTop: -16, }} title="Assistant Programmer" />


                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Economic"
                        left={props => <List.Icon {...props}
                        
                            icon={() => (
                                <Image
                                    source={require(economic)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[10]}
                        onPress={() => handlePress(10)} >
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Director" />
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Deputy Director" />
                        <List.Item style={{ marginLeft: -30, marginTop: -10 }} title="Assistant Director" />

                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="FA&A"
                        left={props => <List.Icon {...props}
                            
                            icon={() => (
                                <Image
                                    source={require(fa)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}

                            // icon={<CustomLogo />}
                        
                        />
                        }
                        expanded={expendedList[4]}
                        onPress={() => handlePress(4)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Geology"
                        left={props => <List.Icon {...props}
                            icon={() => (
                                <Image
                                    source={require(geology)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        
                        expanded={expendedList[5]}
                        onPress={() => handlePress(5)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Land & Revenue"
                        left={props => <List.Icon {...props}
                        
                        
                            icon={() => (
                                <Image
                                    source={require(land)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[6]}
                        onPress={() => handlePress(6)}
                    >
                        <List.Item title="First item" />
                        <List.Item title="Second item" />
                    </List.Accordion>

                    <List.Accordion
                        style={styles.accordingStyle}
                        title="ME"
                        left={props => <List.Icon {...props}
                            icon={() => (
                                <Image
                                    source={require(me)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[7]}
                        onPress={() => handlePress(7)}
                    >

                        <TouchableOpacity onPress={() => { navigation.navigate('Director (Admin)', { officeId: '4015', title: 'AD(AdMin)' }) }} style={{ height: 20 }}>
                            <Text>Office Text</Text>
                        </TouchableOpacity>

                    </List.Accordion>
                    <List.Accordion
                        style={styles.accordingStyle}
                        title="Water"
                        left={props => <List.Icon {...props}
                        
                            icon={() => (
                                <Image
                                    source={require(water)}
                                    style={{ width: 30, height: 30, }}
                                />
                            )}
                        />}
                        expanded={expendedList[9]}
                        onPress={() => handlePress(9)}
                    >

                        <TouchableOpacity onPress={() => { navigation.navigate('Director (Admin)', { officeId: '4015', title: 'AD(AdMin)' }) }} style={{ height: 20 }}>
                            <Text>Office Text</Text>
                        </TouchableOpacity>

                    </List.Accordion>


                </List.Accordion>

                <List.Accordion
                    style={styles.accordingStyleOffice}
                    title="Office"
                    left={props => <List.Icon {...props}
                    
                        icon={() => (
                            <Image
                                source={require(office)}
                                style={{ width: 30, height: 30, }}
                            />
                        )}
                    />}
                    expanded={expendedList[0]}
                    onPress={() => handlePress(0)} >



                    <TextInput
                        //style={{  borderRadius: 5, borderWidth: 1, width: 270, height: 30 }}
                        placeholder="Search Office"
                        //value={search}
                        //underlineColorAndroid='trasparent'

                        textAlign={'left'}
                        //onChangeText={(text) => searchFilter(text)}
                        mode='outlined'


                    />

                    <ScrollView style={{ height: 400, }}>
                        {
                            DATA_AE.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => { navigation.navigate('OfficeScreen', { officeId: '415', title: 'Human Resource Developement Directorate' }) }}>
                                    <View style={{ marginRight: 5 }}>
                                        <Text style={{ fontSize: 15, fontWeight: '500' }}>{index + 1}. {item.office}</Text>
                                        <Divider />
                                    </View>
                                </TouchableOpacity>

                            ))
                        }




                    </ScrollView>



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
        marginVertical: -5,
        marginHorizontal: 10,
        backgroundColor: "white"
    },
    accordingStyleOffice: {
        marginVertical: 0,
        backgroundColor: "white"
    },
    listItem: {
        marginLeft:17,
        marginTop: -10
    }
})

export default ExpendableDrawer;
