export const FIREBASE_CONNECTED = 'connected to firebase'
export const FIREBASE_DISCONNECTED = 'disconnected from firebase'

import { Base } from '../utils'

export function listenToFirebaseConnectionState () {
  return (dispatch) => {
    Base.database().ref('.info/connected').on('value', function (snap) {
      if (snap.val() === true) {
        dispatch({ type: FIREBASE_CONNECTED })
      } else {
        dispatch({ type: FIREBASE_DISCONNECTED })
      }
    })
  }
}
