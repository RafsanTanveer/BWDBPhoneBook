import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, ToastAndroid, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from '../../context/AuthContext'

import { height, width } from '../../utility/ScreenDimensions'
import { serverAddress } from '../../api/ServerAddress'
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import api from '../../api/api'
import mime from "mime";

const ShowPhotoModalComponent = ({ heading, toggleModal, refreshList, uri }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentGroupValue, setCurrentGroupValue] = useState();

    const [mobileNumber, setmobileNumber] = useState();


    const { pmisId } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);


    const closeModal = () => {
        toggleModal(false)
    }

    console.log('uri  ---------------------=======   ', uri);

    const uploadImage = async () => {

        try {

            let imgUri = uri.uri
            const imgHeight = uri.height
            const imgWidth = uri.width

            console.log('file : ');

            let file;
            let thumnailImg;

            if (imgHeight > 1000 || imgWidth > 1000) {

                file = await ImageManipulator.manipulateAsync(imgUri, [], { compress: .25 });
                thumnailImg = await ImageManipulator.manipulateAsync(imgUri, [], { compress: .25 });

            }
            else {

                file = await ImageManipulator.manipulateAsync(imgUri, [], { compress: 1 });
                thumnailImg = await ImageManipulator.manipulateAsync(imgUri, [], { compress: 1 });

            }



            console.log(file);

            imgUri = file.uri


            console.log(uri.size, '  ', imgHeight, ' ', imgWidth);


            const formData = new FormData()


            formData.append("pmisId", pmisId)
            formData.append("imgHeight", imgHeight)
            formData.append("imgWidth", imgWidth)
            formData.append('empphoto', {
                name: 'image.jpg',
                type: mime.getType(imgUri),
                uri:
                    Platform.OS === 'android'
                        ? imgUri
                        : imgUri.replace('file://', ''),
            });




            fetch(`${serverAddress}postPhoto`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(() => {
                closeModal()
                refreshList()
            });




        } catch (error) {
            console.log(error);
        }

    };






    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', marginBottom: height * .03 }}>
                        <Text style={{ fontSize: height * .023, fontWeight: '700' }}>{heading}</Text>
                    </View>


                    <View  >
                        <Image
                            source={{ width: width * .5, height: height * .35, uri: uri.uri }}

                        />
                    </View>




                    <View style={{ flexDirection: 'row', }} >
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}

                            onPress={() => uploadImage()}>
                            <Text style={styles.textStyle}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: `${currentTheme}`, elevation: 5 }}
                            onPress={() => closeModal()}>
                            <Text style={{ ...styles.textStyle }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,

    },
    modalView: {
        height: height * .55,
        width: width * .7,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // borderWidth: 1,
        borderColor: 'blue',
        elevation: 5
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,


        marginTop: 20,
        marginRight: 5,

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

export default ShowPhotoModalComponent