import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid, Platform } from 'react-native';
import api from '../api/api';
import db from '../database/database'
import { createEmployeeInfoTable, createLoginHistoryTable } from '../database/CreateQueries'
import { insertDataIntoEmployeeInfoTable, insertLoginHistoryTable } from '../database/InsertQueries'
import { getEmployeeInfo, getAllTableName } from '../database/SelectQueries'
import { isTableAvailable } from '../utility/CheckTableAvailableorNot';
import { useNetInfo } from "@react-native-community/netinfo";
import { ToastOrAlert } from '../utility/ToastOrAlert';

let tempUserInfo = []
let msgBetweenFn = false

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const netInfo = useNetInfo();

    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isSplashLoading, setSplashLoading] = useState(false);
    const [name, setName] = useState()
    const [pmisId, setPmisId] = useState();
    const [isLogged, setisLogged] = useState(false)
    const [isPreloaing, setisPreloaing] = useState(false);
    const [photo, setphoto] = useState()
    const [presentDesig, setpresentDesig] = useState()
    const [presentOffice, setpresentOffice] = useState()
    const [presentPost, setpresentPost] = useState()
    const [presentCharge, setpresentCharge] = useState()
    const [officeAddres, setofficeAddres] = useState()
    const [presentOfficeCode, setpresentOfficeCode] = useState()
    const [postGrade, setpostGrade] = useState();
    const [designationContext, setDesignationContext] = useState([]);
    const [officelevel1code, setofficelevel1code] = useState();
    const [adminLevel, setadminLevel] = useState();
    const [canCallBulk, setcanCallBulk] = useState();
    const [canAccessSeniority, setcanAccessSeniority] = useState();

    ////////////////////////// General ////////////////////////
    const [generalPresentOffice, setgeneralPresentOffice] = useState()
    const [generalPresentPost, setgeneralPresentPost] = useState()

    const [isAdmin, setisAdmin] = useState()




    const register = (name, email, password) => {
        setIsLoading(true);

        api
            .post(`${BASE_URL}/register`, {
                params: {
                    id: '920219001'
                }
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                // __DEV__ && console.log(userInfo);
            })
            .catch(e => {
                // __DEV__ && console.log(`register error ${e}`);
                setIsLoading(false);
            });
    };




    const checkCredential = (empInfo, id, password) => {

        const temp = []

        empInfo.map((emp) => {
            if (emp.id === id) {
                temp.push(emp)
            }
        })

        if (temp.length != 0) {
            empInfo.map((emp) => {
                if (emp.id === id && emp.password === password) {
                    tempUserInfo.push(emp)
                }
            })

            if (tempUserInfo.length === 0) {
                ToastOrAlert('PASSWORD IS NOT CORRECT.')
                msgBetweenFn = true
                return false
            }
            else {
                return true
            }
        }
        else {
            return false
        }

    }



    const logIn_Unsuccessful = () => {
        setisLogged(false)
        setUserInfo([])
    }

    const logIn_Successful = async (userInfo) => {
        setUserInfo(userInfo);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setisLogged(true)

    }


    const getDataAndLogin = async (id, password) => {


        // const tempData = getEmpInfoFromApi(id, password)

        try {
            __DEV__ && console.log('::::: in getusercredential');
            const { data: response } = await api.get("getusercredential", {
                params: {
                    id: id,
                    pass: password
                }
            });
            const tempData = response.rows

            __DEV__ && console.log(':::::::::::::::::::::::::::::::::::::::::::::::::::   ' + tempData);
            if (tempData) {


                if (tempData[0].rec_status === 'I') {
                    ToastOrAlert('RETIRED')
                    logIn_Unsuccessful()
                }
                else {
                    insertLoginHistoryTable('loginHistory', tempData)
                    logIn_Successful(tempData)
                }

            }
            else {
                !msgBetweenFn && ToastOrAlert('PMIS ID or PASSWORD IS NOT CORRECT.')
                logIn_Unsuccessful()
            }
        } catch (error) {
            __DEV__ && console.log(error);
        }


    }

    const login = async (id, password) => {
        setIsLoading(true);

        __DEV__ && console.log('***************************************************************************************************************************');

        //////////********************************************** New Login ********************************************* */

        console.log(' in new log in ' + id, password);

        if (await isTableAvailable('loginHistory')) {
            __DEV__ && console.log('loginHistory exsits :::::::::::::::::::::::::::::::::');

            const empInfo = await getEmployeeInfo("loginHistory")
            __DEV__ && console.log('empInfo --- ',empInfo);
            if (checkCredential(empInfo, id, password)) {
               __DEV__ && console.log('-------------------------------------------------------------------------');
               __DEV__ && console.log('------------------------------login from table---------------------------');
               __DEV__ && console.log('-------------------------------------------------------------------------');
               __DEV__ && logIn_Successful(tempUserInfo)
            } else {

                __DEV__ && console.log('-------------------------------------------------------------------------');
                __DEV__ && console.log('------------------------------login from server---------------------------');
                __DEV__ && console.log('-------------------------------------------------------------------------');

                netInfo.isConnected && getDataAndLogin(id, password)
            }

        }
        else {
            console.log('loginHistory not exsits :::::::::::::::::::::::::::::::::');

            createLoginHistoryTable('loginHistory')
            getDataAndLogin(id, password)
        }





        //////////********************************************** New Login ********************************************* */

        __DEV__ && console.log('login id - ', id);


        // if (await isTableAvailable('employeeInfo')) {

        //     const empInfo = await getEmployeeInfo("employeeInfo")

        //     idCheckAndLogin(empInfo, id)

        // }
        // else {
        //     const { data: response } = await api.get("allEmpInfo", {
        //         params: {
        //             id: id
        //         }
        //     });
        //     const empData = response.rows

        //     console.log("in not exits employeeInfo table");

        //     createEmployeeInfoTable("employeeInfo")
        //     insertDataIntoEmployeeInfoTable("employeeInfo", empData)

        //     idCheckAndLogin(empData, id)

        // }










        setIsLoading(false);





        // api
        //     .get("userinfo", {
        //         params: {
        //             id: id
        //         }
        //     })
        //     .then(async (res) => {
        //         const userData = res.data.rows;

        //         console.log(userData);


        //         // __DEV__ && console.log('Length  ------------- ' + userData.rows.length);
        //         if (userData.length === 0) {
        //             ToastAndroid.show('PMIS ID IS NOT CORRECT', ToastAndroid.SHORT);
        //             setisLogged(false)
        //             setUserInfo([])
        //             // __DEV__ && console.log(userData.rows)
        //         }
        //         else if (userData[0].status === 'I') {
        //             // __DEV__ && console.log(userData.rows);
        //             ToastAndroid.show('INACTIVE', ToastAndroid.LONG,);
        //             setisLogged(false)
        //             setUserInfo([])

        //         }
        //         else {
        //             // __DEV__ && console.log(userData.rows)
        //             setUserInfo(userData);
        //             setisLogged(true)


        //         }



        //         await AsyncStorage.setItem('userInfo', JSON.stringify(userData));




        //         setIsLoading(false);
        //     })
        //     .catch(e => {
        //         __DEV__ && console.log(`login error ${e}`);
        //         setIsLoading(false);
        //     });
    };

    const logout = () => {

        setisLogged(false)
        setUserInfo([])
        setisAdmin(false)
        setName()
        setPmisId()
        setphoto()
        setofficeAddres()
        setpresentOfficeCode()
        setpresentPost()
        setpresentOffice()
        setDesignationContext([])
        tempUserInfo = []
        setpostGrade()
        AsyncStorage.removeItem('userInfo');
        setofficelevel1code()
        setadminLevel()
        setcanCallBulk()
        setcanAccessSeniority()

    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            __DEV__ && console.log('userinfo ', userInfo);
            if (userInfo) {
                setUserInfo(userInfo);
                setisLogged(true)
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            __DEV__ && console.log(`is logged in errorrr ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <>
            <AuthContext.Provider
                value={{
                    isLoading,
                    userInfo, setUserInfo,
                    isSplashLoading, setSplashLoading,
                    register,
                    login,
                    logout,
                    name,
                    isLogged, setisLogged,
                    name, setName,
                    pmisId, setPmisId,
                    photo, setphoto,
                    presentDesig, setpresentDesig,
                    presentOffice, setpresentOffice,
                    presentPost, setpresentPost,
                    presentCharge, setpresentCharge,
                    officeAddres, setofficeAddres,
                    presentOfficeCode, setpresentOfficeCode,
                    generalPresentOffice, setgeneralPresentOffice,
                    generalPresentPost, setgeneralPresentPost,
                    isAdmin, setisAdmin,
                    designationContext, setDesignationContext,
                    postGrade, setpostGrade,
                    officelevel1code, setofficelevel1code,
                    adminLevel, setadminLevel,
                    canCallBulk, setcanCallBulk,
                    canAccessSeniority, setcanAccessSeniority,
                    isPreloaing, setisPreloaing
                }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
