import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const AddressComponent = ({ firstHeading, firstDelimiter, address, addressQueryResult, delimiter }) => {
    return (
        <View>

            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: .35, }}>
                    <Text style={styles.textStyle}>{firstHeading}</Text>
                </View>
                <View style={{ flex: .02, alignItems: 'flex-start' }}>
                    <Text style={styles.textStyle}>{firstDelimiter}</Text>
                </View>
                <View style={{ flex: .2, alignItems: 'flex-start', }}>
                    <Text style={styles.secondTextStyle}>{address}</Text>
                </View>
                <View style={{ flex: .02, alignItems: 'flex-start' }}>
                    <Text style={styles.textStyle}>{delimiter}</Text>
                </View>
                <View style={{ flex: .41, }}>
                    <Text style={styles.queryTextStyle}>{addressQueryResult}</Text>
                </View>
            </View>
        </View>
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
        marginBottom: 2

    },
    queryTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2,
        marginLeft: 7

    }
});

export default AddressComponent