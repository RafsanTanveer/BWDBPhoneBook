import db from '../database/database'


export const getEmployeeInfo = async (tableName) => {
    return new Promise((resolve, reject) => {


        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};



export const getAllTableName = async () => {
    return new Promise((resolve, reject) => {


        db.transaction(tx => {
            tx.executeSql(
                `SELECT name FROM sqlite_master WHERE type='table'`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};



export const getAllInfoFromTable = async (tableName) => {
    return new Promise((resolve, reject) => {


        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],
                (_, { rows }) => {
                    resolve(rows._array);
                },
                (_, error) => {
                    reject(error);
                    return false;
                }
            );
        });
    });
};
