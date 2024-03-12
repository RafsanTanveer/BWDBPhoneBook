import { View, Text, Image } from 'react-native'
import React from 'react'
import { Images } from '../utility/Images'
import { width, height } from '../utility/ScreenDimensions'
const developedBy = '../assets/empdirscrshot.jpg'
const AboutScreen = () => {
    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white', flex:1 }}>
            <View style={{ paddingVertical: width * 0.05 }} >
             <Text style={{ fontSize: width * 0.05, fontWeight:'700' }} >BWDB EMPLOYEE DIRECTORY</Text>
           </View>
            <View style={{}} >
                <Image
                    source={require(developedBy)}
                    style={{
                        width: width * .7,
                        height: height * .45,
                    }}
                    resizeMode="contain"
                />
            </View>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingVertical: width * 0.03 }} >Version : 1.0</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02}} >Design & Developed by</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02}} >Rafsan Zani Rabbi</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02}} >PMIS ID : 920219001</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02}} >Assistant Programmer</Text>
            <Text style={{ fontSize: width * 0.045, fontWeight: '600', paddingBottom: width * 0.02}} >Human Resourse Development Directorate</Text>
        </View>
    )
}

export default AboutScreen