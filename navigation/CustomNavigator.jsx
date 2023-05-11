import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";
import DrawerContent from "../navigation/DrawerContent";
import DesignationScreen from '../screens/DesignationScreen';
import OfficeScreen from "../screens/OfficeScreen";
import Home from "../screens/Home";
import { StatusBar, TouchableOpacity, Text, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from '../context/ThemeContext';
import BiodataScreen from "../screens/BiodataScreen";
import Biodata from "../screens/Biodata";



import Login from "../screens/Login";

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ }) => {
    const { currentTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Drawer.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerShown: true,
                headerLeft: () => (
                    <TouchableOpacity style={{marginLeft:5}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>

                        <Image
                            source={require('../assets/icons/menu-icon.png')}
                            style={{height:28, width:28, marginLeft:10}}
                        />

                    </TouchableOpacity>
                ),
                headerStyle:
                {
                    // backgroundColor: 'white'
                    backgroundColor: `${currentTheme}`,

                },
                headerTitleStyle: {
                    color: 'white',
                    textAlign: "center",


                }
            }}

            drawerContent={(props) => <DrawerContent {...props} />}>

            <Drawer.Screen name="Home" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={Home} />
            <Drawer.Screen name="OfficeScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={OfficeScreen} />
            <Drawer.Screen name="DesignationScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={DesignationScreen} />
            <Drawer.Screen name="BiodataScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={BiodataScreen} />
            <Drawer.Screen name="Biodata" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={Biodata} />

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
                {isLogged ?
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