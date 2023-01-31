import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import api from '../api/api';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [themes, setthemes] = useState(['#6750a4', '#4F46E5', '#1DA1F2', '#048BB3', '#4E34E1', '#2782BF', '#F70000', '#0089E3', '#034782','#637C16'])
    const [themesOpacity, setthemesOpacity] = useState(['#6750a4', '#4F46E5', '#1DA1F2', '#048BB3', '#4E34E1', '#2782BF', '#F70000', '#0089E3', '#034782'])

    const [currentTheme, setcurrentTheme] = useState(themes[0])

    const setTheme = (themeNo) => { }

    

    return (
        <>
            <ThemeContext.Provider
                value={{
                    themes, currentTheme, setcurrentTheme
                }}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};
