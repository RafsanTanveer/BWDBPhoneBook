import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { DatabaseConnection } from "../data/DbConnection";
import BiodataScreen from "./BiodataScreen";

const db = DatabaseConnection.getConnection();
const Home = ({ navigation }) => {


  const { userInfo, splashLoading, name, isLogged } = useContext(AuthContext);


  return (
    <>

      {
        isLogged &&
        <BiodataScreen id={userInfo.rows[0].id} />
      }
    </>

  )
}
export default Home