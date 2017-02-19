import { Mqtt, MqttMessage } from '../utils'

export const MQTT_CONNECTING = 'MQTT_CONNECTING'
export const MQTT_CONNECTED = 'MQTT_CONNECTED'
export const MQTT_DISCONNECTED = 'MQTT_DISCONNECTED'
export const MQTT_SENT = 'MQTT_SENT'
export const MQTT_RECEIVED = 'MQTT_RECEIVED'

export const MQTT_SUBSCRIBE_MULTIPLE = 'Starting to subscribe to many MQTT topics'
export const MQTT_SUBSCRIBED = 'Subscribed to MQTT topic'
export const MQTT_SUBSCRIBE_FAILED = 'Failed to subscribe to a MQTT topic'

export function mqttDisconnect () {
  Mqtt.disconnect()
  return {
    type: MQTT_DISCONNECTED
  }
}

export function mqttSubscribe (topics) {
  return dispatch => {
    dispatch({type: MQTT_SUBSCRIBE_MULTIPLE, payload: topics})

    return new Promise((resolve, reject) => {
      const onSuccess = ({ invocationContext }) => {
        dispatch({ type: MQTT_SUBSCRIBED, payload: invocationContext.topic })
        resolve(MQTT_SUBSCRIBED)
      }

      const onFailure = ({ invocationContext }) => {
        dispatch({ type: MQTT_SUBSCRIBE_FAILED, payload: invocationContext.topic })
        reject(new Error(MQTT_SUBSCRIBE_FAILED))
      }

      topics.forEach((topic) => {
        Mqtt.subscribe(topic, {
          onSuccess,
          onFailure,
          invocationContext: { topic }
        })
      })
    })
  }
}

export function mqttSend (topic, body) {
  const topicWithRoot = `nodes/${topic}`
  console.info('mqttSend:', topicWithRoot, body)
  const pahoMessage = new MqttMessage(body)
  pahoMessage.destinationName = topicWithRoot

  Mqtt.send(pahoMessage)
  return { type: MQTT_SENT, payload: pahoMessage }
}

export function mqttConnect () {
  return (dispatch, getState) => {
    if (getState().mqtt.connected) {
      return Promise.resolve(MQTT_CONNECTED)
    }

    dispatch({ type: MQTT_CONNECTING })

    return new Promise((resolve, reject) => {
      const onConnect = () => {
        dispatch({ type: MQTT_CONNECTED })
        resolve(MQTT_CONNECTED)
      }

      const onConnectFail = () => {
        dispatch({ type: MQTT_DISCONNECTED })
        reject(new Error('Failed to connect to MQTT'))
      }

      Mqtt.onConnectionLost = (responseObject) => {
        dispatch({
          type: MQTT_DISCONNECTED,
          payload: responseObject
        })
      }

      Mqtt.onMessageArrived = (pahoMessage) => {
        // destructure
        const {
          destinationName,
          duplicate,
          payloadBytes,
          payloadString,
          qos,
          retained
        } = pahoMessage

        dispatch({
          type: MQTT_RECEIVED,
          payload: { destinationName, duplicate, payloadBytes, payloadString, qos, retained }
        })
      }

      // Call the connect function
      Mqtt.connect({
        onSuccess: onConnect,
        onFailure: onConnectFail
      })
    })
  }
}
