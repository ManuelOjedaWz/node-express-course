const express = require('express')
const speakersRoutes = require('./speakers')
const feedbackRoutes = require('./feedback')
const router = express.Router()

module.exports = (params) => {
  router.get('/', (req, res) => {
    res.render('pages/index', {
      pageTitle: 'Welcome'
    })
  })

  router.use('/speakers', speakersRoutes(params))
  router.use('/feedback', feedbackRoutes(params))

  return router
}
