import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import DrawerContent from "../navigation/DrawerContent";
import DesignationScreen from '../screens/DesignationScreen';
import OfficeScreen from "../screens/OfficeScreen";
import Home from "../screens/Home";
import { StatusBar } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from '../context/ThemeContext';
import BiodataScreen from "../screens/BiodataScreen";
import Biodata from "../screens/Biodata";

import Login from "../screens/Login";

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    const { currentTheme } = useContext(ThemeContext);

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle:
                {
                    backgroundColor: 'white'
                    // backgroundColor: `${currentTheme}`,
                },
            }}

            drawerContent={(props) => <DrawerContent {...props} />}>

            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="OfficeScreen" component={OfficeScreen} />
            <Drawer.Screen name="DesignationScreen" component={DesignationScreen} />
            <Drawer.Screen name="BiodataScreen" component={BiodataScreen} />
            <Drawer.Screen name="Biodata" component={Biodata} />
            
        </Drawer.Navigator>
    );
};


const CustomNavigator = () => {

    const { isLogged, isLoading } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);


    return (
        <>
            {/* <Login /> */}
            <NavigationContainer>
                {isLogged  ?
                    <>
                        <StatusBar animated={true} backgroundColor={currentTheme} />
                        <CustomDrawer />
                    </>
                    :
                    <Login />
                }
            </NavigationContainer>
        </>
    )
}

export default CustomNavigator