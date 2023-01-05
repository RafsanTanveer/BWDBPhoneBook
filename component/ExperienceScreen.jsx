import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const ExperienceScreen = () => {
    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 20, marginTop: 5 }}>
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.secondTextStyle}>Post Name</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, }}>
                        <Text style={styles.secondTextStyle}>Office Name</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, }}>
                        <Text style={styles.secondTextStyle}>From</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>To</Text>
                    </View>
                    
                </View >

                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.queryTextStyle}>Addl. Director General, Western Region</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, }}>
                        <Text style={styles.queryTextStyle}>Addl. Chief Engineer (Civil), Integrated Coastal Zone And
                            Climate Change Management</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, }}>
                        <Text style={styles.queryTextStyle}>01/02/2009</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, marginLeft: 10 }}>
                        <Text style={styles.queryTextStyle}>27/12/2022</Text>
                    </View>
                    
                </View >
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.queryTextStyle}>Superintending Engineer (Civil)</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, }}>
                        <Text style={styles.queryTextStyle}>Graduate</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, }}>
                        <Text style={styles.queryTextStyle}>11/11/2021</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, marginLeft: 10 }}>
                        <Text style={styles.queryTextStyle}>27/12/2022</Text>
                    </View>
                    
                </View >
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

export default ExperienceScreen