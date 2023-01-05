import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const PromotionScreen = () => {
    return (


        <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 20, marginTop: 5 }} scrollEnabled={false}>
            <View>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1.5, width: 50, }}>   
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

                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1.5, width: 50, }}>
                        <Text style={styles.secondTextStyle}></Text>
                    </View>
                    <View style={{ flex: 1.5, width: 150, }}>
                        <Text style={styles.queryTextStyle}>Asstt. Programmer</Text>
                    </View>
                    <View style={{ flex: 1, width: 100, }}>
                        <Text style={styles.queryTextStyle}>12/06/2019</Text>
                    </View>
                    <View style={{ flex: 1, width: 120, }}>
                        <Text style={styles.queryTextStyle}>12/06/2019</Text>
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

export default PromotionScreen