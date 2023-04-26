import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('z17.db')

export default db;