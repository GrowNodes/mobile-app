import { Mqtt } from '../utils'

export const MQTT_CONNECTED = 'MQTT_CONNECTED'
export const MQTT_DISCONNECTED = 'MQTT_DISCONNECTED'
export const MQTT_SENT = 'MQTT_SENT'
export const MQTT_RECEIVED = 'MQTT_RECEIVED'

export function mqttDisconnect() {
  Mqtt.disconnect()
  return {
    type: MQTT_DISCONNECTED,
  }
}

export function mqttSubscribe(topics) {
  console.log(topics)
  // topics.forEach((topic) => {
  //   Mqtt.subscribe(topic)
  // })
}

export function mqttSend(topic, body) {
  const pahoMessage = new Mqtt.MQTT.Message(body)
  pahoMessage.destinationName = topic

  Mqtt.send(pahoMessage)
  return { type: MQTT_SENT, payload: pahoMessage }
}

export function mqttConnect() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const onConnect = () => {
        dispatch({ type: MQTT_CONNECTED })
        resolve()
      }

      const onConnectFail = () => {
        dispatch({ type: MQTT_DISCONNECTED })
        reject()
      }

      Mqtt.onConnectionLost = (responseObject) => {
        dispatch({
          type: MQTT_DISCONNECTED,
          payload: responseObject,
        })
      }

      Mqtt.onMessageArrived = (pahoMessage) => {
        dispatch({
          type: MQTT_RECEIVED,
          payload: pahoMessage,
        })
      }

      // Call the connect function
      Mqtt.connect({
        onSuccess: onConnect,
        onFailure: onConnectFail,
      })
    })
  }
}
