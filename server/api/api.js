const router = require('express').Router()
const indico = require('indico.io')
const R = require('ramda')
const processEmotion = require('../utils')
const config = require('./config')
const axios = require('axios')

const microsoft = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/',
  timeout: 20000,
  'headers': {
    'Ocp-Apim-Subscription-Key': '7776acba38ff4610a4c0b1cec81a0299',
    'Content-Type': 'application/octet-stream'
  }
});

indico.apiKey =  config.key;

router.post('/test', (req, res) => {
  res.send({result: 'success'})
})

router.post('/microsoft', (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")

  const buffer = Buffer.from(image, 'base64')
  microsoft.post('/emotion/v1.0/recognize', buffer)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json({
        result: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

})

module.exports = router;
