const fs = require('fs')

const indexConfig = require('./../../config.js')

const dataPath = './../' + indexConfig.DATA_DIR_PATH
const pendingPath = dataPath + '/pending'
const uploadsPath = dataPath + '/uploads'
const dbFilePath = './../' + indexConfig.DB_FILE_PATH

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
  uploadsPath,
  dbFilePath,
  handleMissingDir
}
