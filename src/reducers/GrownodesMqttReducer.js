import { MQTT_RECEIVED } from '../actions/MqttActions'
import { stringToBoolOrString } from '../utils'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case MQTT_RECEIVED:
      const { topic, messageString } = action.payload
      // Remove /nodes/serialnumber/ from topic
      // and then dispatch action
      const serial = topic.split('/')[1]
      let subtopic = topic.substring(topic.indexOf('/') + 1)
      subtopic = subtopic.substring(subtopic.indexOf('/') + 1)

      let payloadToSave = stringToBoolOrString(messageString) // cast to bool if 'true' || 'false', else return

      let objToReturn = {
        ...state,
        [serial]: {
          ...state[serial],
          [subtopic]: payloadToSave
        }
      }

      // Parse and save custom config too
      if (subtopic === '$implementation/config') {
        objToReturn[serial]['$implementation/config_obj'] = JSON.parse(payloadToSave)
      }

      return objToReturn
    default:
      return state
  }
}
