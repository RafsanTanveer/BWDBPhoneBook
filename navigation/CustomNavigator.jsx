import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";
import DrawerContent from "../navigation/DrawerContent";
import DesignationScreen from '../screens/DesignationScreen';
import DesignationScreenOther from '../screens/DesignationScreenOther';
import BloodScreen from '../screens/BloodScreen'
import OfficeScreen from "../screens/OfficeScreen";
import ChangePasswordScreen from '../screens/ChangePasswordScreen'
import AboutScreen from '../screens/AboutScreen'
import Home from "../screens/Home";
import { StatusBar, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from '../context/ThemeContext';
import BiodataScreen from "../screens/BiodataScreen";
import Biodata from "../screens/Biodata";
import Login from "../screens/Login";
import { Images } from '../utility/Images';
import DataRenderOffice from '../data/DataRenderOffice'
import ReportScreen from '../screens/ReportScreen'
import SplashScreen from '../screens/SplashScreen'
import { useState, useEffect } from "react";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let homeScreenTitle = ''

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ }) => {
    const { currentTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const { userInfo, photo } = useContext(AuthContext);

    homeScreenTitle = userInfo.length != 0 && userInfo[0].int_ext != 'E' ? 'Bio-data' : 'Welcome to BWDB'

    return (
        <Drawer.Navigator

            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#c6cbef',
                    width: width * .8,
                },

                headerTintColor: 'white',
                headerShown: true,
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>

                        <Image
                            source={require('../assets/icons/menu-icon.png')}
                            style={{ height: 28, width: 28, marginLeft: 10 }}
                        />

                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>

                        {

                            photo ?
                                <Image
                                    style={{ height: width * .1, width: width * .1, borderRadius: 70, marginRight: 10 }}
                                    source={{ uri: "data:image/jpeg;base64," + photo }}
                                /> :
                                userInfo.length != 0 && userInfo[0].int_ext != 'E' &&
                                <Image
                                    style={{ height: width * .1, width: width * .1, borderRadius: 70, marginRight: 10 }}
                                    source={Images['placeHolderImg']}
                                />
                        }


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

            <Drawer.Screen name="Home" options={{ headerTitleAlign: "center", title: homeScreenTitle, }} component={Home} />
            <Drawer.Screen name="OfficeScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={OfficeScreen} />
            <Drawer.Screen name="DesignationScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={DesignationScreen} />
            <Drawer.Screen name="BloodScreen" options={{ headerTitleAlign: "center", title: "BloodScreen", }} component={BloodScreen} />
            <Drawer.Screen name="BiodataScreen" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={BiodataScreen} />
            <Drawer.Screen name="Biodata" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={Biodata} />
            <Drawer.Screen name="DesignationScreenOther" options={{ headerTitleAlign: "center", title: "Bio-data", }} component={DesignationScreenOther} />
            <Drawer.Screen name="ReportScreen" options={{ headerTitleAlign: "center", title: "Report", }} component={ReportScreen} />
            <Drawer.Screen name="ChangePasswordScreen" options={{ headerTitleAlign: "center", title: "Change Password", }} component={ChangePasswordScreen} />
            <Drawer.Screen name="AboutScreen" options={{ headerTitleAlign: "center", title: "About", }} component={AboutScreen} />

        </Drawer.Navigator>
    );
};

//ChangePasswordScreen
const CustomNavigator = () => {

    const { isLogged, isLoading, isPreloaing } = useContext(AuthContext);
    const { currentTheme } = useContext(ThemeContext);

    const [isSplashScreenLoading, setSplashScreenLoading] = useState(true);
    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
            setSplashScreenLoading(false);
        }, 6000); // Adjust the time as needed
    }, []);

    //{/* {isLoading ? <SplashScreen /> : <CustomNavigator />} */}
    return (
        <>
            {/* <Login /> */}
            <NavigationContainer>
                {
                    isLogged ?
                        <>
                            {isPreloaing ?
                                <SplashScreen />
                                :
                                <>
                                    <StatusBar animated={true} backgroundColor={currentTheme} />
                                    <CustomDrawer />
                                </>}
                        </>
                        : <Login />
                }
            </NavigationContainer>
        </>
    )
}

export default CustomNavigator
