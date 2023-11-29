import React from 'react'
import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('BWDBEMPDB_01_qw14fdmmg.db')

export default db;