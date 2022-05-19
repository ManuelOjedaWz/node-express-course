const express = require('express')
const path = require('path')
const routes = require('./routes')
const cookieSession = require('cookie-session')
const app = express()
const port = 3000

app.set('trust proxy', 1)

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')
const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

app.use(cookieSession({
  name: 'session',
  keys: [
    'kjkjkhfskdskhdsfkhdnsk',
    'nhuifdhnufsdnhdfjkvdsh'
  ]
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.locals.siteName = 'ROUX Meetups'

app.use(express.static(path.join(__dirname, './static')))
app.use(async (req, res, next) => {
  try {
    res.locals.speakerNames = await speakerService.getNames()
    return next()
  } catch (error) {
    res.render('layouts', {
      pageTitle: 'An error ocurred',
      template: 'error'
    })
    return next(error)
  }
})

app.use('/', routes({
  feedbackService,
  speakerService
}))

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
