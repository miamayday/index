'use-strict'

const config = require('./config')
const AppDAO = require('./services/dao')

const dao = new AppDAO(config.paths.db)

/** FILE UPLOADER */

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFolder = file.mimetype.includes('image') ? 'img' : 'vid'
    const fileObj = {
      name: file.originalname,
      type: subFolder,
      tags: []
    }

    dao.addFile(fileObj)
    cb(null, `${config.paths.uploads}/${subFolder}`)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

/** APP */

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/files', (req, res) => {
  dao.getFiles().then(result => {
    res.send(result)
  }, err => {
    console.log(err.message)
    res.send([])
  })
})

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

app.listen(process.env.PORT || 8081)
