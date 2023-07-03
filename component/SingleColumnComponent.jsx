import { View, Text, StyleSheet, Modal } from 'react-native'
import React, { useState } from "react";

import CorrectionModalComponent from '../component/CorrectionModalComponent'


const SingleColumnComponent = ({ firstHeading, firstQueryResult, delimiter }) => {


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
            <View style={{ flex: .7, alignItems: 'flex-start',  }}>
                <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{firstQueryResult}</Text>
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