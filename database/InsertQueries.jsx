import db from '../database/database'
import { timeStamp } from '../utility/Time';


export const insertDataIntoDesignationTable = (tableName, data) => {

    // console.log(tableName, ' length = ', data.length);

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                tx.executeSql(
                    `INSERT INTO ${tableName} (
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
                        it.selected,
                        timeStamp()
                    ]
                );
            });



        });
    });
};


export const insertDataIntoDesignationListTable = (tableName, data) => {

    // console.log(tableName, ' length = ', data.length);

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                tx.executeSql(
                    `INSERT INTO designation (
                                    cadre,
                                    paygrade,
                                    desig,
                                    designame,
                                    tablename,
                                    totalPostNBS)
               VALUES (  ?, ?, ?, ?,?,?);`,
                    [
                        it.cadre,
                        it.paygrade,
                        it.desig,
                        it.designame,
                        it.tablename,
                        it.totalPostNBS
                    ]
                );
            });



        });
    });
};



export const insertDataIntoVacantTable = (tableName, data) => {



    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                // console.log(tableName);
                // console.log(it);
                tx.executeSql(
                    `INSERT INTO ${tableName} (
                                     office,
                                     officeName,
                                     postNo
                                     )
               VALUES (?, ?, ?);`,
                    [
                        it.office,
                        it.officeName,
                        it.postNo
                    ]
                );
            });



        });
    });
};


export const insertDataIntoEmployeeInfoTable = (tableName, data) => {



    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                console.log(tableName, '', it);

                tx.executeSql(
                    `INSERT INTO ${tableName} (
                                     id,
                                     name,
                                     status
                                     )
               VALUES (?, ?, ?);`,
                    [
                        it.id,
                        it.name,
                        it.status
                    ]
                );
            });



        });
    });
};


export const insertDataIntoGroupTable = (tableName, data) => {

    // console.log(tableName, ' length = ', data.length);

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                tx.executeSql(
                    `INSERT INTO ${tableName} (
                                      id,
                                      name,
                                      designation,
                                      post,
                                      charge,
                                      office,
                                      officeAddress,
                                      mobile,
                                      pabx,
                                      email,
                                      photao,
                                      timestamp)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                    [
                        it.id,
                        it.name,
                        it.designation,
                        it.post,
                        it.charge,
                        it.office,
                        it.officeAddress,
                        it.mobile,
                        it.pabx,
                        it.email,
                        it.photo,
                        timeStamp()
                    ]
                );
            });



        });
    });
};
