const express = require('express')
const router = express.Router()

module.exports = ({ speakerService }) => {
  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList()
    const artworks = await speakerService.getAllArtwork()

    res.render('layouts/index', {
      speakers,
      artworks,
      template: 'speakers',
      pageTitle: 'Speakers'
    })
  })

  router.get('/:speakerName', async (req, res) => {
    const { speakerName } = req.params
    const speaker = await speakerService.getSpeaker(speakerName)
    const artworks = await speakerService.getArtworkForSpeaker(speakerName)

    res.render('layouts/index', {
      pageTitle: 'Speaker',
      template: 'speaker',
      speaker,
      artworks
    })
  })
  return router
}
