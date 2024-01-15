import { getAllTableName } from "../database/SelectQueries";

export const isTableAvailable = async (tableName) => {
  const tablenames = await getAllTableName();

  const tableNames = tablenames.map((table) => table.name);
  // console.log(tableNames);

  const tableExists = tableNames.includes(tableName);
  console.log("tableExists   ............................" + tableExists);
  return tableExists;
};
