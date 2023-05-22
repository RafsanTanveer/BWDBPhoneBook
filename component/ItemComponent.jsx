import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useContext, useCallback, memo } from "react";
import { useNavigation } from '@react-navigation/native';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


let selectedPId = []



export default memo(function ItemComponent  ({ item, index, isAdmin, notDgOrAdg, currentTheme })  {

    const navigation = useNavigation();


    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        selectedPId = []
        setSelectedItems([])
    }, [item]);


    const onSelect = (id) => {

        const ifIdExitsInSelectedPID = selectedPId.includes(id);
        if (ifIdExitsInSelectedPID) {
            var tempId = [...selectedItems]
            var index = tempId.indexOf(id)

            if (index !== -1) {
                tempId.splice(index, 1);
                setSelectedItems(tempId);
            }

            selectedPId.splice(selectedPId.indexOf(id), 1)

            // console.log('selectedItems - ', selectedItems);
            // console.log('selectedPId - ', selectedPId);
        }
        else {
            selectedPId.push(id)
            setSelectedItems([...selectedPId])


        }
        // currentSelectedItems.push(id)
        console.log('selectedItems - ', selectedItems);
        console.log('selectedPId - ', selectedPId);


        // console.log(ifIdExitsInSelectedPID);

    }


    return (

        <TouchableOpacity onPress={() => (
            onSelect(item.id)
        )}

            style={{ borderRadius: 10 }}
        >

            <View style={
                item.selected === 'true' ?
                    {
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: `${currentTheme}40`

                    } :
                    {
                        flexDirection: 'row',
                        paddingLeft: 10,
                        paddingRight: 10,
                        // backgroundColor:'green'

                    }
            }>
                {
                    // items.map((it => (<Text>it</Text>)))
                    // __DEV__ && console.log("items length "+items.length)
                }

                <View style={{ justifyContent: 'center', alignContent: 'center', }}>
                    <View style={{ borderRadius: 10 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }} >{index + 1}</Text>
                    </View>

                    <TouchableOpacity >
                        {

                            item.photo ?
                                <Image style={styles.logo} source={{ uri: "data:image/jpeg;base64," + item.photo }} />
                                :
                                <Image style={styles.place_holder_logo} source={require('../assets/person_photo_placeholder.jpg')} ></Image>

                        }
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 2, paddingHorizontal: 9, paddingVertical: 6, borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                    <View style={{ flex: 1, }}>
                        <View style={{ flex: 1, }}>
                            {/* {__DEV__ && console.log('isAdmin : '+isAdmin)} */}
                            {
                                // presentOfficeCode === 30 ?
                                isAdmin ?

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('Biodata', { id: item.id })
                                        }}>
                                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>PMIS ID   : {item.id}</Text>


                                        </TouchableOpacity>
                                        {/* <Checkbox
                                            style={{ height: 18, width: 18 }}
                                            value={isChecked}
                                            onValueChange={() => (console.log('sdf'))}
                                            color={isChecked ? `${currentTheme}` : undefined}
                                        /> */}
                                    </View>
                                    : null
                            }
                            {
                                notDgOrAdg ?
                                    <View style={{ justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#40696A', }}>Seniority : {item.seniority}</Text>
                                        <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.retiredate.toString().trim().slice(0, 10)}</Text>
                                        {/* <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.officeAddress}</Text> */}

                                    </View>
                                    : ""
                            }
                            <Text style={{ fontSize: height * .019, fontFamily: 'serif', fontWeight: 'bold' }} >{item.name} </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'black', fontWeight: '600' }}>{item.designation} </Text>
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: 'grey', }}>{item.office} </Text>
                        </View>

                    </View>

                    {
                        item.email &&
                        <TouchableOpacity onPress={() => { Linking.openURL(`mailto:${item.email}`) }}  >
                            <Text style={{ fontSize: height * .017, fontFamily: 'serif', color: '#5f9ea0', }}>{item.email} </Text>
                        </TouchableOpacity>
                    }

                    <View style={{ flexDirection: "row-reverse", marginTop: 3 }}>

                        {
                            item.mobile &&
                            <TouchableOpacity
                                onLongPress={() => (
                                    <>

                                        < ModalViewForEditNumber viewModal={true} name={item.mobile} />
                                    </>
                                )} onPress={() => { Linking.openURL(`tel:${item.mobile}`) }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 5
                                }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.mobile} </Text>
                            </TouchableOpacity>
                        }
                        {
                            item.pabx &&
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${item.pabx}`) }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 10
                                }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>{item.pabx} </Text>
                            </TouchableOpacity>
                        }
                        {
                            item.mobile &&
                            <TouchableOpacity onPress={() => (Linking.openURL(`sms:${item.mobile}`))}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 12
                                }}>
                                <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={height * .017} color="white" />
                            </TouchableOpacity>
                        }
                        {
                            // item.mobile &&
                            // <TouchableOpacity onLongPress={() => __DEV__ && console.warn('STARTED LONG PRESS')}

                            //         onPress={async () => {
                            //             const contact = {
                            //                 [Contacts.Fields.FirstName]: "Test",
                            //                 [Contacts.Fields.LastName]: "McTest",
                            //                 [Contacts.Fields.PhoneNumbers]: [
                            //                     {
                            //                         number: "(123) 456-7890",
                            //                         isPrimary: true,
                            //                         digits: "1234567890",
                            //                         countryCode: "PA",
                            //                         id: "1",
                            //                         label: "mobile",
                            //                     },
                            //                 ],
                            //                 [Contacts.Fields.Emails]: [
                            //                     {
                            //                         email: "test@gmail.com",
                            //                         isPrimary: true,
                            //                         id: "2",
                            //                         label: "mobile",
                            //                     },
                            //                 ],
                            //             };

                            //             await Contacts.addContactAsync(contact)
                            //                 .then((contactId) => {
                            //                     alert("Se creó exitosamente");
                            //                 })
                            //                 .catch((err) => {
                            //                     alert(err);
                            //                     __DEV__ && console.log(err);
                            //                 });
                            //         }}

                            //     style={{
                            //         alignItems: 'center',
                            //         flexDirection: 'row',
                            //         backgroundColor: `${currentTheme}`,
                            //         borderRadius: height * .005,
                            //         marginHorizontal: 5,
                            //         paddingVertical: 1,
                            //         paddingHorizontal: 5
                            //     }}>
                            //     {/* <Ionicons style={{ marginRight: 5 }} name="call-outline" size={height * .017} color="white" /> */}
                            //     <Text style={{ color: 'white', height: height * (1 / 40), fontSize: height * .017, fontFamily: 'serif', }}>ADD</Text>
                            // </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
)


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
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4'


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
    },
    phnButtonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: "#6750a4",
        borderRadius: height * .005,
        marginHorizontal: 5,
        paddingVertical: 1,
        paddingHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    input: {
        borderStyle: "solid",
        borderColor: "#B7B7B7",
        borderRadius: 7,
        borderWidth: 1,
        fontSize: 15,
        height: 50,
        marginHorizontal: 10,
        paddingStart: 10,
        marginBottom: 15,
    },
    label: {
        marginBottom: 7,
        marginStart: 10,
    },
    placeholderStyles: {
        color: "grey",
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "44%",

    },
    dropdownCompany: {
        marginHorizontal: 10,
        marginBottom: 15,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,

    },
    getStarted: {
        backgroundColor: "#5188E3",
        color: "white",
        textAlign: "center",
        marginHorizontal: 60,
        paddingVertical: 15,
        borderRadius: 50,
        marginTop: 20,
    },
    logIn: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    links: {
        textAlign: "center",
        textDecorationLine: "underline",
        color: "#758580",
    },

});



// export { ItemComponent };


// export default memo(ItemComponent);
