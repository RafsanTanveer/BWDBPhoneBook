import { useNetInfo } from "@react-native-community/netinfo";


const netInfo = useNetInfo();


export const isNetworkAvailable= netInfo.isConnected