const axios = require('axios')
const config = require('../config')
const querystring = require('querystring');

const api = axios.create({
  baseURL: 'https://api.kairos.com/',
  headers: {
    app_id: 'f6f3839c',
    app_key: '31f5066d4fc3f1c67e479f74d8fe91f6'
  }
})

exports.processEmotion = (req, res) => {
  const image = req.body.image.replace(/^data:image\/(png|jpg);base64,/, "")
  const buffer = Buffer.from(image, 'base64')

  const payload = {
        filename: 'filename.png',
    }

  data.append('file', buffer)
  api.post(`/v2/media`, data)
    .then(function (response) {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
}