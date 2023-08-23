import React from 'react'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('BWDBEMPDB_01_112454512122.db')

export default db;