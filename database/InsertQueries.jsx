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
                                      blood,
                                      charge,
                                      seniority,
                                      officeid,
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
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?);`,
                    [
                        it.id,
                        it.name,
                        it.designation,
                        it.post,
                        it.blood,
                        it.charge,
                        it.seniority,
                        it.officeid,
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
                    `INSERT INTO ${tableName} (
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
                __DEV__ && console.log(tableName, '', it);

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



export const insertDataIntoBiodataTable = (tableName, data) => {

    // console.log(tableName, ' length = ', data.length);

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                tx.executeSql(
                    `INSERT INTO ${tableName} (
                                   id,
                                   name,
                                   namebn,
                                   f_name,
                                   f_name_bn,
                                   m_name,
                                   m_name_bn,
                                   bdate,
                                   postGrade,
                                   mstatus,
                                   gender,
                                   religion,
                                   gpf,
                                   accountsid,
                                   retireDate,
                                   homeDist,
                                   homeAddress,
                                   postalCode,
                                   upazila,
                                   village,
                                   officelevel1code,
                                   cadre,
                                   accfile,
                                   joinDesig,
                                   joinDate,
                                   regularDate,
                                   officeAddress,
                                   offceCode,
                                   officeLevel,
                                   officeLevel1,
                                   officeLevel2,
                                   adminLevel,
                                   canCallBulk,
                                   canAccessSeniority,
                                   timestamp,
                                   photo)
               VALUES (  ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?,?, ?,?,?,?,?,?,?);`,
                    [
                        it.id,
                        it.name,
                        it.namebn,
                        it.f_name,
                        it.f_name_bn,
                        it.m_name,
                        it.m_name_bn,
                        it.bdate,
                        it.postGrade,
                        it.mstatus,
                        it.gender,
                        it.religion,
                        it.gpf,
                        it.accountsid,
                        it.retireDate,
                        it.homeDist,
                        it.homeAddress,
                        it.postalCode,
                        it.upazila,
                        it.village,
                        it.officelevel1code,
                        it.cadre,
                        it.accfile,
                        it.joinDesig,
                        it.joinDate,
                        it.regularDate,
                        it.officeAddress,
                        it.offceCode,
                        it.officeLevel,
                        it.officeLevel1,
                        it.officeLevel2,
                        it.adminLevel,
                        it.canCallBulk,
                        it.canAccessSeniority,
                        timeStamp(),
                        it.photo
                    ]
                );
            });



        });
    });
};


export const insertLoginHistoryTable = (tableName, data) => {



    return new Promise((resolve, reject) => {

        db.transaction((tx) => {


            data.forEach((it, index) => {
                console.log(it.id + ' >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> in history');
                tx.executeSql(
                    `INSERT INTO ${tableName} (
                                     id,
                                     password,
                                     rec_status,
                                     timestamp
                                     )
               VALUES (?, ?,?,?);`,
                    [
                        it.id,
                        it.password,
                        it.rec_status,
                        timeStamp()
                    ]
                );
            });



        });
    });
};