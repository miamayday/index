'use-strict'

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

const fileRouter = require('./controllers/files')

app.use('/api/files', fileRouter)

app.listen(process.env.PORT || 8081)
