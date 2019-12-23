'use-strict'

const {
  pendingPath,
  duplicatesPath,
  uploadsPath,
  handleMissingDir,
  dbFilePath
} = require('./paths')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

handleMissingDir(pendingPath)
handleMissingDir(duplicatesPath)

// fetch pending files from folder
const files = fs.readdirSync(pendingPath)

if (files.length > 0) {
  function byFirstModified(a, b) {
    const a_target = fs.statSync(`${pendingPath}/${a}`).mtimeMs
    const b_target = fs.statSync(`${pendingPath}/${b}`).mtimeMs

    if (a_target > b_target) {
      return 1
    } else if (a_target < b_target) {
      return -1
    } else {
      return 0
    }
  }

  // sort pending files
  files.sort(byFirstModified)

  // process pending files
  for (file of files) {
    const format = file.split('.').pop()
    const type = format === 'mp4' || format === 'webm' ? 'vid' : 'img'

    handleMissingDir(`${uploadsPath}/${type}/${file}`)

    if (fs.existsSync(`${uploadsPath}/${type}/${file}`)) {
      console.error(`${file} already exists`)

      // copy duplicate file to duplicates folder
      fs.copyFileSync(
        `${pendingPath}/${file}`,
        `${duplicatesPath}/${file}`
      )
    } else {
      // copy pending file to data folder
      fs.copyFileSync(
        `${pendingPath}/${file}`,
        `${uploadsPath}/${type}/${file}`
      )

      console.log(`add ${file}`)
    }

    // remove pending file from file system
    fs.unlinkSync(`${pendingPath}/${file}`)
  }
}
