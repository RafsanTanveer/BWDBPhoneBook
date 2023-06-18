import React, { createContext, useState } from 'react';


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [themes, setthemes] = useState(
        ['#6750a4', '#4F46E5', '#1DA1F2', '#048BB3', '#4E34E1',
            '#2782BF', '#0089E3', '#034782', '#637C16', '#0069C4','#FF0000'])

    const [currentTheme, setcurrentTheme] = useState(themes[3])  // 0 3 6 9

    const [currentSelectedIds, setCurrentSelectedIds] = useState([])

    const [filterdataContext, setfilterdataContext] = useState([])

    const [groupIds, setGroupIds] = useState([]);

    const setTheme = (themeNo) => { }



    return (
        <>
            <ThemeContext.Provider
                value={{
                    themes, currentTheme, setcurrentTheme,
                    currentSelectedIds, setCurrentSelectedIds,
                    filterdataContext, setfilterdataContext,
                    groupIds, setGroupIds
                }}>
                {children}
            </ThemeContext.Provider>
        </>
    );
};
