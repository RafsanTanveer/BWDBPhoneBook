import React, { useState, useContext } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions } from 'react-native';
// import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { height, width } from '../../utility/ScreenDimensions'
import { AuthContext } from '../../context/AuthContext'
import * as FileSystem from 'expo-file-system'
import { serverAddress } from '../../api/ServerAddress'
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Images } from '../../utility/Images'
import mime from "mime";
import ShowPhotoModalComponent from './ShowPhotoModalComponent';


let photoUrl = ''

const CameraOrGalleryModal = ({ number, toggleModal, type, heading, refreshList }) => {

    __DEV__ && console.log(type);
    const { pmisId } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);
    const [isShowPhotoModalVisible, setisShowPhotoModalVisible] = useState(false);



    const closeModal = () => {
        toggleModal(false)
    }


   

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

            photoUrl = result.assets[0]
            setisShowPhotoModalVisible(true)


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

            <Modal
                transparent={true}
                animationType="fade"
                visible={isShowPhotoModalVisible}
                onRequestClose={() => toggleModal(true)}
            >
                <ShowPhotoModalComponent

                    toggleModal={toggleModal}
                    heading={'Photo Upload'}
                    refreshList={refreshList}
                    uri={photoUrl}
                />

            </Modal>

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