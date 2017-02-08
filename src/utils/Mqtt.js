import init from 'react_native_mqtt'
import { AsyncStorage } from 'react-native'

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: { },
})

export const Mqtt = new Paho.MQTT.Client('test.mosquitto.org', 8080, 'sdfhkfdsa')
