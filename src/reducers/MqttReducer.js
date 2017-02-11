import {
  MQTT_CONNECTED,
  MQTT_DISCONNECTED,
  MQTT_SENT,
  MQTT_RECEIVED,
  MQTT_SUBSCRIBED
} from '../actions/MqttActions'

const initialState = {
  connected: false,
  last_sent_message: {},
  last_received_message: {},
  subscriptions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MQTT_CONNECTED:
      return { ...state, connected: true }
    case MQTT_DISCONNECTED:
      return initialState
    case MQTT_SENT:
      return { ...state, last_sent_message: action.payload }
    case MQTT_RECEIVED:
      return { ...state, last_received_message: action.payload }
    case MQTT_SUBSCRIBED:
      return { ...state, subscriptions: [...state.subscriptions, action.payload] }
    default:
      return state
  }
}
