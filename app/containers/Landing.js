import React from 'react'

import Title from 'components/Title'
import Webcam from 'components/Webcam'
import { postRequest } from 'utils/fetch'
import { LineChart, Line, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts'
const emotionData = { "Angry": 0.1240934516, "Sad": 0.391903375, "Neutral": 0.1427304191, "Surprise": 0.1225001438, "Fear": 0.1069961407, "Happy": 0.1117764698 }

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenshot: null,
      emotions: []
    }
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.start) {
        console.log('working')
          const image = {
          image: this.refs.webcam.getScreenshot()
        }
        const fetchEmotion = postRequest('/emotion', image, (err) => console.log(err))
        .then((result) => {
          const emotions = result.data.result
          this.setState({
            emotions: [...this.state.emotions, emotions]
          })
        })
      }
    }, 5000)
  }

  capture = () => {
    this.setState({start: !this.state.start})
  }

  render () {
    console.log(this.state.emotions)
    return (
      <div className='main-container'>
        <Title>hello universe.</Title>
        <Webcam screenshotFormat="image/png" height={300} width={300} audio={false} ref="webcam"/>
        <button onClick={this.capture}>Capture</button>

        { this.state.emotions ?
        <LineChart width={730} height={250} data={this.state.emotions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Angry" stroke="#8884d8" />
          <Line type="monotone" dataKey="Sad" stroke="#8884d8" />
          <Line type="monotone" dataKey="Surprise" stroke="#8884d8" />
          <Line type="monotone" dataKey="Fear" stroke="#8884d8" />
          <Line type="monotone" dataKey="Neutral" stroke="#8884d8" />
          <Line type="monotone" dataKey="Happy" stroke="#8884d8" />
        </LineChart>
         : null }
      </div>
    )
  }
}

export default Landing
