import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
// import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import {AuthContext} from '../../context/AuthContext'
import * as FileSystem from 'expo-file-system'
import { serverAddress } from '../../api/ServerAddress'
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Images } from '../../utility/Images'
import mime from "mime";




const CameraOrGalleryModal = ({ number, toggleModal, type, heading, refreshList }) => {

    __DEV__ && console.log(type);
    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge, pmisId } = useContext(AuthContext);
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


    const uploadImage = async (uri) => {

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
            // const manipResult = await ImageManipulator.manipulateAsync(
            //     image.localUri || image.uri,
            //     [{ resize: { width: 640, height: 480 } }],
            //     { compress: .5, }

            // );


            console.log(uri.size, '  ', imgHeight, ' ', imgWidth);

            // console.log('manipResult -----------------9999999999000000000   ', manipResult);



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




        // setUploading(false);
    };


    const selectImage = async (useLibrary) => {
        let result;
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: .5,
            maxWidth: 100,
            maxHeight: 100,


        };

        if (useLibrary) {
            result = await ImagePicker.launchImageLibraryAsync(options);
        } else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options);
        }

        // Save image if not cancelled
        if (!result.canceled) {
            uploadImage(result.assets[0]);
        }
    };





    return (


        <View style={styles.centeredView}>
            <View style={{ flex: 1, backgroundColor: `${currentTheme}5`, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: height * .015, borderTopRightRadius: height * .015, }} >
                <Text style={{ fontWeight: 'bold', fontSize: width * .048, color: 'Black' }} >{heading}</Text>
            </View>
            <View style={{ flex: 2, alignItems: 'center', }} >
                <TouchableOpacity
                    onPress={() => selectImage(true)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >
                    <Image
                        source={Images['gallery']}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: width * .045, fontWeight: '500', margin: 10 }}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => selectImage(false)}
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }} >
                    <Image
                        source={Images['camera']}
                        style={{ width: 30, height: 30 }}
                    />
                    <Text style={{ fontSize: width * .045, fontWeight: '500', margin: 10 }}>Camera</Text>
                </TouchableOpacity>
            </View>

            <View

                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: height * .015, borderBottomEndRadius: height * .015 }} >
                <TouchableOpacity
                    onPress={() => closeModal()}
                    style={{
                        backgroundColor: `${currentTheme}`,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: height * .009
                        , elevation: 5
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
        marginVertical: height * .35,
        marginHorizontal: width * .20,
        backgroundColor: 'white',
        borderRadius: height * .015,
        elevation: 5,
        paddingVertical: 15
    },
    modalView: {

        height: height * .3,
        width: width * .6,
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

export default CameraOrGalleryModal