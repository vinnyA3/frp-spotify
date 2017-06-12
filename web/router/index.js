'use strict'

const router = require('express').Router()

// endpoints
router.get('/', (req, res) => {
  res.render('index', { title: 'Hello World!' })
})

module.exports = router
