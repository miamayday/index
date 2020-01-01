'use-strict'

const router = require('express').Router()
const path = require('path')
const config = require('../config')
const AppDAO = require('../services/dao')

const dao = new AppDAO(config.paths.db)

/** FILE UPLOADER */

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFolder = file.mimetype.includes('image') ? 'img' : 'vid'

    // add link to sqlite3 database
    dao.add({
      name: file.originalname,
      type: subFolder,
      tags: []
    })

    cb(null, path.join(config.paths.uploads, subFolder))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

/** ROUTES */

router.get('/', (req, res) => {
  dao.getAll().then(
    result => {
      res.send(result)
    },
    err => {
      console.log(err.message)
      res.send(err)
    }
  )
})

router.get('/:id', (req, res) => {
  dao.get(req.params.id).then(
    result => {
      if (result === undefined) {
        res.status(404).send('Not found')
      } else {
        res.send(result)
      }
    },
    err => {
      console.log(err.message)
      res.send(err)
    }
  )
})

router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ file: req.file })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const file = req.body

  dao.update(id, file)

  res.json({ file })
})

module.exports = router
