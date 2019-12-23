const fs = require('fs')

const dataPath = './../data'
const pendingPath = dataPath + '/pending'
const duplicatesPath = dataPath + '/duplicates'
const uploadsPath = dataPath + '/uploads'
const dbFilePath = './../db/data.db'

const dropLastFolder = path => {
  const lastFolder = path.split('/').pop()
  const startIndex = path.indexOf(lastFolder) - 1
  return path.substring(0, startIndex)
}

const handleMissingDir = path => {
  let subpath = path
  let paths = []

  while (!fs.existsSync(subpath)) {
    paths.unshift(subpath)
    subpath = dropLastFolder(subpath)
  }

  for (path of paths) {
    fs.mkdirSync(path)
  }
}

module.exports = {
  dataPath,
  pendingPath,
  duplicatesPath,
  uploadsPath,
  dbFilePath,
  handleMissingDir
}
