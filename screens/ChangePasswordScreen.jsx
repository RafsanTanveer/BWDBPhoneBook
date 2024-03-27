import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from "react";
import BiodataHeader from '../component/BiodataHeader'
import { height, width } from '../utility/ScreenDimensions'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import { Images } from '../utility/Images'
import { ToastOrAlert } from '../utility/ToastOrAlert'
import api from '../api/api'
import { updatePassword } from '../database/UpdateQueries'
import { deleteDataFromLoginHistoryTable } from '../database/DeleteQueries'
import { getAllInfoFromTable, getCurrentPassword } from '../database/SelectQueries'
const ChangePasswordScreen = () => {

    const { currentTheme, } = useContext(ThemeContext);
    const { pmisId } = useContext(AuthContext);

    const [currentPass, setcurrentPass] = useState('');
    const [showCurrentPass, setshowCurrentPass] = useState(false);

    const [newPass, setNewPass] = useState('');
    const [showNewPass, setshowNewPass] = useState(false);

    const [confirmNewPass, setConfirmNewPass] = useState('');
    const [showConfirmNewPass, setShowConfirmNewPass] = useState(false);


    const changePassword = async () => {
        // console.log(pmisId, '', newPass);

        const currentPasswordQueryResult = await getCurrentPassword(pmisId, 'loginHistory')
        const curPasswords = currentPasswordQueryResult.map((result) => result.password);
        // console.log('currentPassword', curPasswords[0]);
        const currentPassword = curPasswords[0]
        console.log(currentPassword);

        currentPass === currentPassword ?
            newPass ?
                confirmNewPass ?
                    newPass === confirmNewPass ?
                        await api.put(`updatePass/${pmisId}/${newPass}`)
                            .then(res => {

                                updatePassword(pmisId, newPass, 'loginHistory')
                                ToastOrAlert('password successfully updated')

                            })
                            .catch(err => console.log(err))
                        :
                        ToastOrAlert('New password and confirm password does not match')
                    :
                    ToastOrAlert('Please enter confirm password')
                :
                ToastOrAlert('Please enter new password')
            :
            ToastOrAlert('Current passord does not match')


        const loginHistory = await getAllInfoFromTable('loginHistory')


        __DEV__ && console.log(loginHistory);

        loginHistory.map((history) => console.log(history.id, history.password, history.rec_status, history.timestamp))

    }


    useEffect(() => {

        setcurrentPass('')
        setshowCurrentPass(false)

        setNewPass('')
        setshowNewPass(false)

        setConfirmNewPass('')
        setShowConfirmNewPass(false)

    }, []);


    return (
        <View style={{ flex: 1, }}>
            {/* <BiodataHeader heading='Change Your Password' /> */}
            <View style={{ paddingTop: width * .03, paddingHorizontal: width * .03 }} >
                <Text style={{ fontSize: width * .035, fontWeight: 'bold' }}>Your new password must be different from previous password</Text>
            </View>

            <View style={{ margin: width * .03 }} >
                <View style={{ paddingTop: 5 }} >
                    <Text style={{ padding: width * .025, fontSize: width * .035, fontWeight: 'bold' }}>Current password</Text>
                    <View style={{}} >
                        <TextInput
                            placeholder='Current password'
                            onChangeText={(text) => { setcurrentPass(text) }}
                            secureTextEntry={!showCurrentPass}
                            style={{
                                height: height / 20,
                                width: "97%",
                                borderRadius: 5,
                                marginBottom: 5,
                                marginLeft: 5,
                                borderColor: `${currentTheme}`,//'#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,
                                backgroundColor: 'white'
                            }}
                        />
                        {
                            currentPass &&
                                !showCurrentPass ?
                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setshowCurrentPass(!showCurrentPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['show']}
                                    />
                                </TouchableOpacity>
                                :

                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setshowCurrentPass(!showCurrentPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['hide']}
                                    />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ paddingTop: 5 }} >
                    <Text style={{ padding: width * .025, fontSize: width * .035, fontWeight: 'bold' }}>New password</Text>
                    <View style={{}} >
                        <TextInput
                            placeholder='New password'
                            onChangeText={(text) => { setNewPass(text) }}
                            secureTextEntry={!showNewPass}
                            style={{
                                height: height / 20,
                                width: "97%",
                                borderRadius: 5,
                                marginBottom: 5,
                                marginLeft: 5,
                                borderColor: `${currentTheme}`,//'#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,
                                backgroundColor: 'white'
                            }}
                        />
                        {
                            newPass &&
                                !showNewPass ?
                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setshowNewPass(!showNewPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['show']}
                                    />
                                </TouchableOpacity>
                                :

                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setshowNewPass(!showNewPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['hide']}
                                    />
                                </TouchableOpacity>
                        }
                    </View>
                </View>

                <View style={{ paddingTop: 5 }} >
                    <Text style={{ padding: width * .025, fontSize: width * .035, fontWeight: 'bold' }}>Confirm password</Text>
                    <View style={{}} >
                        <TextInput
                            placeholder='Confirm password'
                            onChangeText={(text) => { setConfirmNewPass(text) }}
                            secureTextEntry={!showConfirmNewPass}
                            style={{
                                height: height / 20,
                                width: "97%",
                                borderRadius: 5,
                                marginBottom: 5,
                                marginLeft: 5,
                                borderColor: `${currentTheme}`,//'#6750a4',
                                borderWidth: 2,
                                paddingLeft: 15,
                                backgroundColor: 'white'
                            }}
                        />
                        {
                            confirmNewPass &&
                                !showConfirmNewPass ?
                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setShowConfirmNewPass(!showConfirmNewPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['show']}
                                    />
                                </TouchableOpacity>
                                :

                                <TouchableOpacity
                                    style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        marginTop: height * .01,
                                        paddingRight: height * .015


                                    }}
                                    onPress={() => { setShowConfirmNewPass(!showConfirmNewPass) }}
                                >
                                    <Image
                                        style={{
                                            height: width * .06,
                                            width: width * .06,
                                        }}
                                        source={Images['hide']}
                                    />
                                </TouchableOpacity>
                        }
                    </View>
                </View>

            </View>

            <View style={{ marginHorizontal: width * .03 }} >
                <Text style={{ fontSize: width * .035, fontWeight: 'bold' }} >The new password must satisfy the password policy.</Text>
            </View>

            <View style={{ marginHorizontal: 20, marginVertical: width * .025 }} >
                <View style={{ flexDirection: 'row', marginVertical: width * .015 }} >
                    <Text style={{ flex: 1, fontWeight: 'bold' }} >⩥</Text>
                    <Text style={{ flex: 10, fontWeight: 'bold' }} >The password must have at least 06 characters</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: width * .015 }} >
                    <Text style={{ flex: 1, fontWeight: 'bold' }} >⩥</Text>
                    <Text style={{ flex: 10, fontWeight: 'bold' }} >The password must contain at leat 1 special character, such as &, %, $ etc.</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: width * .015 }} >
                    <Text style={{ flex: 1, fontWeight: 'bold' }} >⩥</Text>
                    <Text style={{ flex: 10, fontWeight: 'bold' }} >The password must contain at leat 3 different kind of character, such as uppercase letter, lowercase letter, numeric digits, and punctuation marks.</Text>
                </View>


            </View>


            <TouchableOpacity
                onPress={() => { changePassword() }}
                style={{
                    backgroundColor: `${currentTheme}`,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderRadius: height * .012,
                    marginHorizontal: 5,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    justifyContent: 'center', bottom: 10,
                    width: width * .9,
                    alignSelf: 'center',
                    position: "relative",
                    marginTop: height * .045
                }} >
                <Text style={{ fontSize: height * .02, textAlign: 'center', paddingVertical: 5, fontWeight: 'bold', color: 'white' }} >Change Password</Text>
            </TouchableOpacity>



        </View>
    )
}

export default ChangePasswordScreen