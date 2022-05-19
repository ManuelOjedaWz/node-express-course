const express = require('express')
const { check, validationResult } = require('express-validator')
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

  router.post('/', [
    check('name')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage('A name is required'),
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required'),
    check('title')
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage('A title is required'),
    check('message')
      .trim()
      .isLength({ min: 5 })
      .escape()
      .withMessage('A message is required')
  ], async (req, res) => {
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
  })
  return router
}
