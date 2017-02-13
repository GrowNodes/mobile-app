/* global Paho */
import init from 'react_native_mqtt'
import { AsyncStorage } from 'react-native'
import uuid from 'uuid'

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: { }
})

export const Mqtt = new Paho.MQTT.Client('159.203.220.150', 9001, uuid.v4()) // replace with device uuid
export const MqttMessage = Paho.MQTT.Message
