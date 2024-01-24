import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import LoadingScreen from "../screens/LoadingScreen";
export const DownloadStafflist = async (id, officeName, officecode, recStatus, individualOrOffice) => {
  const baseUrl = `http://hrms.bwdb.gov.bd:7777/reports/rwservlet?bwdb&report=/san/apps/hrms/fmw/HR/REPORTS/HR_EMPLOYEE_LIST.jsp&desformat=pdf&destype=cache&paramform=no&P_RPT_TYPE=${recStatus}`;

  const individualUrl = baseUrl + `&P_EMPLOYEE=${id}`;

  const officeUrl = baseUrl + `&P_OFFICE=${officecode}`;

  const url = individualOrOffice ? individualUrl : officeUrl;

  const fileName = individualOrOffice ? `${officeName} - ${id}.pdf` : `${officeName}.pdf`;

  __DEV__ && console.log(url);

  const { uri: localUri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + "Staff List : " + fileName).catch((error) => {
    console.error(error);
  });

  await shareAsync(localUri).catch((err) => console.log("Sharing::error", err));
};
