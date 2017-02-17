import {FIREBASE_CONNECTED, FIREBASE_DISCONNECTED } from '../actions'

const initialState = {
  connected: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FIREBASE_CONNECTED:
      return { connected: true }
    case FIREBASE_DISCONNECTED:
      return initialState
    default:
      return state
  }
}
