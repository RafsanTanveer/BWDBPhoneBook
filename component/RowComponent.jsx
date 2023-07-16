import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const RowComponent = ({ headingText, queryText }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .4 }}>
                <Text style={styles.textStyle}>{headingText}</Text>
            </View>
            <View style={{ flex: .01 }}>
                <Text style={styles.textStyle}>:</Text>
            </View>
            <View style={{ flex: .59, alignItems: 'flex-start', }}>
                <Text style={styles.queryTextStyle}>{queryText}</Text>
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
    queryTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2,
        marginLeft: 7

    }
});



export default RowComponent