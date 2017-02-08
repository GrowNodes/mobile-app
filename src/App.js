import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import devToolsEnhancer from 'remote-redux-devtools'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './reducers'
import Router from './Router'

class App extends Component {

  componentWillMount() {
  }


  render() {
    const store = createStore(rootReducer, devToolsEnhancer(), applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
