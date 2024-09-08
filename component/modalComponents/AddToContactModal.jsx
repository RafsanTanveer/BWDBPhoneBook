import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import * as Contacts from 'expo-contacts';
import { ToastOrAlert } from '../../utility/ToastOrAlert'
import { LinearGradient } from 'expo-linear-gradient';



const AddToContactModal = ({ mobileNumber, email, toggleModal, empName, post, heading }) => {

    __DEV__ && console.log(empName);
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
    //`, ${presentCharge}`
    let charge = presentCharge === 'R' ? '' :
        presentCharge === 'C' ? ',CC' :
            presentCharge === 'A' ? ',Addl.' :
                presentCharge === 'I' ? ',Incharge' : ''

    let msg = `\n\n\n\n\n...\nBest Regards, \n\n${name}\n${presentPost} ${charge}\n${presentOffice},BWDB`

    const closeModal = () => {
        toggleModal(false)
    }





    const contact = {
        [Contacts.Fields.FirstName]: `BWDB - ${empName}, `,
        [Contacts.Fields.LastName]: post,
        [Contacts.Fields.Company]: `BWDB`,
        [Contacts.Fields.PhoneNumbers]: [
            {
                number: mobileNumber,
                isPrimary: true,
                digits: "1234567890",
                countryCode: "880",
                id: null,
                label: "mobile",

            },
        ],
        [Contacts.Fields.Emails]: [
            {
                email: email,
                isPrimary: true,
                id: null,
                label: "mobile",
            },
        ],
    };


    return (


        <View style={styles.centeredView}>
            <View style={{ flex: 1, backgroundColor: `${currentTheme}5`, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: height * .015, borderTopRightRadius: height * .015, }} >
                <Text style={{ fontWeight: 'bold', fontSize: width * .045, color: 'Black' }} >Add contact of</Text>
                <Text style={{ fontWeight: 'bold', fontSize: width * .045, color: 'Black', textAlign: 'center', paddingHorizontal: 10, margin: 5 }} >{empName}</Text>
            </View>



            <View

                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: height * .015,
                    borderBottomEndRadius: height * .015,

                }} >
                <TouchableOpacity
                    onPress={async () => {




                        await Contacts.addContactAsync(contact)
                            .then((contactId) => {
                                ToastOrAlert(empName + " has been successfully added to your phone contact")
                            })
                            .catch((err) => {
                                alert(err);
                                __DEV__ && console.log(err);
                            });
                        closeModal()
                    }}
                    style={{
                        backgroundColor: `${currentTheme}`,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: height * .009
                        , elevation: 5,
                        marginHorizontal: 5,

                    }} >
                    <Text style={{ fontWeight: '600', fontSize: width * .04, color: 'white' }} >Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                        backgroundColor: `${currentTheme}`,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: height * .009
                        , elevation: 5,
                        marginHorizontal: 5
                    }} >
                    <Text style={{ fontWeight: '600', fontSize: width * .04, color: 'white' }} >Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        marginVertical: height * .40,
        marginHorizontal: width * .12,
        backgroundColor: 'white',
        borderRadius: height * .015,
        elevation: 5,
        paddingVertical: 25
    },
    modalView: {

        height: height * .3,
        width: width * .5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // borderWidth: 1,

    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,


        marginTop: 8

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        // backgroundColor: '#2196F3',
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
});

export default AddToContactModal