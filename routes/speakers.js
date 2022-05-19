const express = require('express')
const router = express.Router()

module.exports = ({ speakerService }) => {
  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList()
    return res.json({
      speakers
    })
  })

  router.post('/:speakerName', (req, res) => {
    res.send(req.params)
  })
  return router
}
