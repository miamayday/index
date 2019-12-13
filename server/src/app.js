'use-strict'

const { uploadsPath } = require('./paths')

/** FILE UPLOADER */

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const format = file.originalname.split('.').pop()
    const subFolder = format === 'mp4' || format === 'webm' ? 'vid' : 'img'
    cb(null, `${uploadsPath}/${subFolder}`)
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
let data

try {
  data = require('./data.json')
} catch (e) {
  console.log('data.json not found, creating one...')
  fs.writeFileSync('./src/data.json', JSON.stringify([], null, 2))
  data = require('./data.json')
}

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/files', (req, res) => {
  res.send(data)
})

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

app.listen(process.env.PORT || 8081)
