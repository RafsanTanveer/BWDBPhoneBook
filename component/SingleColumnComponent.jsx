import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const SingleColumnComponent = ({ firstHeading, firstQueryResult, delimiter }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .3088, }}>
                <Text style={styles.textStyle}>{firstHeading}</Text>
            </View>
            <View style={{ flex: .01, }}>
                <Text style={styles.textStyle}>{delimiter}</Text>
            </View>
            <View style={{ flex: .7, alignItems: 'flex-start',  }}>
                <Text style={styles.queryTextStyle}>{firstQueryResult}</Text>
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
export default SingleColumnComponent