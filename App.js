import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import CustomNavigator from "./navigation/CustomNavigator";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataContext } from "./context/DataContext";
import SplashScreen from "./screens/SplashScreen";

function App() {
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   // Simulate loading process
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000); // Adjust the time as needed
  // }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <PaperProvider>
          <CustomNavigator />
          {/* {isLoading ? <SplashScreen /> : <CustomNavigator />} */}
        </PaperProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
