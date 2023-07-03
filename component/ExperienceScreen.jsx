import { View, Text, StyleSheet, ScrollView, Modal } from 'react-native'
import React, { useRef, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import CorrectionModalComponent from '../component/CorrectionModalComponent'


const ExperienceScreen = ({ post, charge, office, joinDate, releaseDate, index }) => {



    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = (isVisible) => {
        setModalVisible(isVisible);
    };

    const { setpresentDesig, setpresentOffice, setpresentPost, setpresentCharge } = useContext(AuthContext);


    const [isLoading, setIsLoading] = useState(false);
    const [DATA, setDATA] = useState([])
    const [refreshing, setRefreshing] = useState(true);
    const [experience, setexperience] = useState([])

    // console.log(post, charge, office, joinDate, releaseDate);

    let relDt = releaseDate ? releaseDate : ' - present '
    console.log(relDt);


    useEffect(() => {

        // fetchExpData();

    }, []);



    return (

        <>
            <ScrollView horizontal={true} style={{ flex: 1, marginBottom: 5, }}>
                < View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ flex: .75, width: 200, }}>
                        <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{post} {charge}</Text>
                    </View>
                    <View style={{ flex: 1, width: 200, marginLeft: 8 }}>
                        <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{office}</Text>
                    </View>
                    <View style={{ flex: 1, width: 90, marginLeft: 8, }}>
                        <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{joinDate}</Text>
                    </View>
                    <View style={{ flex: 1, width: 90, marginLeft: 8 }}>
                        <Text style={styles.queryTextStyle} onLongPress={() => toggleModal(true)}>{releaseDate}</Text>
                    </View>
                </View >
            </ScrollView >


            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => toggleModal(true)}
            >
                <CorrectionModalComponent correctionType={'Experience'} txt={post + ' ' + charge + ' ' + office + ' ' + joinDate + ' ' + relDt} toggleModal={toggleModal} />
            </Modal>


        </>

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
    secondTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#8040BF',
        marginBottom: 2,
        textDecorationLine: "underline",

    },
    queryTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        color: 'black',
        marginBottom: 2,


    }
});

export default ExperienceScreen