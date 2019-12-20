'use-strict'

const sqlite3 = require('sqlite3').verbose()
const { dbFilePath } = require('./paths')

let data
let db

function executeQuery(query, options) {
  db.run(query, err => {
    if (err) {
      console.error(err.message)
      return 0
    }
  })
  return 1
}

function runSqlConverter() {

  // fetch json file
  try {
    data = require('./data.json')
  } catch (e) {
    return console.error('Missing data.json:', e.message)
  }

  // connect to database
  db = new sqlite3.Database(dbFilePath, err => {
    if (err) {
      return console.error('Could not connect to database:', err.message)
    }
    console.log('Connected to database')
  })

  let sql = `
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    tags ARRAY
  )
  `

  // create files table if one doesn't already exist
  db.run(sql)

  for (file of data) {
    sql = `
    INSERT INTO files (id, name, type, tags)
    VALUES (?, ?, ?, ?)
    `
    db.run(sql, [...file])
  }
}

runSqlConverter()
db.close()
