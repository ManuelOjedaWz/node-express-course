const express = require('express')
const speakersRoutes = require('./speakers')
const feedbackRoutes = require('./feedback')
const router = express.Router()

module.exports = (params) => {
  const { speakerService } = params
  router.get('/', async (req, res) => {
    const topSpeakers = await speakerService.getList()
    res.render('layouts', {
      pageTitle: 'Welcome',
      template: 'index',
      topSpeakers
    })
  })

  router.use('/speakers', speakersRoutes(params))
  router.use('/feedback', feedbackRoutes(params))

  return router
}
