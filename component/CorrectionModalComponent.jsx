import React, { useState, useContext, useRef, useEffect } from 'react';
import { TextInput, SafeAreaView, StyleSheet, Text, View, Linking, StatusBar, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



const CorrectionModalComponent = ({ correctionType,txt, toggleModal }) => {

    // console.log(correctionType,txt);

    const refFlatList1 = useRef(null);
    const refFlatList2 = useRef(null);
    const [scrollingRightSideAmount, setScrollingRightSideAmount] = useState(0);

    const { photo, officeAddres, presentOffice, name, logout, presentPost, presentCharge } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);

    const [problemSt, setProblemSt] = useState([]);
    const [requiredDocsStatus, setRequiredDocsStatus] = useState([false, false, false, false, false, false, false, false, false,]);
    const [requiredDocs, setRequiredDocs] = useState([
        'SSC Certificate',
        'HSC Certificate',
        'Honors Certificate',
        'NID',
        'Service Book',
        'Tranfer/Posting Order',
        'Charge Paper',
        'Release Order'
    ]);

    const closeModal = () => {

        toggleModal(false)

    }
    useEffect(() => {
        let probSt = []
        probSt.push(txt)
        setProblemSt(probSt)
    }, []);


    const problemStItem = ({ item, index }) => (
        <View key={index} style={{ ...styles.problemStStyle, backgroundColor: '#ff000030', }} >
            <Text style={{}} >{item}</Text>
        </View>
    )

    const problemStCorrenctionItem = ({ item, index }) => (
        <View key={index} style={{ ...styles.problemStStyle, backgroundColor: '#00ff0030', }} >
            <TextInput placeholder=''
                style={{}} >
                {item}
            </TextInput>
        </View>
    )


    return (


        <SafeAreaView style={{ marginTop: 0 }} >
            <View style={styles.modalView}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: `${currentTheme}`,
                        padding: 5,
                        width: width * .5,
                        alignContent: 'center',
                        borderRadius: 3
                    }} >
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: height * .018,
                            textAlign: 'center'
                        }}>Correction Request</Text>
                    </View>

                </View>

                <View style={{ marginTop: 5 }} >
                    <Text style={{ fontWeight: 'bold' }} >{correctionType}</Text>
                </View>

                <View style={{ marginTop: 5 }} >
                    <Text style={{ fontWeight: 'bold' }} >Wrong: </Text>
                </View>
                <FlatList
                    ref={refFlatList1}
                    horizontal
                    data={problemSt}
                    renderItem={problemStItem}
                    onScroll={e => {
                        if (e.nativeEvent.contentOffset.x > 0 && scrollingRightSideAmount > e.nativeEvent.contentOffset.x) {
                            setScrollingRightSideAmount(e.nativeEvent.contentOffset.x)
                            refFlatList2.current.scrollToOffset({ offset: e.nativeEvent.contentOffset.x, animated: true });
                        } else {
                            setScrollingRightSideAmount(e.nativeEvent.contentOffset.x)
                            refFlatList2.current.scrollToOffset({ offset: e.nativeEvent.contentOffset.x, animated: true });
                        }
                    }}
                />
                <View style={{ marginTop: 5, flexDirection: 'row', alignContent: 'center', }} >
                    <View style={{ justifyContent: 'center', }} >
                        <Text style={{ fontWeight: 'bold' }} >Corrections: </Text>
                    </View>
                    <View style={{ justifyContent: 'center', }} >
                        <Text style={{ fontStyle: 'italic', fontSize: 12, color: 'grey' }} >(Tap to edit) </Text>
                    </View>
                </View>

                <FlatList
                    ref={refFlatList2}
                    horizontal
                    data={problemSt}
                    renderItem={problemStCorrenctionItem}
                    // onScroll={e => {
                    //     if (e.nativeEvent.contentOffset.x > 0 && scrollingRightSideAmount > e.nativeEvent.contentOffset.x) {
                    //         setScrollingRightSideAmount(e.nativeEvent.contentOffset.x)
                    //         refFlatList1.current.scrollToOffset({ offset: e.nativeEvent.contentOffset.x, animated: true });
                    //     } else {
                    //         setScrollingRightSideAmount(e.nativeEvent.contentOffset.x)
                    //         refFlatList1.current.scrollToOffset({ offset: e.nativeEvent.contentOffset.x, animated: true });
                    //     }
                    // }}
                />



                <View style={{ marginTop: 15, flexDirection: 'row', }} >
                    <View style={{ margin: 3, flex: 1, backgroundColor: '#ffffffff', padding: 5 }} >
                        <Text style={{ fontWeight: 'bold' }} >Required Documents:</Text>
                    </View>
                    <View style={{ margin: 3, flex: 2, }} >
                        {
                            requiredDocs.map((it, index) =>

                                <TouchableOpacity key={index} onPress={() => { }}
                                    style={{ ...styles.requrementBtnStyle, backgroundColor: `${currentTheme}` }} >
                                    <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} >{it}</Text>
                                </TouchableOpacity>)
                        }


                        <TouchableOpacity onPress={() => { }}
                            style={{ ...styles.requrementBtnStyle, backgroundColor: `${currentTheme}` }} >
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} >Others</Text>
                        </TouchableOpacity>


                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ margin: 5 }}>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#00aa00' }}
                            onPress={() => closeModal()}>
                            <Text style={styles.textStyle}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ margin: 5 }}>
                        <TouchableOpacity
                            style={{ ...styles.button, backgroundColor: '#aa0000' }}
                            onPress={() => closeModal()}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>


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
        // height: height * .35,
        width: width * .9,
        margin: 20,
        // marginTop:150,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 25,
        // alignItems: 'center',
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
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'blue',
        borderWidth: 1,
        marginTop: 15,
        elevation: 5

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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
    problemStStyle: {
        margin: 3,

        padding: 5,
        borderRadius: 3
    },
    requrementBtnStyle: {
        // backgroundColor: {currentTheme},
        // height: height * .04,
        width: width * .3,
        justifyContent: 'center',
        margin: 3,
        padding: 5,
        borderRadius: 3,
        elevation: 8
    }
});

export default CorrectionModalComponent