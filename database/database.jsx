import React from 'react'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('BWDBEMPDB_rnhgyg.db')

export default db;