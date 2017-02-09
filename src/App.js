import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import RouterComponent from './Router'
import Store from './Store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { render: false }
  }

  componentWillMount() {
    /* eslint-disable
    Use these lines to wipe the stored redux state on boot */

    // persistStore(Store, {blacklist: ['mqtt'],storage: AsyncStorage,}).purge()
    // Base.unauth()

    /* eslint-enable */


    // @todo refactor this
    persistStore(Store, {
      blacklist: ['mqtt'],
      storage: AsyncStorage,
      transforms: [
        createFilter('auth', ['user']),     // save only a subset of auth reducer
      ],
    }, () => {
      // Finished hydrating store, can render router now
      this.setState({ render: true })
    })

    console.info('"Possible unhandled promise rejection warning" is coming from devToolsEnhancer, ignore it!')
  }


  render() {
    return (
      <Provider store={Store}>
        <RouterComponent render={this.state.render} />
      </Provider>
    )
  }
}

export default App
