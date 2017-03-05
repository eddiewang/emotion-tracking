import React from 'react'

import Title from 'components/Title'
import Webcam from 'components/Webcam'
import { postRequest } from 'utils/fetch'
import { LineChart, Line, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from 'recharts'
import ReactHighcharts from 'react-highcharts'
const emotionData = { "Angry": 0.1240934516, "Sad": 0.391903375, "Neutral": 0.1427304191, "Surprise": 0.1225001438, "Fear": 0.1069961407, "Happy": 0.1117764698 }


const options = {
    chart: {
        type: 'area'
        }
    ,
    title: {
        text: 'Emotional Impact of Ad Based on Current Facial State'
    },
    subtitle: {
        text: 'Source: Indico API'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 1000
    },
    yAxis: {
        title: {
            text: 'Percent'
        }
    },
    tooltip: {
        formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            ReactHighcharts.Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            ReactHighcharts.Highcharts.numberFormat(this.y, 2);
                    }
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#ffffff'
            }
        }
    },
    series: [{
        name: 'Angry',
        data: []
    }, {
        name: 'Sad',
        data: []
    }, {
        name: 'Neutral',
        data: []
    }, {
        name: 'Fear',
        data: []
    }, {
        name: 'Surprise',
        data: []
    }, {
        name: 'Happy',
        data: []
    }
    ]
}

class Landing extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      screenshot: null,
      emotions: [],
      start: false
    }
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.start) {
        const image = {
          image: this.refs.webcam.getScreenshot()
        }
        const fetchEmotion = postRequest('/emotion', image, (err) => console.log(err))
        .then((result) => {
          let chart = this.refs.chart.getChart();
          let [Angry, Sad, Neutral, Fear, Surprise, Happy] = chart.series
          console.log(chart.series)
          const date = (new Date()).getTime()
          const emotions = result.data.result
          console.log(date, emotions)
          Angry.addPoint({x: date, y: emotions.Angry})
          Sad.addPoint({x: date, y: emotions.Sad})
          Neutral.addPoint({x: date, y:emotions.Neutral})
          Surprise.addPoint({x: date, y: emotions.Surprise})
          Fear.addPoint({x: date, y: emotions.Fear})
          Happy.addPoint({x: date, y: emotions.Happy})
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
        <ReactHighcharts config={options} ref="chart" />
      </div>
    )
  }
}

export default Landing
