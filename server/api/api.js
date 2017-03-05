const router = require('express').Router()
const indico = require('indico.io')
const R = require('ramda')
const processEmotion = require('../utils')
const config = require('./config')
indico.apiKey =  config.key;

router.post('/test', (req, res) => {
  res.send({result: 'success'})
})

router.post('/emotion', (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")
  indico.fer(image)
    .then((result) => {
      const emotions = Object.assign(result, {time: new Date()})
      console.log(emotions)
      res.status(200).json({
        result: emotions
      })
    })
    .catch((err) => {
      console.log(err)
    });
})

module.exports = router;
