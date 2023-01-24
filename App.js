import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import CustomNavigator from "./navigation/CustomNavigator";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        {/* <StatusBar animated={true} backgroundColor="#6750a4" /> */}
        <CustomNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
