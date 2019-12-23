'use-strict'

const sqlite3 = require('sqlite3').verbose()
const { dbFilePath } = require('../paths')

let data
let db

/**
 * Returns true if connection to database was established.
 */
function runSqlConverter() {
  // fetch json file
  try {
    data = require('../data.json')
  } catch (e) {
    console.error('Missing data.json:', e.message)
    return 0
  }

  // connect to database
  db = new sqlite3.Database(dbFilePath, err => {
    if (err) {
      db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
        if (err) {
          console.error('Could not connect to database:', err.message)
          return 0
        }
      })
    }
  })

  console.log('Connected to database')

  let sql = `
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    tags ARRAY
  )
  `

  // create table for files if one doesn't already exist
  db.run(sql)

  // add files to the table
  for (file of data) {
    sql = `
    INSERT INTO files (name, type, tags)
    VALUES (?, ?, ?)
    `
    db.run(sql, [file.name, file.type, `[${file.tags.join(',')}]`])
  }

  return 1
}

if (runSqlConverter()) db.close()
