import React from 'react'

import Title from 'components/Title'
import Webcam from 'components/Webcam'
import { postRequest } from 'utils/fetch'
import { LineChart, Line, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts'
import ReactHighcharts from 'react-highcharts'


class Landing extends React.Component {
  constructor(props) {
    super(props)
  }

  capture = () => {
    const image = this.refs.webcam.getScreenshot()
    const fetchEmotion = postRequest('/microsoft', {image}, (err) => console.log(err))
        .then((response) => {
          console.log(response.data)
        })
  }

  render () {
    return (
      <div className='main-container'>
        <Title>hello universe.</Title>
        <Webcam screenshotFormat="image/png" height={300} width={300} audio={false} ref="webcam"/>
        <button onClick={this.capture}>Capture</button>
      </div>
    )
  }
}

export default Landing
