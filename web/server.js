'use strict'

const express = require('express')
const router = require('./router')
const path = require('path')
const morgan = require('morgan')
// init express app
const app = express()
// set morgan logger middleware
app.use(morgan('dev'))
// set view directory and default view engine
app.set('views', path.join(__dirname, '../public/'))
app.set('view engine', 'pug')
// routes
app.use(router)
// export
module.exports = app
