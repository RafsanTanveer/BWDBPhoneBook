import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../api/api';
import db from '../database/database'
import { createEmployeeInfoTable, createLoginHistoryTable } from '../database/CreateQueries'
import { insertDataIntoEmployeeInfoTable, insertLoginHistoryTable } from '../database/InsertQueries'
import { getEmployeeInfo, getAllTableName } from '../database/SelectQueries'
import { isTableAvailable } from '../utility/CheckTableAvailableorNot';
import { useNetInfo } from "@react-native-community/netinfo";

let tempUserInfo = []

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

    const getEmpInfoFromApi = async (id, password) => {

        console.log('::::: in getusercredential');
        const { data: response } = await api.get("getusercredential", {
            params: {
                id: id,
                pass: password
            }
        });
        const empData = response.rows
        console.log('::::::::::::::::: in getusercredential  ' + empData);
        return empData
    }


    const checkCredential = (empInfo, id, password) => {

        empInfo.map((emp) => {
            if (emp.id === id && emp.password === password) {
                tempUserInfo.push(emp)
            }
        })

        if (tempUserInfo.length === 0) {
            ToastAndroid.show('PMIS ID or PASSWORD IS NOT CORRECT. ', ToastAndroid.SHORT);
            return false
        }

        return true

    }

    const checkAndLogin = (empInfo, id, password) => {

        if (checkCredential(empInfo, id, password)) {
            setUserInfo(tempUserInfo);
            setisLogged(true)
        }
        else {
            const data = getEmpInfoFromApi(id, password)
        }
    }

    const logIn_Unsuccessful = () => {
        setisLogged(false)
        setUserInfo([])
    }

    const logIn_Successful = (userInfo) => {
        setUserInfo(userInfo);
        setisLogged(true)

    }

    const idCheckAndLogin = (empInfo, id) => {


        empInfo.map((emp) => {
            if (emp.id === id) {
                tempUserInfo.push(emp)
            }
        })

        if (tempUserInfo.length === 0) {
            ToastAndroid.show('PMIS ID IS NOT CORRECT', ToastAndroid.SHORT);
            setisLogged(false)
            setUserInfo([])
        } else if (tempUserInfo[0].status === 'I') {

            ToastAndroid.show('RETIRED', ToastAndroid.LONG,);
            setisLogged(false)
            setUserInfo([])

        }
        else {
            __DEV__ && console.log('mmmmmmmmmmmmmmmmmmmmmmmmmmmm---------------------', id);

            createLoginHistoryTable('loginHistory')
            insertLoginHistoryTable('loginHistory', tempUserInfo)


            setUserInfo(tempUserInfo);
            setisLogged(true)


        }


    }

    const getDataAndLogin = async (id, password) => {


        // const tempData = getEmpInfoFromApi(id, password)


        console.log('::::: in getusercredential');
        const { data: response } = await api.get("getusercredential", {
            params: {
                id: id,
                pass: password
            }
        });
        const tempData = response.rows

        console.log(':::::::::::::::::::::::::::::::::::::::::::::::::::   ' + tempData);
        if (tempData) {


            if (tempData[0].rec_status === 'I') {
                ToastAndroid.show('RETIRED', ToastAndroid.LONG,);
                logIn_Unsuccessful()
            }
            else {
                insertLoginHistoryTable('loginHistory', tempData)
                logIn_Successful(tempData)
            }

        }
        else {
            ToastAndroid.show('PMIS ID or PASSWORD IS NOT CORRECT. ', ToastAndroid.SHORT);
            logIn_Unsuccessful()
        }
    }

    const login = async (id, password) => {
        setIsLoading(true);

        console.log('***************************************************************************************************************************');

        //////////********************************************** New Login ********************************************* */

        console.log(' in new log in ' + id, password);

        if (await isTableAvailable('loginHistory')) {
            console.log('loginHistory exsits :::::::::::::::::::::::::::::::::');

            const empInfo = await getEmployeeInfo("loginHistory")

            if (checkCredential(empInfo, id, password)) {
                logIn_Successful(tempUserInfo)
            } else {

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





        await AsyncStorage.setItem('userInfo', JSON.stringify(tempUserInfo));




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
