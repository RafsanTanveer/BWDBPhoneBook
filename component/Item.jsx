import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { memo, useContext, useEffect, useState, useRef } from "react";
import { Image, Linking, Modal, StyleSheet, Text, TouchableOpacity, View, Platform } from "react-native";
import * as Contacts from 'expo-contacts';
import { useNetInfo } from "@react-native-community/netinfo";
import { ToastOrAlert } from '../utility/ToastOrAlert';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { Images } from '../utility/Images';
import { Camera, CameraType } from 'expo-camera';
import MakeCallModalComponent from '../component/MakeCallModalComponent';
import AddToContactModal from '../component/modalComponents/AddToContactModal'
import CameraModalComponent from '../component/modalComponents/CameraModalComponent'
import UpdateBloodGroupModalComponent from '../component/modalComponents/UpdateBloodGroupModalComponent'
import UpdateMobileNumberModalComponent from '../component/modalComponents/UpdateMobileNumberModalComponent'
import UpdateEmailModalComponent from '../component/modalComponents/UpdateEmailModalComponent'
import { Charges } from '../utility/Charges';

import { height, width } from '../utility/ScreenDimensions';
import { imgSizeMini, txtSizeNormal, txtSizeBig } from "../utility/Scalling";
import UpdatePostModalComponent from './modalComponents/UpdatePostModalComponent';

let selectedPId = []
let selectedGroupIds = []




const Item = ({ id,
    name,
    officeid,
    office,
    email,
    mobile,
    blood,
    seniority,
    retiredate,
    bwdbJoiningDt,
    pabx,
    selected,
    photo,
    index,
    designation,
    post,
    higherPost,
    charge,
    isAdmin,
    adminLevel,
    canCallBulk,
    canAccessSeniority,
    notDgOrAdg,
    currentTheme,
    length,
    reloadList }) => {

    const netInfo = useNetInfo();

    const presentCharge = Charges(charge)

    const navigation = useNavigation();

    const { pmisId } = useContext(AuthContext);

    const { currentSelectedIds, setCurrentSelectedIds, setGroupIds, groupIds } = useContext(ThemeContext);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isCameraModalVisible, setCameraModalVisible] = useState(false);
    const [isBloodGroupUpdateVisible, setisBloodGroupUpdateVisible] = useState(false);
    const [isMobileUpdateVisible, setisMobileUpdateVisible] = useState(false);
    const [isEmailUpdateVisible, setisEmailUpdateVisible] = useState(false);
    const [isUpdatePostModalVisible, setisUpdatePostModalVisible] = useState(false);
    const [isAddToContactModalVisible, setisAddToContactModalVisible] = useState(false);
    const [phnOrMsg, setphnOrMsg] = useState('phn');
    const lastTapTimeRef = useRef(null);
    const [modalHeading, setmodalHeading] = useState('');
    const [isPlaying, setPlaying] = useState(false);
    const [isDataEditModalVisible, setisDataEditModalVisible] = useState(false);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);


    const toggleModal = (isVisible, type, heading) => {
        setphnOrMsg(type)
        setmodalHeading(heading)
        setModalVisible(isVisible);
    };

    const toggleCameraModal = (isVisible) => {
        setCameraModalVisible(isVisible);
    };

    const toggleBloodGroupModal = (isVisible) => {
        setisBloodGroupUpdateVisible(isVisible);
    };

    const toggleUpdateMobileModal = (isVisible) => {
        setisMobileUpdateVisible(isVisible);
    };

    const toggleUpdateEmailModal = (isVisible) => {
        setisEmailUpdateVisible(isVisible);
    };


    const togglePostModal = (isVisible) => {
        setisUpdatePostModalVisible(isVisible);
    };

    const toggleAddToContactModal = (isVisible) => {
        setisAddToContactModalVisible(isVisible);
    };


    const contact = {
        [Contacts.Fields.FirstName]: `BWDB - ${name}, `,
        [Contacts.Fields.LastName]: post,
        [Contacts.Fields.Company]: `BWDB`,
        [Contacts.Fields.PhoneNumbers]: [
            {
                number: mobile,
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




    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                    const contact = data[0];
                    // console.log(contact);
                }
            }
        })();
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const cameraStatus = await Camera.requestPermissionsAsync();
    //         setHasCameraPermission(cameraStatus.status === 'granted');
    //     })();
    // }, []);

    useEffect(() => {
        selectedPId = []
        setisSelected([])
    }, []);


    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }


    const [isSelected, setisSelected] = useState([]);

    const onSelect = (id) => {

        selectedPId = currentSelectedIds
        const ifIdExitsInSelectedPID = selectedPId.includes(id);
        // console.log(id);

        // console.log(ifIdExitsInSelectedPID);

        if (ifIdExitsInSelectedPID) {
            const index = selectedPId.indexOf(id);
            if (index > -1) {
                selectedPId.splice(index, 1);
            }

        }
        else {
            selectedPId.push(id)
        }

        setCurrentSelectedIds(selectedPId)
        //  setGroupIds([...groupIds, selectedPId])

        setisSelected([...isSelected, id])   // dummy state for updating ui



        selectedGroupIds = groupIds
        const ifIdExitsInSelectedGroupIds = selectedGroupIds.includes(id);

        if (ifIdExitsInSelectedGroupIds) {
            const gindex = selectedGroupIds.indexOf(id);
            if (gindex > -1) {
                selectedGroupIds.splice(gindex, 1);
            }

        }
        else {
            selectedGroupIds.push(id)
        }


        setGroupIds(selectedGroupIds)


    }



    const handleTap = () => {
        const now = new Date().getTime();
        const DOUBLE_TAP_DELAY = 1000; // Adjust as needed for your use case (in milliseconds)

        if (now - lastTapTimeRef.current < DOUBLE_TAP_DELAY) {
            // Double tap detected
            __DEV__ && console.log('Double tap!');
            togglePostModal(true)
        } else {
            // Single tap detected
            __DEV__ && console.log('Single tap!');
            // Toggle play/pause video
            onSelect(id)
            setPlaying(!isPlaying);
        }

        lastTapTimeRef.current = now;
    };


    return (

        <TouchableOpacity
            // disabled={true}
            style={{ marginBottom: adminLevel != 'superAdmin' ? height * .02 : 0 }}
            onPress={() => (onSelect(id))}
        >


            <View style={
                currentSelectedIds.includes(id) ?
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

                <View style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    // backgroundColor: pmisId === id ? `${currentTheme}40` : ''
                }}>


                    <TouchableOpacity
                        // style={{ backgroundColor: pmisId === id ? `${currentTheme}40` : '' }}  togglePostModal
                        // onPress={() => (onSelect(id))}   handleTap
                        // onPress={() => (handleTap())}
                        onPress={() => (togglePostModal(true))}


                        // disabled={adminLevel === 'superAdmin' ? false : true}
                        disabled={true}


                    >
                        {

                            photo ?

                                <View>
                                    {/* <TouchableOpacity
                                        onPress={async () => {



                                            await Contacts.addContactAsync(contact)
                                                .then((contactId) => {
                                                    alert("contactId --- " + contactId);
                                                })
                                                .catch((err) => {
                                                    alert(err);
                                                    __DEV__ && console.log(err);
                                                });
                                        }}

                                        style={{ position:'absolute', zIndex:100, }} >
                                        <Image
                                            style={{ height: width * .05, width: width * .05, elevation: 15 }}
                                            source={Images['plus-green']} />
                                    </TouchableOpacity> */}
                                    <Image style={[styles.logo,
                                    pmisId === id ? { borderWidth: 1, borderColor: `${currentTheme}50` } : '']}
                                        source={{ uri: "data:image/jpeg;base64," + photo }} />
                                </View>
                                :
                                <View>
                                    {/* <TouchableOpacity
                                        onPress={async () => {



                                            await Contacts.addContactAsync(contact)
                                                .then((contactId) => {
                                                    alert("contactId --- " + contactId);
                                                })
                                                .catch((err) => {
                                                    alert(err);
                                                    __DEV__ && console.log(err);
                                                });
                                        }}

                                        style={{ position: 'absolute', zIndex: 100, }} >
                                        <Image
                                            style={{ height: width * .05, width: width * .05, elevation: 15 }}
                                            source={Images['plus-green']} />
                                    </TouchableOpacity> */}
                                    <Image style={styles.place_holder_logo}
                                        source={Images['placeHolderImg']} >
                                    </Image>
                                </View>


                        }
                    </TouchableOpacity>



                    <View style={{
                        elevation: 3,
                        backgroundColor: `${currentTheme}`,
                        alignSelf: 'center', borderRadius: 5, borderColor: `${currentTheme}`, borderWidth: 1, marginTop: 5, width: width * (1 / 8.5)
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }} >{index + 1}</Text>
                    </View>
                </View>
                <View style={{
                    flex: 2, paddingHorizontal: 9, paddingVertical: 6, borderBottomColor: 'grey',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                    <View style={{ flex: 1, }}>

                        {
                            true && mobile &&
                            <View style={{
                                position: adminLevel === 'superAdmin' && canAccessSeniority === 'true' ? 'absolute' : 'relative',
                                justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2
                            }}>
                                <View style={{ flex: 1 }}></View>


                                {
                                    false &&
                                    <TouchableOpacity style={{ padding: 2, elevation: 0, borderRadius: height * .009, }}
                                        onPress={() => toggleCameraModal()}
                                    >
                                        <Image
                                            source={Images['video-call']}
                                            style={{ height: imgSizeMini * 1.2, width: imgSizeMini * 1.5 }}
                                        />
                                    </TouchableOpacity>
                                }

                                {
                                    false &&
                                    <TouchableOpacity style={{ padding: 2, elevation: 0, borderRadius: height * .009, }}>
                                        <Image
                                            source={Images['chat']}
                                            style={{ height: imgSizeMini * 1, width: imgSizeMini * 1.1 }}
                                        />
                                    </TouchableOpacity>
                                }

                            </View>
                        }

                        <View style={{ flex: 1, flexDirection: 'row' }}>


                            <View style={{}} >
                                {
                                    // presentOfficeCode === 30 ?
                                    adminLevel === 'superAdmin' && canAccessSeniority === 'true' ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('Biodata', { id: id })
                                            }}>
                                                <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#40696A', }}>PMIS ID   : {id}</Text>


                                            </TouchableOpacity>

                                        </View>
                                        : null
                                }
                                {
                                    notDgOrAdg && adminLevel === 'superAdmin' && canAccessSeniority === 'true' ?
                                        <View style={{ justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: txtSizeNormal, fontFamily: 'serif', color: '#40696A', }}>Seniority : {seniority}</Text>
                                            {
                                                bwdbJoiningDt &&
                                                <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#4F7942', }}>Joining Date : {bwdbJoiningDt.toString()}</Text>
                                            }
                                            {
                                                retiredate &&
                                                <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#EF867B', }}>PRL Date       : {retiredate.toString()}</Text>
                                            }
                                            {/*bwdbJoiningDt <Text style={{ fontSize: txtSizeNormal, fontFamily: 'serif', color: '#E8867B', }}>Retire Date : {item.officeAddress}</Text> */}

                                        </View>
                                        : ""
                                }
                            </View>

                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: txtSizeBig, fontFamily: Platform.OS === "android" ? 'serif' : null, fontWeight: 'bold' }} >{name} </Text>
                            {/* <TouchableOpacity
                                onPress={async () => {

                                    const contact = {
                                        [Contacts.Fields.FirstName]: name,
                                        [Contacts.Fields.LastName]: '',
                                        [Contacts.Fields.Company]: 'BWDB',
                                        [Contacts.Fields.PhoneNumbers]: [
                                            {
                                                number: mobile,
                                                isPrimary: true,
                                                digits: "1234567890",
                                                countryCode: "880",
                                                id: 'mob-' + id,
                                                label: "mobile",

                                            },
                                        ],
                                        [Contacts.Fields.Emails]: [
                                            {
                                                email: email,
                                                isPrimary: true,
                                                id: 'emil-' + id,
                                                label: "mobile",
                                            },
                                        ],
                                    };


                                    await Contacts.addContactAsync(contact)
                                        .then((contactId) => {
                                            alert("contactId --- " + contactId);
                                        })
                                        .catch((err) => {
                                            alert(err);
                                            __DEV__ && console.log(err);
                                        });
                                }}

                                style={{  zIndex: 100, }} >
                                <Image
                                    style={{ height: width * .05, width: width * .05, elevation: 15 }}
                                    source={Images['plus-green']} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={{}} >
                            <Image

                                style={{

                                    marginLeft: width * .2,

                                    opacity: 0.2,
                                    width: width * (1 / 6.5),
                                    height: width * (1 / 6.5),
                                    borderRadius: 100,
                                    borderWidth: 1,
                                    position: 'absolute',
                                    // elevation: 5

                                }}
                                source={Images['bwdLogo']} >

                            </Image>
                        </View>
                        <View style={{ flex: 1, }}>
                            {

                                charge === 'C' && designation === 'DIRECTOR GENERAL' ?
                                    <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'black', fontWeight: '600' }}>DE : Addl. DIRECTOR GENERAL</Text>
                                    :
                                    name === 'DR. SULTAN AHAMMED' && designation === 'PRINCIPAL EXTENSION OFFICER (CD)' ?
                                        <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'black', fontWeight: '600' }}>DE : SR. SOIL SCIENTIST (R)</Text>
                                        :
                                        <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'black', fontWeight: '600' }}>DE: {designation} </Text>


                            }


                        </View>

                        <View style={{ flex: 1, }}>
                            <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'grey', }}>{office}</Text>
                        </View>
                        {
                            post ?
                                <View style={{ flex: 1, }}>
                                    <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#f08080', fontWeight: '600' }}>PO: {post} {presentCharge} </Text>
                                </View>
                                :
                                charge === 'C' ?
                                    <View style={{ flex: 1, }}>
                                        <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'orange', fontWeight: '600' }}>PO: {higherPost} {presentCharge} </Text>
                                    </View>
                                    : charge === 'R' ?
                                        <View style={{ flex: 1, }}>
                                            <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: 'orange', fontWeight: '600' }}>PO: {designation} {presentCharge} </Text>
                                        </View>
                                        : ''
                        }

                    </View>

                    {
                        email &&
                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ flex: 1, }} onPress={() => { Linking.openURL(`mailto:${email}`) }}  >
                                <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#5f9ea0', }}>{email} ✉️</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flex: .13,
                                // marginHorizontal: width * .02,
                            }}>
                                {


                                    pmisId === id &&
                                    <TouchableOpacity

                                        onPress={() => (netInfo.isConnected ? toggleUpdateEmailModal(true) : ToastOrAlert('Please Check Your Internet Connection'))}
                                        style={{
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: `${currentTheme}`,
                                            borderRadius: height * .005,
                                            paddingVertical: 2,
                                            paddingHorizontal: 5,
                                            elevation: 3
                                        }}>
                                        <Text style={{ color: 'white', fontSize: height * .015, fontStyle: 'italic' }} >Edit</Text>

                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        netInfo.isConnected &&
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, color: '#A80000', }} >Blood Group : {blood}</Text>
                            </TouchableOpacity>



                        </View>}


                    <View style={{ flexDirection: "row-reverse", marginTop: 3 }}>

                        {
                            mobile &&
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    // onLongPress={() => (<>  < ModalViewForEditNumber viewModal={true} name={mobile} />    </>)}     onPress={() => { Linking.openURL(`tel:${mobile}`) }}
                                    onPress={() => (toggleModal(true, 'phn', 'Make a Call'))}
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        backgroundColor: `${currentTheme}`,
                                        borderRadius: height * .005,
                                        marginHorizontal: 5,
                                        paddingVertical: 1,
                                        paddingHorizontal: 5,
                                        elevation: 3
                                    }}>
                                    <Ionicons style={{ marginRight: 5 }} name="call-outline" size={txtSizeNormal} color="white" />
                                    <Text style={{ color: 'white', height: height * (1 / 40), fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, }}>{mobile} </Text>
                                </TouchableOpacity>

                                {
                                    pmisId === id &&
                                    <TouchableOpacity
                                        onPress={() => (netInfo.isConnected ? toggleUpdateMobileModal(true) : ToastOrAlert('Please Check Your Internet Connection'))}
                                        style={{
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: `${currentTheme}`,
                                            borderRadius: height * .005,
                                            // marginHorizontal: 5,
                                            paddingVertical: 1,
                                            paddingHorizontal: 5,
                                            elevation: 3
                                        }}>
                                        <Text style={{ color: 'white', fontSize: height * .015, fontStyle: 'italic' }} >Edit</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        }
                        {
                            pabx &&
                            <TouchableOpacity onPress={() => { Linking.openURL(`tel:022222${pabx}`) }}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 10,
                                    elevation: 3
                                }}>
                                <Ionicons style={{ marginRight: 5 }} name="call-outline" size={txtSizeNormal} color="white" />
                                <Text style={{ color: 'white', height: height * (1 / 40), fontSize: txtSizeNormal, fontFamily: Platform.OS === "android" ? 'serif' : null, }}>{pabx} </Text>
                            </TouchableOpacity>
                        }
                        {
                            mobile &&
                            <TouchableOpacity
                                //toggleModal(true)
                                onPress={() => (toggleModal(true, 'msg', 'Send a Message'))}
                                // onPress={() => (Linking.openURL(`sms:${mobile}`))}
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: `${currentTheme}`,
                                    borderRadius: height * .005,
                                    marginHorizontal: 5,
                                    paddingVertical: 1,
                                    paddingHorizontal: 12,
                                    elevation: 3
                                }}>
                                <MaterialCommunityIcons name="android-messages" style={{ marginRight: 5 }} size={txtSizeNormal} color="white" />
                            </TouchableOpacity>
                        }



                        {
                            mobile &&
                            <TouchableOpacity
                                    onPress={
                                        () => (toggleAddToContactModal(true, 'msg', 'Send a Message'))

                                    //     async () => {


                                    // //
                                    // await Contacts.addContactAsync(contact)
                                    //     .then((contactId) => {
                                    //         ToastOrAlert(name + " has been successfully added to your phone contact")
                                    //     })
                                    //     .catch((err) => {
                                    //         alert(err);
                                    //         __DEV__ && console.log(err);
                                    //     });
                                    //     }

                                    }

                                style={{ zIndex: 100, justifyContent: 'center' }} >
                                <Image
                                    style={{ height: width * .05, width: width * .05, elevation: 15 }}
                                    source={Images['plus-green']} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>


            {/**********************************************  MODALS **********************************************************/}

            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => toggleModal(true)}
            >
                <MakeCallModalComponent number={mobile} toggleModal={toggleModal} type={phnOrMsg} heading={modalHeading} />

            </Modal>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isAddToContactModalVisible}
                onRequestClose={() => toggleAddToContactModal(true)}
            >
                <AddToContactModal mobileNumber={mobile} email={email} toggleModal={toggleAddToContactModal} empName={name} post={post} heading="" />

            </Modal>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isCameraModalVisible}
                onRequestClose={() => toggleCameraModal(true)}
            >

                <CameraModalComponent toggleModal={toggleCameraModal} photo={photo} />
            </Modal>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isBloodGroupUpdateVisible}
                onRequestClose={() => toggleBloodGroupModal(true)}
            >

                <UpdateBloodGroupModalComponent id={id} currentGroup={blood} toggleModal={toggleBloodGroupModal} refreshList={reloadList} />
            </Modal>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isMobileUpdateVisible}
                onRequestClose={() => toggleUpdateMobileModal(true)}
            >

                <UpdateMobileNumberModalComponent id={id} currentMobileNumber={mobile} toggleModal={toggleUpdateMobileModal} refreshList={reloadList} />
            </Modal>

            <Modal
                transparent={true}
                animationType="fade"
                visible={isEmailUpdateVisible}
                onRequestClose={() => toggleUpdateEmailModal(true)}
            >

                <UpdateEmailModalComponent id={id} currentMobileNumber={email} toggleModal={toggleUpdateEmailModal} refreshList={reloadList} />
            </Modal>


            <Modal
                transparent={true}
                animationType="fade"
                visible={isUpdatePostModalVisible}
                onRequestClose={() => togglePostModal(true)}
            >

                <UpdatePostModalComponent id={id} name={name} desig={designation} officeId={officeid} toggleModal={togglePostModal} refreshList={reloadList} />
            </Modal>


            {/**********************************************  MODALS **********************************************************/}



        </TouchableOpacity>
    )
}









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
        // elevation: 20


    },
    place_holder_logo: {
        width: width * (1 / 5.5),
        height: width * (1 / 5.5),
        borderRadius: 100,
        backgroundColor: "pink",
        borderWidth: 1,
        borderColor: '#6750a4',
        // elevation: 5


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
        // elevation: 5,
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




export default memo(Item);