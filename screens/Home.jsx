import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DatabaseConnection } from "../data/DbConnection";
import BiodataScreen from "./BiodataScreen";

const db = DatabaseConnection.getConnection();
const Home = ({ navigation }) => {


  const { userInfo, splashLoading, name, isLogged } = useContext(AuthContext);

  console.log("in home --- ",userInfo[0].id);
  return (
    <>

      {
        isLogged &&
        <BiodataScreen id={userInfo[0].id} />
      }
    </>

  )
}
export default Home