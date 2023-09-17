import db from '../database/database'

export const createDesignationTable = (tableName) => {
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (
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
                                                 );`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};




export const createDesignationListTable = (tableName) => {
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS designation (
                                cadre       TEXT,
                                paygrade    TEXT,
                                desig       TEXT,
                                designame   TEXT,
                                tablename   TEXT,
                                totalPostNBS TEXT
                                                 );`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};


export const createVacantDesignationTable = (tableName) => {

     // console.log('vatant table name  88888888888888888888888888888        ', tableName);
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (
                                office            TEXT,
                                officeName        TEXT,
                                postNo            TEXT);`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};


export const createEmployeeInfoTable = (tableName) => {
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (
                                id          TEXT,
                                name        TEXT,
                                status      TEXT);`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};


export const createGroupTable = (tableName) => {
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (
                                id          TEXT,
                                name        TEXT,
                                designation TEXT,
                                post        TEXT,
                                charge      TEXT,
                                office      TEXT,
                                officeAddress  TEXT,
                                mobile      TEXT,
                                pabx        TEXT,
                                email       TEXT,
                                photo       BLOB,
                                timestamp   TEXT
                                                 );`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};




export const createBiodataTable = (tableName) => {
     return new Promise((resolve, reject) => {
          db.transaction((tx) => {
               tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS biodata (
                                id              TEXT,
                                name            TEXT,
                                namebn          TEXT,
                                f_name          TEXT,
                                f_name_bn       TEXT,
                                m_name          TEXT,
                                m_name_bn       TEXT,
                                bdate           TEXT,
                                postGrade       TEXT,
                                mstatus         TEXT,
                                gender          TEXT,
                                religion        TEXT,
                                gpf             TEXT,
                                accountsid      TEXT,
                                retireDate      TEXT,
                                homeDist        TEXT,
                                homeAddress     TEXT,
                                postalCode      TEXT,
                                upazila         TEXT,
                                village         TEXT,
                                officelevel1code TEXT,
                                cadre           TEXT,
                                accfile         TEXT,
                                joinDesig       TEXT,
                                joinDate        TEXT,
                                regularDate     TEXT,
                                officeAddress   TEXT,
                                offceCode       TEXT,
                                officeLevel     TEXT,
                                officeLevel1    TEXT,
                                officeLevel2    TEXT,
                                adminLevel      TEXT,
                                canCallBulk     TEXT,
                                canAccessSeniority TEXT,
                                timestamp       TEXT,
                                photo           BLOB
                                                 );`,
                    [],
                    (_, result) => {
                         resolve(result);
                    },
                    (_, error) => {
                         reject(error);
                    }
               );
          });
     });
};