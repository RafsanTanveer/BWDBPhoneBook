import db from '../database/database'


export const deleteAllData = ({ tablename }) => {
    console.log('delete in file/////////////////////////////////////', tablename);
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM ${tablename};`,
            [],
            (tx, result) => {
                __DEV__ && console.log('Data deleted');
            },
            (tx, error) => {
                __DEV__ && console.log('Error deleting data:', error);
            }
        );
    });
};