import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const EducationComponent = () => {
    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 10, marginTop: 5 }}>
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 50,  }}>
                        <Text style={styles.secondTextStyle}>Year</Text>
                    </View>
                    <View style={{ flex: 1, width: 100,  }}>
                        <Text style={styles.secondTextStyle}>Qualification</Text>
                    </View>
                    <View style={{ flex: 1, width: 120,  }}>
                        <Text style={styles.secondTextStyle}>Decipline</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 8 }}>
                        <Text style={styles.secondTextStyle}>Institution</Text>
                    </View>
                    <View style={{ flex: 1, width: 80,  }}>
                        <Text style={styles.secondTextStyle}>Class/GPA</Text>
                    </View>
                    <View style={{ flex: 1, width: 80 }}>
                        <Text style={styles.secondTextStyle}>Remarks</Text>
                    </View>
                </View >

                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 50,  }}>
                        <Text style={styles.queryTextStyle}>2015</Text>
                    </View>
                    <View style={{ flex: 1, width: 100,  }}>
                        <Text style={styles.queryTextStyle}>Graduate</Text>
                    </View>
                    <View style={{ flex: 1, width: 120, }}>
                        <Text style={styles.queryTextStyle}>Computer Science & Engineering</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 10 }}>
                        <Text style={styles.queryTextStyle}>Khulna University Of Engineering & Technology</Text>
                    </View>
                    <View style={{ flex: 1, width: 80,  marginLeft:5, }}>
                        <Text style={styles.queryTextStyle}>3.13/4.00</Text>
                    </View>
                    <View style={{ flex: 1, width: 80 }}>
                        <Text style={styles.queryTextStyle}>Remarks</Text>
                    </View>
                </View >
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 50, }}>
                        <Text style={styles.queryTextStyle}>2015</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, }}>
                        <Text style={styles.queryTextStyle}>Graduate</Text>
                    </View>
                    <View style={{ flex: 1, width: 120, }}>
                        <Text style={styles.queryTextStyle}>Computer Science & Engineering</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 10 }}>
                        <Text style={styles.queryTextStyle}>Khulna University Of Engineering & Technology</Text>
                    </View>
                    <View style={{ flex: 1, width: 80, marginLeft: 5, }}>
                        <Text style={styles.queryTextStyle}>3.13/4.00</Text>
                    </View>
                    <View style={{ flex: 1, width: 80 }}>
                        <Text style={styles.queryTextStyle}>Remarks</Text>
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

export default EducationComponent