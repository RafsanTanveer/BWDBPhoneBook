import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DatabaseConnection } from "../data/DbConnection";
import BiodataScreen from "./BiodataScreen";
import Biodata from "./Biodata";
import WelcomeScreen from './WelcomeScreen'



const db = DatabaseConnection.getConnection();
const Home = ({ navigation }) => {


  const { userInfo, splashLoading, name, isLogged } = useContext(AuthContext);

  // console.log("in home --- ", userInfo);
  return (
    <>
      {
       userInfo.length!=0 &&
          userInfo[0].int_ext != 'E' ?
          <BiodataScreen id={userInfo[0].id} /> : <WelcomeScreen />
        // <BiodataScreen id={userInfo[0].id} /> : <BiodataScreen id={userInfo[0].id} />
      }
    </>

  )
}
export default Home