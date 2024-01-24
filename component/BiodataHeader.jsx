import { View, Text, Image } from 'react-native'
import React from 'react'
import { height, width } from '../utility/ScreenDimensions'
import { Images } from '../utility/Images'

const BiodataHeader = ({ heading ="BIODATA"}) => {
    return (
        <View style={{
            flexDirection: 'row', borderBottomColor: '#0080FF',
            borderBottomWidth: 1
        }}>


            <View style={{ justifyContent: 'center', alignContent: 'center', marginHorizontal: 5, }}>
                <Image style={{ width: width * .15, height: width * .15 }} source={Images['bwdLogo']} />
            </View>
            <View style={{
                alignItems: 'center',
            }}>
                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: width * .038, marginBottom: 2 }} >BANGLADESH WATER DEVELOPMENT BOARD</Text>
                <Text style={{ color: '#008023', fontWeight: '500', fontSize: width * .0369, marginBottom: 2 }} >Human Resource Data Management (HRDM)</Text>
                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: width * .0375, }} >{heading}</Text>

            </View>
        </View>
    )
}

export default BiodataHeader