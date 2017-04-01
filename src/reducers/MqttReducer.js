import {
  MQTT_CONNECTED,
  MQTT_DISCONNECTED,
  MQTT_SUBSCRIBED,
  MQTT_SUBSCRIBED_ALL
} from '../actions/MqttActions'

const initialState = {
  connected: false,
  subscriptions: [],
  allSubscribed: false // maybe a condition where on reconnect this won't be set to true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MQTT_CONNECTED:
      return { ...state, connected: true }
    case MQTT_DISCONNECTED:
      return initialState
    case MQTT_SUBSCRIBED:
      return { ...state, subscriptions: [...state.subscriptions, action.payload] }
    case MQTT_SUBSCRIBED_ALL:
      return {
        ...state, allSubscribed: true
      }
    default:
      return state
  }
}
