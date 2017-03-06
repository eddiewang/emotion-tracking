const axios = require('axios')
const config = require('../config')

const api = axios.create({
  baseURL: 'https://westus.api.cognitive.microsoft.com/',
  timeout: 5000,
  headers: {
    'Ocp-Apim-Subscription-Key': config.microsoft,
    'Content-Type': 'application/octet-stream',
  }
})

exports.processEmotion = (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")
  const buffer = Buffer.from(image, 'base64')
  api.post('/emotion/v1.0/recognize', buffer)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}