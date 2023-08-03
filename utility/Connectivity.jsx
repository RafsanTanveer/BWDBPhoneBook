import { useNetInfo } from "@react-native-community/netinfo";


const netInfo = useNetInfo();


export const isConnected= netInfo.isConnected