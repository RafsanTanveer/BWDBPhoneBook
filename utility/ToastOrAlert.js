import { ToastAndroid, Platform, Alert } from "react-native";

export const ToastOrAlert = (msg) => {

     if (Platform.OS === "android") {
       ToastAndroid.show(msg, ToastAndroid.LONG);
     }
     else {
         Alert.alert("Alert", msg, [
        //    {
        //      text: "Cancel",
        //      onPress: () => console.log("Cancel Pressed"),
        //      style: "cancel",
        //    },
           { text: "OK", onPress: () => {}},
         ]);
     }

}