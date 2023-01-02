import React, { useState } from "react";
import { Button, Linking, Platform, FlatList, Image, SafeAreaView, Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const Item = ({ item, onPress, backgroundColor, textColor }) => (



    <View style={{
        flexDirection: 'row', paddingLeft: 10, paddingRight: 10, 
    }}>

        <View style={{ justifyContent: 'center', alignContent: 'center', }}>
            <Image style={styles.logo} source={{
                uri: item.image
            }} />
        </View>
        <View style={{
            flex: 2, paddingHorizontal: 9, paddingVertical: 6, borderBottomColor: 'grey',
            borderBottomWidth: StyleSheet.hairlineWidth,
        }}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1,}}>
                    <Text style={{  fontSize: height * .019, fontFamily: 'serif', fontWeight: 'bold' }} >{item.name} </Text>
                </View>
                <View style={{ flex: 1,marginTop:1}}>
                    <Text style={{  fontSize: height * .017, fontFamily: 'serif', color: 'black', fontWeight: '600' }}>{item.designation} </Text>
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={{  fontSize: height * .017, fontFamily: 'serif', color: 'grey', }}>{item.office} </Text>
                </View>

            </View>
            <View style={{ flexDirection: "row-reverse", marginTop:3 }}>

                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.personalContact}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                    <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                    <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.personalContact} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${item.officeContact}`) }} style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingHorizontal: 10 }}>
                    <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                    <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.officeContact} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (Linking.openURL(`sms:${item.personalContact}`))}
                    style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#6750a4', borderRadius: height * .005, marginHorizontal: 5, paddingVertical: 1, paddingRight: 9, paddingLeft: 12 }}>
                    <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={height * .017} color="white" />
                </TouchableOpacity>

            </View>
        </View>

    </View>



);



const DataRender = ({ DATA }) => {

    const [masterData, setMasterData] = useState(DATA)
    const [filteredData, setFilteredData] = useState(DATA)
    const [selectedId, setSelectedId] = useState(null);
    const [search, setSearch] = useState('')




    //{ DATA.map((employee) => { console.log(employee.Name);})}

    const searchFilter = (text) => {
        //setMasterData(DATA)
        console.log(masterData);
        if (text) {
            const newData = masterData.filter((item) => {
                console.log('in master' + item.Name);
                const itemData = item.Name ? item.Name.toLocaleLowerCase() : ''
                const textData = text.toLocaleLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData)
            setSearch(text)
        }
        else {
            console.log('in emply ');
            setFilteredData(masterData)
            setSearch(text)
        }

    }


    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (

        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                <TextInput style={{ height: height / 20, width: "98%", borderRadius: 10, marginBottom: 5 }}
                    placeholder="Search"
                    value={search}
                    //underlineColorAndroid='trasparent'
                    onChangeText={(text) => searchFilter(text)}
                    mode='outlined'


                />
            </View>

            <FlatList

                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight ,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        //marginHorizontal: 16,
        height: 40,
        width: 90
    },
    title: {
        fontSize: 32,

    },
    logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,


    },
    button: {
        backgroundColor: "gray",
        height: 40,
        width: 60,
        //padding: 10,
        borderRadius: 10
    },
    buttonText: {
        paddingTop: 9,
        paddingLeft: 16,
        color: "white",
        alignContent: 'center',
        justifyContent: 'center'
    }
});



export default DataRender