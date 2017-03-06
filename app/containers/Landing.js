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

  componentDidMount() {
    // setInterval(() => {
    //   if(this.state.start) {
    //     const image = {
    //       image: this.refs.webcam.getScreenshot()
    //     }
    //     const fetchEmotion = postRequest('/emotion', image, (err) => console.log(err))
    //     .then((result) => {
    //       let chart = this.refs.chart.getChart();
    //       let [Angry, Sad, Neutral, Fear, Surprise, Happy] = chart.series
    //       console.log(chart.series)
    //       const date = (new Date()).getTime()
    //       const emotions = result.data.result
    //       console.log(date, emotions)
    //       Angry.addPoint({x: date, y: emotions.Angry})
    //       Sad.addPoint({x: date, y: emotions.Sad})
    //       Neutral.addPoint({x: date, y:emotions.Neutral})
    //       Surprise.addPoint({x: date, y: emotions.Surprise})
    //       Fear.addPoint({x: date, y: emotions.Fear})
    //       Happy.addPoint({x: date, y: emotions.Happy})
    //     })
    //   }
    // }, 5000)
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
