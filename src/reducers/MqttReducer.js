import {
  MQTT_CONNECTED,
  MQTT_DISCONNECTED,
  MQTT_SUBSCRIBED
} from '../actions/MqttActions'

const initialState = {
  connected: false,
  subscriptions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MQTT_CONNECTED:
      return { ...state, connected: true }
    case MQTT_DISCONNECTED:
      return initialState
    case MQTT_SUBSCRIBED:
      return { ...state, subscriptions: [...state.subscriptions, action.payload] }
    default:
      return state
  }
}
