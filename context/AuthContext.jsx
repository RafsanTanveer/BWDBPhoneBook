import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../api/api';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [name, setName] = useState()
    const [isLogged, setisLogged] = useState(false)
    const [photo, setphoto] = useState()
    const [desig, setDesig] = useState()
    const [office, setOffice] = useState()


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
                console.log(userInfo);
            })
            .catch(e => {
                console.log(`register error ${e}`);
                setIsLoading(false);
            });
    };

    const login = (id, password) => {
        setIsLoading(true);

        api
            .get("userinfo", {
                params: {
                    id: id
                }
            })
            .then(res => {
                const userData = res.data;
               
                

                console.log('Length  ------------- '+userData.rows.length);
                if (userData.rows.length === 0) {
                    ToastAndroid.show('PMIS ID IS NOT CORRECT', ToastAndroid.SHORT);
                    setisLogged(false)
                    setUserInfo([])
                    console.log(userData.rows)
                }
                else if (  userData.rows[0].status === 'I') {
                    console.log(userData.rows);
                    ToastAndroid.show('INACTIVE', ToastAndroid.LONG,);
                    setisLogged(false)
                    setUserInfo([])
                   
                 }
                else
                {
                    console.log(userData.rows)
                    setUserInfo(userData);
                    setisLogged(true)
                }

                 AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

    const logout = () => {
        
        setisLogged(false)
        setUserInfo([])
        AsyncStorage.removeItem('userInfo');
        // api
        //     .post(
        //         `${BASE_URL}/logout`,
        //         {},
        //         {
        //             headers: { Authorization: `Bearer ${userInfo.access_token}` },
        //         },
        //     )
        //     .then(res => {
        //         console.log(res.data);
        //         AsyncStorage.removeItem('userInfo');
        //         setUserInfo({});
        //         setIsLoading(false);
        //     })
        //     .catch(e => {
        //         console.log(`logout error ${e}`);
        //         setIsLoading(false);
        //     });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
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
                    userInfo,
                    splashLoading,
                    register,
                    login,
                    logout,
                    name,
                    isLogged,
                    name, setName,
                    photo, setphoto,
                    desig, setDesig,
                    office, setOffice
                }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
