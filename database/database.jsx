import React from 'react'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('BWDBEMPDB_01_1124545.db')

export default db;