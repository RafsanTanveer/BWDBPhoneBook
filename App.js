import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import CustomNavigator from "./navigation/CustomNavigator";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataContext } from "./context/DataContext";

// #754ABC  #4F46E5   #1DA1F2    #61DAFB   #4E34E1  #2782BF  #F70000  #0089E3   #034782

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* <DataContext> */}
          <PaperProvider>
            <CustomNavigator />
          </PaperProvider>
        {/* </DataContext> */}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
