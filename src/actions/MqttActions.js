import { Mqtt } from '../utils' /* global Paho */

export const MQTT_CONNECTED = 'MQTT_CONNECTED'
export const MQTT_DISCONNECTED = 'MQTT_DISCONNECTED'
export const MQTT_SENT = 'MQTT_SENT'
export const MQTT_RECEIVED = 'MQTT_RECEIVED'

export function mqttDisconnect() {
  Paho.MQTT.Client.disconnect()
  return {
    type: MQTT_DISCONNECTED,
  }
}

export function mqttSend(topic, body) {
  const pahoMessage = new Paho.MQTT.Message(body)
  pahoMessage.destinationName = topic

  Mqtt.send(pahoMessage)
  return { type: MQTT_SENT, payload: pahoMessage }
}

export function mqttConnect() {
  return (dispatch, getState) => {
    if (getState().mqtt.connected) {
      return
    }

    const onConnect = () => {
      console.log('MQTT connected')
      dispatch({ type: MQTT_CONNECTED })
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


    Mqtt.connect({ onSuccess: onConnect })
  }
}
