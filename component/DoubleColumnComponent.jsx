import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const DoubleColumnComponent = ({firstHeading, firstQueryResult, secondHeading, secondQueryResult}) => {
  return (
      <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: .48, }}>
              <Text style={styles.textStyle}>{firstHeading}</Text>
          </View>
          <View style={{ flex: .04 }}>
              <Text style={styles.textStyle}>:</Text>
          </View>
          <View style={{ flex: .5, alignItems: 'flex-start',  }}>
              <Text style={styles.queryTextStyle}>{firstQueryResult}</Text>
          </View>
          <View style={{ flex: .48 }}>
              <Text style={styles.textStyle}>{secondHeading}</Text>
          </View>
          <View style={{ flex: .04 }}>
              <Text style={styles.textStyle}>:</Text>
          </View>
          <View style={{ flex: .4, alignItems: 'flex-start', }}>
              <Text style={styles.queryTextStyle}>{secondQueryResult}</Text>
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
export default DoubleColumnComponent