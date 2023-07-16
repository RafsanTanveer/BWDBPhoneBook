import { DrawerToggleButton, createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation, DrawerActions } from "@react-navigation/native";
import React, { useContext } from "react";
import DrawerContent from "../navigation/DrawerContent";
import DesignationScreen from '../screens/DesignationScreen';
import OfficeScreen from "../screens/OfficeScreen";
import Home from "../screens/Home";
import { StatusBar, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from '../context/ThemeContext';
import BiodataScreen from "../screens/BiodataScreen";
import Biodata from "../screens/Biodata";
import Login from "../screens/Login";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


const Drawer = createDrawerNavigator();

const CustomDrawer = ({ }) => {
    const { currentTheme } = useContext(ThemeContext);
    const navigation = useNavigation();
    const { photo } = useContext(AuthContext);

    return (
        <Drawer.Navigator

            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#c6cbef',
                    width: width * .7,
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

                        <Image
                            style={{ height: width * .1, width: width * .1, borderRadius: 70, marginRight: 10 }}
                            source={{ uri: "data:image/jpeg;base64," + photo }}
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
                    textAlign: "center"


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
                {/* {isLogged ? */}
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