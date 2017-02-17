import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'

import { AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import { Base } from './utils'
import RouterComponent from './Router'
import Store from './Store'
import { saveFCMToken, listenToFirebaseConnectionState } from './actions'
// import {Base} from './utils'

console.disableYellowBox = true

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { render: false }
  }

  componentWillMount () {
    Store.dispatch(listenToFirebaseConnectionState())

    /* eslint-disable
    Use these lines to wipe the stored redux state on boot */

    // persistStore(Store, {blacklist: ['mqtt'], storage: AsyncStorage }).purge()
    // Base.unauth()

    /* eslint-enable */

    // @todo refactor this
    persistStore(Store, {
      whitelist: ['auth'],
      storage: AsyncStorage,
      transforms: [
        createFilter('auth', ['user'])     // save only a subset of auth reducer
      ]
    }, () => {
      // Finished hydrating store, can render router now
      this.setState({ render: true })
      // Listen for user
      Base.auth().onAuthStateChanged((user) => {
        FCM.getFCMToken().then(token => {
          if (user) {
            Store.dispatch(saveFCMToken(token))
          } // can't remove FCM token here as the user is not logged in
        })
      })
    })

    console.info('"Possible unhandled promise rejection warning" is coming from devToolsEnhancer, ignore it!')
  }

  componentDidMount () {
    FCM.requestPermissions() // for iOS

    /* global alert */
    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      console.log(notif)
      alert('got something!')
      if (notif.local_notification) {
        alert('is local!')
      }
      if (notif.opened_from_tray) {
        alert('is tray!')
      }
    })
    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
      console.log('fcm token', token)
      // fcm token may not be available on first load, catch it here
    })
  }

  render () {
    return (
      <Provider store={Store}>
        <RouterComponent render={this.state.render} />
      </Provider>
    )
  }
}

export default App
