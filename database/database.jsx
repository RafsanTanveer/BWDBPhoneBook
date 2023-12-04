import React from 'react'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('BWDBEMPDB_01_qg.db')

export default db;