'use-strict'

const sqlite3 = require('sqlite3').verbose()

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(
      dbFilePath,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      err => {
        if (err) {
          console.error('Could not connect to database:', err.message)
        } else {
          console.log('Connected to database')
          this.initialize()
        }
      }
    )
  }

  initialize() {
    let sql = `
    CREATE TABLE IF NOT EXISTS files (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      tags ARRAY,
      UNIQUE(name)
    )
    `
    this.db.run(sql)
  }

  addFile(file) {
    sql = `
    INSERT INTO files (name, type, tags)
    VALUES (?, ?, ?)
    `
    this.db.run(sql, [file.name, file.type, `[${file.tags.join(',')}]`])
  }
}

module.exports = AppDAO
