export const MQTT_CONNECTED = 'MQTT_CONNECTED'
export const MQTT_DISCONNECTED = 'MQTT_DISCONNECTED'
export const MQTT_SUBSCRIBED = 'Subscribed to MQTT topic'
export const MQTT_RECEIVED = 'MQTT_RECEIVED'

export function mqttConnected () {
  return { type: MQTT_CONNECTED }
}

export function mqttDisconnected () {
  return {
    type: MQTT_DISCONNECTED
  }
}

export function mqttSubscribed (topic) {
  return {
    type: MQTT_SUBSCRIBED,
    payload: topic
  }
}

export function mqttMessageArrived (topic, messageString) {
  return {
    type: MQTT_RECEIVED,
    payload: { topic, messageString }
  }
}
