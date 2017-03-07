import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Match } from 'react-router'
import { Provider } from 'mobx-react'
import Landing from 'containers/Landing'
import { MainStore } from 'store/Store'

import 'less/style.less'
import 'less/normalize.less'

class App extends React.Component {
  mainStore = new MainStore()
  render () {
    return (
      <Provider mainStore={this.mainStore}>
        <BrowserRouter>
          <div className='app'>
            <Match exactly pattern='/' component={Landing} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
