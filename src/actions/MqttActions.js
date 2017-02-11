import { Mqtt } from '../utils'

export const MQTT_CONNECTING = 'MQTT_CONNECTING'
export const MQTT_CONNECTED = 'MQTT_CONNECTED'
export const MQTT_DISCONNECTED = 'MQTT_DISCONNECTED'
export const MQTT_SENT = 'MQTT_SENT'
export const MQTT_RECEIVED = 'MQTT_RECEIVED'
export const MQTT_SUBSCRIBED = 'MQTT_SUBSCRIBED'
export const MQTT_SUBSCRIBE_FAILED = 'Failed to subscribe to MQTT'

export function mqttDisconnect () {
  Mqtt.disconnect()
  return {
    type: MQTT_DISCONNECTED
  }
}

export function mqttSubscribe (topics) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const onSuccess = ({ invocationContext }) => {
        dispatch({ type: MQTT_SUBSCRIBED, payload: invocationContext.topic })
        resolve(MQTT_SUBSCRIBED)
      }

      const onFailure = ({ invocationContext }) => {
        dispatch({ type: MQTT_SUBSCRIBE_FAILED, payload: invocationContext.topic })
        reject(MQTT_SUBSCRIBE_FAILED)
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
  const pahoMessage = new Mqtt.MQTT.Message(body)
  pahoMessage.destinationName = topic

  Mqtt.send(pahoMessage)
  return { type: MQTT_SENT, payload: pahoMessage }
}

export function mqttConnect () {
  return (dispatch) => {
    dispatch({ type: MQTT_CONNECTING })

    return new Promise((resolve, reject) => {
      const onConnect = () => {
        dispatch({ type: MQTT_CONNECTED })
        resolve(MQTT_CONNECTED)
      }

      const onConnectFail = () => {
        dispatch({ type: MQTT_DISCONNECTED })
        reject('Failed to connect to MQTT')
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
