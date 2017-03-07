const axios = require('axios')
const config = require('../config')

const api = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/octet-stream',
  }
})

const headers = (type) => ({
  headers: {
    'Ocp-Apim-Subscription-Key': config.microsoft[type],
  }
})

exports.processEmotion = (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")
  const buffer = Buffer.from(image, 'base64')
  api.post('/emotion/v1.0/recognize', buffer, headers('emotion'))
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error.data);
    })
}

exports.processFace = (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")
  const buffer = Buffer.from(image, 'base64')
  api.post('/face/v1.0/detect?returnFaceAttributes=age,gender,facialHair,glasses', buffer, headers('face'))
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}