import "react-native-gesture-handler";
import * as React from "react";
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
    </Drawer.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <CustomDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
