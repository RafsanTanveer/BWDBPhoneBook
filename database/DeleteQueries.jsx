import db from '../database/database'


export const deleteDataFromDesignationTable = (tableName) => {

   

    return new Promise((resolve, reject) => {

        db.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM ${tableName};`,
                [],
                (tx, result) => {
                    __DEV__ && console.log('Data deleted');
                },
                (tx, error) => {
                    __DEV__ && console.log('Error deleting data:', error);
                }
            );
        })
    });
};