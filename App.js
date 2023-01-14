import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./screens/Home";
import CE from "./screens/civil/CE";
import ACE from "./screens/civil/ACE";
import SE from "./screens/civil/SE";
import AE from "./screens/civil/AE";
import SDE from "./screens/civil/SDE";
import XEN from "./screens/civil/XEN";
import DrawerContent from "./navigation/DrawerContent";
import Login from "./screens/Login";

import AP from "./screens/computer/AP";
import SSA from "./screens/computer/SSA";
import SA from "./screens/computer/SA";
import PROG from "./screens/computer/PROG";

import DD from "./screens/admin/DD";
import AD from "./screens/admin/AD";
import Director from "./screens/admin/Director";
import BiodataScreen from "./screens/BiodataScreen";
import ADFAA from "./screens/faa/ADFAA";
import DDFAA from "./screens/faa/DDFAA";
import AdlDFAA from "./screens/faa/AdlDFAA";
import Geologist from "./screens/geology/Geologist";
import DirectorGeologist from "./screens/geology/DirectorGeologist";
import DDGeology from "./screens/geology/DDGeology";
import Controller from "./screens/faa/Controller";
import DirectorFAA from "./screens/faa/DirectorFAA";

const CustomDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
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
    </Drawer.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function App() {
  return (
    <PaperProvider>
      {/* <Login /> */}
      <StatusBar animated={true} backgroundColor="#A763A8" />
      {/* <BiodataScreen /> */}
      {/* <Home /> */}
      <NavigationContainer>
        <CustomDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
