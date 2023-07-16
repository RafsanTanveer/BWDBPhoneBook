import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../api/api';


export const DataContext = createContext();

export const DataProvider = ({ children }) => {


    const [currentSelectedIds, setCurrentSelectedIds] = useState([]);

    
    return (
        <>
            <DataContext.Provider
                value={{
                    currentSelectedIds, setCurrentSelectedIds
                }}>
                {children}
            </DataContext.Provider>
        </>
    );
};
