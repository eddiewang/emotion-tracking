const R = require('ramda')

const processEmotion = (values) => {
  const result = Object.keys(values).map((emotion) => {
    return Object.assign({}, emotion, {time: new Date()})
  })
  console.log(result)
  return result
}

module.exports = processEmotion
