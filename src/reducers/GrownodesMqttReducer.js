import { MQTT_RECEIVED } from '../actions/MqttActions'
import { stringToBoolOrString } from '../utils'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case MQTT_RECEIVED:
      const { destinationName, payloadString } = action.payload
      // Remove /nodes/serialnumber/ from topic
      // and then dispatch action
      const serial = destinationName.split('/')[1]
      let subtopic = destinationName.substring(destinationName.indexOf('/') + 1)
      subtopic = subtopic.substring(subtopic.indexOf('/') + 1)

      return {
        ...state,
        [serial]: {
          ...state[serial],
          [subtopic]: stringToBoolOrString(payloadString)
        }
      }
    default:
      return state
  }
}
