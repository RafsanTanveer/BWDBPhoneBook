import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import DrawerContent from "../navigation/DrawerContent";
import ACE from "../screens/civil/ACE";
import AE from "../screens/civil/AE";
import CE from "../screens/civil/CE";
import SDE from "../screens/civil/SDE";
import SE from "../screens/civil/SE";
import XEN from "../screens/civil/XEN";
import Home from "../screens/Home";
import { StatusBar } from "react-native";

import AP from "../screens/computer/AP";
import PROG from "../screens/computer/PROG";
import SA from "../screens/computer/SA";
import SSA from "../screens/computer/SSA";

import AD from "../screens/admin/AD";
import DD from "../screens/admin/DD";
import Director from "../screens/admin/Director";
import ADFAA from "../screens/faa/ADFAA";
import AdlDFAA from "../screens/faa/AdlDFAA";
import Controller from "../screens/faa/Controller";
import DDFAA from "../screens/faa/DDFAA";
import DirectorFAA from "../screens/faa/DirectorFAA";
import DDGeology from "../screens/geology/DDGeology";
import DirectorGeologist from "../screens/geology/DirectorGeologist";
import Geologist from "../screens/geology/Geologist";
import OfficeScreen from "../screens/OfficeScreen";
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import Login from "../screens/Login";

import ADLand from '../screens/Land/ADLand'
import DDLand from '../screens/Land/DDLand'
import DirectorLand from '../screens/Land/DirectorLand'

import AEME from '../screens/me/AEME'
import ACEME from '../screens/me/ACEME'
import SDEME from '../screens/me/SDEME'
import SEME from '../screens/me/SEME'
import XENME from '../screens/me/XENME'
import CEME from '../screens/me/CEME'

import DG from '../screens/dgadg/DG'
import ADG from '../screens/dgadg/ADG'
import BiodataScreen from "../screens/BiodataScreen";
import Biodata from "../screens/Biodata";

import ACAgriculture from '../screens/water/ACAgriculture'
import ACEnvironmentForest from '../screens/water/ACEnvironmentForest'
import ACFishery from '../screens/water/ACFishery'
import ACSociology from '../screens/water/ACSociology'
import AssttExtOfficer from '../screens/water/AssttExtOfficer'
import ChiefWaterManagement from '../screens/water/ChiefWaterManagement'
import DCAgriculture from '../screens/water/DCAgriculture'
import ACSoil from '../screens/water/ACSoil'
import DCExtensionOfficer from '../screens/water/DCExtensionOfficer'
import DCFishery from '../screens/water/DCFishery'
import DCSociology from '../screens/water/DCSociology'
import DCSoil from '../screens/water/DCSoil'
import ExtensionOfficer from '../screens/water/ExtensionOfficer'
import PrincipalExtensionOfficer from '../screens/water/PrincipalExtensionOfficer'
import ROAgri from '../screens/water/ROAgri'
import ROEF from '../screens/water/ROEF'
import ROFishery from '../screens/water/ROFishery'
import ROSociology from '../screens/water/ROSociology'
import ROSoil from '../screens/water/ROSoil'

import JointChief from '../screens/economic/JointChief'
import AssistantChiefEconomics from '../screens/economic/AssistantChiefEconomics'
import DeputyChiefEconomics from '../screens/economic/DeputyChiefEconomics'
import DirectorEconomicEvaluation from '../screens/economic/DirectorEconomicEvaluation'
import ResearchOfficerEconomics from '../screens/economic/ResearchOfficerEconomics'


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
            <Drawer.Screen name="Chief Engineer (Civil)" component={CE} />
            <Drawer.Screen name="Addl. Chief Engineer (Civil)" component={ACE} />
            <Drawer.Screen name="Superintendent Engineer (Civil)" component={SE} />
            <Drawer.Screen name="Executive Engineer (Civil)" component={XEN} />
            <Drawer.Screen name="Sub-divisional Engineer (Civil)" component={SDE} />
            <Drawer.Screen name="Assistant Engineer (Civil)" component={AE} />

            <Drawer.Screen name="Assistant Programmer" component={AP} />
            <Drawer.Screen name="Senior System Analyst" component={SSA} />
            <Drawer.Screen name="System Analyst" component={SA} />
            <Drawer.Screen name="Programmer" component={PROG} />

            <Drawer.Screen name="Director (Admin)" component={Director} />
            <Drawer.Screen name="Deputy Director (Admin)" component={DD} />
            <Drawer.Screen name="Asst. Director (Admin)" component={AD} />

            <Drawer.Screen name="Asstt. Director (Fa&A)" component={ADFAA} />
            <Drawer.Screen name="Deputy Director (Fa&A)" component={DDFAA} />
            <Drawer.Screen name="Addl. Director (Fa&A)" component={AdlDFAA} />
            <Drawer.Screen name="Controller (Fa&A)" component={Controller} />
            <Drawer.Screen name="Director (Fa&A)" component={DirectorFAA} />

            <Drawer.Screen name="Geologist" component={Geologist} />
            <Drawer.Screen name="Director (Geology)" component={DirectorGeologist} />
            <Drawer.Screen name="Deputy Director (Geology)" component={DDGeology} />
            <Drawer.Screen name="OfficeScreen" component={OfficeScreen} />


            <Drawer.Screen name="Asstt. Director (Land)" component={ADLand} />
            <Drawer.Screen name="Director Land" component={DirectorLand} />
            <Drawer.Screen name="Deputy Director (Land)" component={DDLand} />

            <Drawer.Screen name="Assistant Engineer (M/E)" component={AEME} />
            <Drawer.Screen name="Sub-divisional Engineer (M/E)" component={SDEME} />
            <Drawer.Screen name="Executive Engineer (M/E)" component={XENME} />
            <Drawer.Screen name="Superintendent Engineer (M/E)" component={SEME} />
            <Drawer.Screen name="Addl. Chief Engineer (M/E)" component={ACEME} />
            <Drawer.Screen name="Chief Engineer (M/E)" component={CEME} />


            <Drawer.Screen name="Director General" component={DG} />
            <Drawer.Screen name="Addl. Director General" component={ADG} />

            <Drawer.Screen name="BiodataScreen" component={BiodataScreen} />
            <Drawer.Screen name="Biodata" component={Biodata} />


            <Drawer.Screen name="Assistant Chief, Agriculture" component={ACAgriculture} />
            <Drawer.Screen name="Assistant Chief, Environment & Forest" component={ACEnvironmentForest} />
            <Drawer.Screen name="Assistant Chief, Fishery" component={ACFishery} />
            <Drawer.Screen name="Assistant Chief, Sociology" component={ACSociology} />
            <Drawer.Screen name="Assistant Chief, Soil" component={ ACSoil} />
            <Drawer.Screen name="Asstt. Extension Officer" component={AssttExtOfficer} />
            <Drawer.Screen name="Chief Water Management" component={ ChiefWaterManagement} />
            <Drawer.Screen name="Deputy Chief, Agriculture" component={DCAgriculture } />
            <Drawer.Screen name="Deputy Chief Extension Officer" component={DCExtensionOfficer } />
            <Drawer.Screen name="Deputy Chief, Fishery" component={ DCFishery} />
            <Drawer.Screen name="Deputy Chief, Sociology" component={ DCSociology} />
            <Drawer.Screen name="Deputy Chief, Soil" component={ DCSoil} />
            <Drawer.Screen name="Extension Officer" component={ExtensionOfficer } />
            <Drawer.Screen name="Principal Extension Officer" component={ PrincipalExtensionOfficer} />
            <Drawer.Screen name="Research Officer, Agri" component={ ROAgri} />
            <Drawer.Screen name="Research Officer, E&F" component={ROEF } />
            <Drawer.Screen name="Research Officer, Fishery" component={ROFishery } />
            <Drawer.Screen name="Research Officer, Sociology" component={ROSociology } />
            <Drawer.Screen name="Research Officer, Soil" component={ROSoil} />
            

            <Drawer.Screen name="Joint Chief" component={JointChief } />
            <Drawer.Screen name="Assistant Chief, Economics" component={AssistantChiefEconomics } />
            <Drawer.Screen name="Deputy Chief, Economics" component={DeputyChiefEconomics} />
            <Drawer.Screen name="Director (Economic Evaluation)" component={DirectorEconomicEvaluation} />
            <Drawer.Screen name="Research Officer, Economics" component={ResearchOfficerEconomics} />

            












        </Drawer.Navigator>
    );
};


const CustomNavigator = () => {

    const { isLogged } = useContext(AuthContext);
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