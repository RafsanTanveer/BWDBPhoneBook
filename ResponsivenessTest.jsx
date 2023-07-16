import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from './Matrics';



const ResponsivenessTest = () => {
    return (
        <View style={styles.container}>
            
            <View style={{backgroundColor:'green'}}>
                <Text style={styles.containerText}> Hello world </Text>
            </View>
            <View>
                <Text style={styles.containerText}> ipppppppppppppppjpjiop </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        
        alignItems: 'center',
        justifyContent:'center'
       
    },
    containerText: {
        
        fontSize: moderateScale(22)
    }
});
export default ResponsivenessTest