import React, { useState, useContext, useEffect } from 'react';
import { Alert, Modal, Image, StyleSheet, Text, Pressable, View, Linking, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { height, width, heightScreen, widthScreen } from '../../utility/ScreenDimensions'
import { Images } from "../../utility/Images";
import { imgSizeLarge } from "../../utility/Scalling";

const CameraModalComponent = ({ toggleModal, photo }) => {

    const [type, setType] = useState(CameraType.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();


    const closeModal = () => {
        toggleModal(false)
    }



    // function toggleCameraType() {
    //     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    // }

    // useEffect(() => {
    //     getGroupTableNames()
    // }, []);

    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.container}>



                        <Camera style={styles.camera} type={type}>
                            <View style={styles.buttonContainer}>
                                {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                                    <Text style={styles.text}>Flip Camera</Text>
                                </TouchableOpacity> */}
                            </View>
                        </Camera>

                        {
                            photo ? <Image style={{
                                height: heightScreen,
                                width: widthScreen,
                                // position: 'absolute'
                            }} source={{ uri: "data:image/jpeg;base64," + photo }} />

                                :
                                <Image style={{
                                    height: heightScreen,
                                    width: widthScreen,
                                    // position: 'absolute'
                                }}
                                    source={Images['placeHolderImg']} ></Image>
                        }

                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => closeModal()}>
                        <Image
                            source={Images['end-call']}
                            style={{ height: imgSizeLarge, width: imgSizeLarge }}
                        />


                    </TouchableOpacity>
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

    },
    modalView: {
        height: heightScreen,
        width: widthScreen,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        // backgroundColor: '#2196F3',
        height: height * .08,
        width: height * .08,
        marginTop: height * .92,
        position: 'absolute',
        borderRadius: height * .5,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    camera: {
        height: heightScreen * .2,
        width: widthScreen * .25,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: height * .045,
        left: width * .7,
        position: 'absolute',
        zIndex: 500
    }
});

export default CameraModalComponent