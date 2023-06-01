import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('oi55.db')

export default db;