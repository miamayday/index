'use-strict'

const path = require('path')
const config = require('../config')
const sqlite3 = require('sqlite3').verbose()

let dbFilePath = path.join('..', '..', config.paths.db)
let db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    console.error('Could not connect to database:', err.message)
  } else {
    let sql = `
      CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        tags ARRAY,
        UNIQUE(name)
      )
      `
    db.run(sql, err => {
      if (err) {
        console.log(err.message)
      }
    })

    db.close()
  }
})
