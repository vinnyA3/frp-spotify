'use strict'

const config = require('../config/config')
const app = require('./server')

app.listen(config.port, err => {
  if (err) console.log(err)
  else {
    console.log(`App listening on port: ${config.port}`)
  }
})
