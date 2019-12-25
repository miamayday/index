'use-strict'

const path = require('path')

const config = {
  paths: {
    uploads: path.join('..', 'data', 'uploads'),
    db: path.join('..', 'db', 'data.db'),
    pending: path.join('..', 'data', 'pending'),
    duplicates: path.join('..', 'data', 'duplicates')
  }
}

module.exports = config
