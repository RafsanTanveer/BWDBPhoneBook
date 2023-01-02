import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import RowComponent from './component/RowComponent';
import DoubleColumnComponent from './component/DoubleColumnComponent';
import AddressComponent from './component/AddressComponent';



const image = 'https://0.academia-photos.com/20936688/5794344/6584685/s200_rafsan.tanveer.jpg';

const BiodataScreen = () => {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play(); 0046ff
    }, []);

    return (
        <View style={{ flex: 1, marginTop: 50, marginHorizontal: 10 }}>
            <View style={{
                alignItems: 'center', borderBottomColor: '#0080FF',
                borderBottomWidth: 1,
            }}>
                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: 15, }} >BANGLADESH WATER DEVELOPMENT BOARD</Text>
                <Text style={{ color: '#008023', fontWeight: '500', fontSize: 15, }} >Human Resource Data Management (HRDM)</Text>
                <Text style={{ color: '#0080FF', fontWeight: '500', fontSize: 15, }} >BIODATA</Text>

            </View>
            <View style={{ marginTop: 7, flexDirection: 'row', marginBottom:10 }}>
                <View style={{ flex: 1 }}>
                    <RowComponent headingText='Employee ID' queryText='651024001' />
                    <RowComponent headingText='Employee Name' queryText='Md. Emdadul Hossain Khan' />
                    <RowComponent headingText="Father's Name" queryText='Md.Sukur Khan' />
                    <RowComponent headingText="Mother's Name" queryText='Rashida Begum' />
                    <RowComponent headingText='Home District' queryText='Manikganj' />
                </View>
                <View >
                    <Image style={{ height: 100, width: 90 }} source={{
                        uri: image
                    }} />
                </View>
            </View>
            <DoubleColumnComponent
                firstHeading="Date of Birth"
                firstQueryResult="24/10/1965"
                secondHeading="Gender"
                secondQueryResult="Male"
            />
            <DoubleColumnComponent
                firstHeading="Marital Status"
                firstQueryResult="Married"
                secondHeading="Employee Status"
                secondQueryResult="Promoted"
            />
            <View style={{ flexDirection: 'row' }}>
                <View style={{flex:1.5}}>
                    <Text style={styles.textStyle}>Permanent Address</Text>
                </View>
                <View style={{ flex: 2.5 }}>
                    <Text style={styles.textStyle}>:</Text>
                </View>
            </View>

            <AddressComponent
                firstHeading="Permanent Address"
                firstDelimiter=":"
                address=""
                delimiter=""
            addressQueryResult=""
            />

           

        </View>
    );
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


export default BiodataScreen