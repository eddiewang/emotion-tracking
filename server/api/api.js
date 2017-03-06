const router = require('express').Router()
const R = require('ramda')
const processEmotion = require('../utils')
const axios = require('axios')

const microsoft = require('./controllers/microsoft')
const kairos = require('./controllers/kairos')

router.post('/microsoft', microsoft.processEmotion)
router.post('/kairos', kairos.processEmotion)

module.exports = router;
