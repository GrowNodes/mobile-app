import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import devToolsEnhancer from 'remote-redux-devtools'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import Router from './Router'

import { Base } from './utils'
import { setLoginSuccess } from './actions'

const store = createStore(rootReducer, devToolsEnhancer(), applyMiddleware(ReduxThunk))

class App extends Component {

  componentWillMount() {
    console.info('"Possible unhandled promise rejection warning" is coming from devToolsEnhancer, ignore it!')

    // Listen for auth
    Base.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(setLoginSuccess(user))
      }
    })
  }


  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
