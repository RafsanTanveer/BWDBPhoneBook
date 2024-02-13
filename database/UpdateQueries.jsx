import db from '../database/database'
import { timeStamp } from '../utility/Time';



export const updatePassword = (id, pass, tableName) => {



    return new Promise((resolve, reject) => {

        db.transaction((tx) => {

            // tx.executeSql(`DELETE FROM ${tableName} WHERE WHERE id=${id}`);
            // tx.executeSql(`INSERT or REPLACE INTO ${tableName} (id,password,rec_status, timestamp) VALUES(${id},${pass},'A',timeStamp())`);


            db.transaction((tx) => {
                tx.executeSql(
                    `DELETE FROM ${tableName} WHERE  id=${id};`,
                    [],
                    (tx, result) => {
                        __DEV__ && console.log('Data deleted');
                        tx.executeSql(
                            `INSERT INTO ${tableName} (
                                     id,
                                     password,
                                     rec_status,
                                     timestamp
                                     )
                            VALUES (?, ?,?,?);`,
                            [
                                id,
                                pass,
                                'A',
                                timeStamp()
                            ],
                            (tx, result) => {
                                __DEV__ && console.log('Data inserted');
                            },
                            (tx, error) => {
                                __DEV__ && console.log('Error deleting data:', error);
                            }
                        );
                    },
                    (tx, error) => {
                        __DEV__ && console.log('Error deleting data:', error);
                    }
                );
            })



        });
    });
};
//  REPLACE INTO ${tableName} (id,password,rec_status, timestamp) VALUES(${id},${pass},'A',timeStamp());

//  `Update ${tableName} SET password=${pass}, timestamp=${timeStamp()} WHERE id=${id}`

// DELETE FROM ${tableName} WHERE WHERE id=${id};