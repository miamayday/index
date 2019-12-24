'use-strict'

const config = require('../config')
const fs = require('fs')
const AppDAO = require('../services/dao')

const dao = new AppDAO(config.paths.db)

// fetch pending files from folder
const files = fs.readdirSync(config.paths.pending)

if (files.length > 0) {
  function byFirstModified(a, b) {
    let a_target = fs.statSync(`${config.paths.pending}/${a}`).mtimeMs
    let b_target = fs.statSync(`${config.paths.pending}/${b}`).mtimeMs

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

  const html5video = ['mp4', 'webm', 'ogg']

  for (file of files) {
    let ext = file.split('.').pop()
    let type = html5video.includes(ext) ? 'vid' : 'img'

    if (fs.existsSync(`${config.paths.uploads}/${type}/${file}`)) {
      console.error(`${file} already exists`)

      // copy duplicate file to duplicates folder
      fs.copyFileSync(`${config.paths.pending}/${file}`, `${config.paths.duplicates}/${file}`)
    } else {
      // copy pending file to data folder
      fs.copyFileSync(
        `${config.paths.pending}/${file}`,
        `${config.paths.uploads}/${type}/${file}`
      )

      // add link to sqlite3 database
      dao.addFile({
        name: file,
        type,
        tags: []
      })

      console.log(`add ${file}`)
    }

    // remove pending file from file system
    fs.unlinkSync(`${config.paths.pending}/${file}`)
  }
}
