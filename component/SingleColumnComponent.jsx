import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from "react";

import CorrectionModalComponent from '../component/CorrectionModalComponent'
import { height, width } from '../utility/ScreenDimensions';
import { ThemeContext } from "../context/ThemeContext";


const SingleColumnComponent = ({ firstHeading, firstQueryResult, delimiter }) => {

    const { currentTheme } = useContext(ThemeContext);


    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = (isVisible) => {
        setModalVisible(isVisible);
    };


    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: .3088, }}>
                <Text style={styles.textStyle} onLongPress={() => toggleModal(true)}>{firstHeading}</Text>
            </View>
            <View style={{ flex: .01, }}>
                <Text style={styles.textStyle}>{delimiter}</Text>
            </View>
            <View style={{ flex: .7, alignItems: 'flex-start', flexDirection: 'row' }}>
                <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{firstQueryResult}</Text>
                {
                    (firstHeading === 'Blood' || firstHeading === 'Blood') &&
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: `${currentTheme}`,
                            borderRadius: height * .005,
                            marginHorizontal: 5,
                            paddingVertical: .5,
                            paddingHorizontal: 5,
                            elevation:2
                        }} >
                        <Text style={{ color: 'white', fontSize: height * .015, fontStyle:'italic' }} >Edit</Text>
                    </TouchableOpacity>
                }
            </View>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => toggleModal(true)}
            >
                <CorrectionModalComponent correctionType={firstHeading} txt={firstQueryResult} toggleModal={toggleModal} />
            </Modal>

        </View>
    )
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
export default SingleColumnComponent