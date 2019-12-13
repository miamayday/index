'use-strict'

const { pendingPath, uploadsPath, handleMissingDir } = require('./paths')

/** UPLOAD PENDING DATA */

const fs = require('fs')
let data

try {
  data = require('./data.json')
} catch (e) {
  console.error('data.json missing')
  fs.writeFileSync('./src/data.json', JSON.stringify([], null, 2))
  data = require('./data.json')
  console.log('created data.json')
}

handleMissingDir(pendingPath)

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

  files.sort(byFirstModified)

  let id = data[data.length - 1].id

  // process pending files
  for (file of files) {
    const format = file.split('.').pop()
    const type = format === 'mp4' || format === 'webm' ? 'vid' : 'img'

    handleMissingDir(`${uploadsPath}/${type}/${file}`)

    if (fs.existsSync(`${uploadsPath}/${type}/${file}`)) {
      console.error(`${file} already exists`)
    } else {
      // create file object of pending file
      const fileObj = {
        id: ++id,
        name: file,
        type,
        tags: []
      }

      // push file object to data array
      data.push(fileObj)

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

  // write new data array to data.json
  fs.writeFileSync('./src/data.json', JSON.stringify(data, null, 2))
}
