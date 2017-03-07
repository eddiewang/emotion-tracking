import React from 'react'

import Title from 'components/Title'
import Webcam from 'components/Webcam'
import { postRequest } from 'utils/fetch'
import { LineChart, Line, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts'
import ReactHighcharts from 'react-highcharts'
import { inject, observer } from 'mobx-react'
import { darkUnica, dynamicLineGraph } from 'utils/highcharts'

@inject('mainStore')
@observer
class Landing extends React.Component {

  constructor(props) {
    super(props)
    ReactHighcharts.Highcharts.setOptions(darkUnica)
    ReactHighcharts.Highcharts.setOptions({
      global: {
        useUTC: false
      },
      credits: {
        enabled: false
      }
    })
    ReactHighcharts.Highcharts.createElement('link', {
      href: 'https://fonts.googleapis.com/css?family=Unica+One',
      rel: 'stylesheet',
      type: 'text/css'
    }, null, document.getElementsByTagName('head')[0])
    this.state = {
      start: false
    }
  }
  
  componentDidMount() {
    setInterval(() => {
      if (this.state.start) this.fetchEmotion(this.getScreenshot())
    }, 3000) 
  }

  fetchEmotion = (image) => {
    postRequest('/microsoft/emotion', { image }, (err) => console.log(err))
      .then((response) => {
        console.log(response.data)
        response.data.forEach((el) => {
          this.props.mainStore.emotions.push(el['scores'])
        })
      })
  }

  getScreenshot = () => this.refs.webcam.getScreenshot()

  capture = () => {
    this.setState({
      start: !this.state.start
    })
  }

  graphConfig = () => {
    return dynamicLineGraph('Happiness')
  }

  render() {
    return (
      <div className='main-container'>
        <div className="left-container">
          <Webcam className='webcam' screenshotFormat="image/png" height={300} width={300} audio={false} ref="webcam" />
          <div className="record">
            <a href="#" className="play-btn"></a>
          </div>
        </div>
        <div className="right-container">
          <h1>Video</h1>
        </div>
      </div>
    )
  }
}

export default Landing
