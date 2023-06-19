import { useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import db from '../database/database';
import { timeStamp } from '../utility/Time';

const DownloadDataAtStartup =  () => {

    const { designationContext } = useContext(AuthContext);


    const LoadAllData = async (index,desig_code, tablename) => {


        const desigUrl = desig_code === '001' ? "dg" : desig_code === '002' ? "adg" : "desig";
        const { data: response } = await api.get(desigUrl, { params: { desig: desig_code } });
        const data = response.rows;
        console.log(index,' desig_code, tablename ------------------',desig_code, tablename,' length === ',data.length);
        const dataWithSelected = data.map(item => (
            item = { ...item, selected: 'false' }

        ))


        await new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tablename} (
                                id          TEXT,
                                name        TEXT,
                                designation TEXT,
                                post        TEXT,
                                charge      TEXT,
                                seniority   INTEGER,
                                office      TEXT,
                                officeAddress  TEXT,
                                officeDistrict  TEXT,
                                mobile      TEXT,
                                pabx        TEXT,
                                email       TEXT,
                                retiredate  TEXT,
                                bwdbJoiningDt TEXT,
                                photo       BLOB,
                                selected    TEXT,
                                timestamp   TEXT
                                                 );`
                );



                dataWithSelected.forEach((it) => {
                    tx.executeSql(
                        `INSERT INTO ${tablename} (
                                      id,
                                      name,
                                      designation,
                                      post,
                                      charge,
                                      seniority,
                                      office,
                                      officeAddress,
                                      officeDistrict,
                                      mobile,
                                      pabx,
                                      email,
                                      retiredate,
                                      bwdbJoiningDt,
                                      photo,
                                      selected,
                                      timestamp)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?);`,
                        [
                            it.id,
                            it.name,
                            it.designation,
                            it.post,
                            it.charge,
                            it.seniority,
                            it.office,
                            it.officeAddress,
                            it.officeDistrict,
                            it.mobile,
                            it.pabx,
                            it.email,
                            it.retiredate,
                            it.bwdbJoiningDt,
                            it.photo,
                            'false',
                            timeStamp()
                        ]
                    );
                });




            }, null, resolve);
        });


    }



    // console.log('DownloadDataAtStartup Start');
    designationContext.forEach((item, index) => LoadAllData(index,item.desig, item.tablename))
    // console.log('DownloadDataAtStartup End');




}

export default DownloadDataAtStartup