const express = require('express')
const { validationResult } = require('express-validator')
const feedbackValidations = require('../middlewares/feedbackValidations')
const router = express.Router()

module.exports = ({ feedbackService }) => {
  router.get('/', async (req, res) => {
    const feedbacks = await feedbackService.getList()
    const errors = req.session.feedback.errors ?? null
    const success = req.session.feedback.success ?? null
    req.session.feedback.errors = null
    req.session.feedback.success = null

    return res.render('layouts', {
      feedbacks,
      errors,
      success,
      pageTitle: 'Feedback',
      template: 'feedback'
    })
  })

  router.post('/', feedbackValidations, async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        req.session.feedback = {
          errors: errors.array()
        }

        return res.redirect('/feedback')
      }

      await feedbackService.addEntry(req.body)
      req.session.feedback = {
        success: 'Thanks for you feedback'
      }

      return res.redirect('/feedback')
    } catch (error) {
      return next(error)
    }
  })

  router.post('/api', feedbackValidations, async (req, res, next) => {
    try {
      const errors = validationResult(req)

      const response = {
        errors: null,
        success: null,
        feedback: null
      }

      if (!errors.isEmpty()) {
        response.errors = errors.array()
      } else {
        await feedbackService.addEntry(req.body)
        response.success = 'Thanks for you feedback'
        response.feedback = await feedbackService.getList()
      }

      return res.json(response)
    } catch (error) {
      return next(error)
    }
  })

  return router
}
