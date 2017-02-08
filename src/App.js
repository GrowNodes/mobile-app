import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'

import Router from './Router'
import { Base } from './utils'


import Store from './Store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { rehydrated: false }
  }

  componentWillMount() {
    persistStore(Store, {
      blacklist: ['mqtt'],
      storage: AsyncStorage,
    }, () => {
      // Finished hydrating store
      this.setState({ rehydrated: true })
    })
    // Listen for firebase auth and kick the user if not valid
    Base.auth().onAuthStateChanged((user) => {
      if (!user) {
        console.info('call logout action here')
      }
    })


    console.info('"Possible unhandled promise rejection warning" is coming from devToolsEnhancer, ignore it!')
  }


  render() {
    return (
      <Provider store={Store}>
        <Router render={this.state.rehydrated} />
      </Provider>
    )
  }
}

export default App
