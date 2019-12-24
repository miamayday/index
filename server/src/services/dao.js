'use-strict'

const sqlite3 = require('sqlite3').verbose()

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, err => {
      if (err) {
        console.error('Could not connect to database:', err.message)
      } else {
        console.log('Connected to database')
      }
    })
  }

  addFile(file) {
    let sql = `
    INSERT INTO files (name, type, tags)
    VALUES (?, ?, ?)
    `
    this.db.run(
      sql,
      [file.name, file.type, `[${file.tags.join(',')}]`],
      err => {
        if (err) {
          console.log(err.message)
        }
      }
    )
  }

  getFiles() {
    let sql = `
    SELECT * FROM files
    `
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, result) => {
        if (err) {
          console.log(err.message)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = AppDAO
