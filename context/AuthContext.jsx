import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../api/api';
import db from '../database/database'
import { createEmployeeInfoTable } from '../database/CreateQueries'
import { insertDataIntoEmployeeInfoTable } from '../database/InsertQueries'
import { getEmployeeInfo, getAllTableName } from '../database/SelectQueries'

let tempUserInfo = []

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isSplashLoading, setSplashLoading] = useState(false);
    const [name, setName] = useState()
    const [pmisId, setPmisId] = useState();
    const [isLogged, setisLogged] = useState(false)
    const [photo, setphoto] = useState()
    const [presentDesig, setpresentDesig] = useState()
    const [presentOffice, setpresentOffice] = useState()
    const [presentPost, setpresentPost] = useState()
    const [presentCharge, setpresentCharge] = useState()
    const [officeAddres, setofficeAddres] = useState()
    const [presentOfficeCode, setpresentOfficeCode] = useState()
    const [designationContext, setDesignationContext] = useState([]);

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

            setUserInfo(tempUserInfo);
            setisLogged(true)


        }


    }

    const login = async (id, password) => {
        setIsLoading(true);



        // console.log('lkklklk');

        // const tablenames = await getAllTableName()

        // const tableNames = tablenames.map((table) => table.name);
        // // console.log(tableNames);

        // const tableExists = tableNames.includes('employeeInfo');


        // if (tableExists) {
        //     console.log("tableExists", tableExists);
        //     const empInfo = await getEmployeeInfo("employeeInfo")

        //     idCheckAndLogin(empInfo, id)

        // }
        // else {
        //     const { data: response } = await api.get("allEmpInfo");
        //     const empData = response.rows

        //     console.log("in not exits employeeInfo table");

        //     createEmployeeInfoTable("employeeInfo")
        //     insertDataIntoEmployeeInfoTable("employeeInfo", empData)

        //     idCheckAndLogin(empData, id)

        // }

        // await AsyncStorage.setItem('userInfo', JSON.stringify(tempUserInfo));




        // setIsLoading(false);





        api
            .get("userinfo", {
                params: {
                    id: id
                }
            })
            .then(async (res) => {
                const userData = res.data.rows;

                console.log(userData);


                // __DEV__ && console.log('Length  ------------- ' + userData.rows.length);
                if (userData.length === 0) {
                    ToastAndroid.show('PMIS ID IS NOT CORRECT', ToastAndroid.SHORT);
                    setisLogged(false)
                    setUserInfo([])
                    // __DEV__ && console.log(userData.rows)
                }
                else if (userData[0].status === 'I') {
                    // __DEV__ && console.log(userData.rows);
                    ToastAndroid.show('INACTIVE', ToastAndroid.LONG,);
                    setisLogged(false)
                    setUserInfo([])

                }
                else {
                    // __DEV__ && console.log(userData.rows)
                    setUserInfo(userData);
                    setisLogged(true)


                }



                await AsyncStorage.setItem('userInfo', JSON.stringify(userData));




                setIsLoading(false);
            })
            .catch(e => {
                __DEV__ && console.log(`login error ${e}`);
                setIsLoading(false);
            });
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
        AsyncStorage.removeItem('userInfo');

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
                    designationContext, setDesignationContext
                }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
