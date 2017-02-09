import React, { Component } from 'react'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Navigation
import AppNavigation from './AppNavigation'

console.disableYellowBox = true


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    )
  }
}

export default App
