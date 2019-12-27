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

  add(file) {
    let data = [file.name, file.type, `[${file.tags.join(',')}]`]
    let sql = `
    INSERT INTO files (name, type, tags)
    VALUES (?, ?, ?)
    `
    this.db.run(sql, data, err => {
      if (err) {
        console.log(err.message)
      }
    })
  }

  getAll() {
    let sql = `
    SELECT * FROM files
    `
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, result) => {
        if (err) {
          console.log(err.message)
          reject(err)
        } else {
          result.forEach((file, index) => {
            result[index].tags = JSON.parse(file.tags)
          })
          resolve(result)
        }
      })
    })
  }

  get(id) {
    let sql = `
    SELECT * FROM files WHERE id=${id}
    `

    return new Promise((resolve, reject) => {
      this.db.get(sql, (err, result) => {
        if (err) {
          console.log(err.message)
          reject(err)
        } else {
          if (result !== undefined) {
            result.tags = JSON.parse(result.tags)
          }
          resolve(result)
        }
      })
    })
  }

  update(id, file) {
    let tags = file.tags.map(t => `"${t}"`)
    let data = [`[${tags.join(',')}]`, id]
    let sql = `
    UPDATE files SET tags=?
    WHERE id=?
    `

    this.db.run(sql, data, err => {
      if (err) {
        console.log(err.message)
      }
    })
  }
}

module.exports = AppDAO
