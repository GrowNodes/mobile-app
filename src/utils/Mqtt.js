const mqtt = require('mqtt/client')
import store from '../Store'
import {
  mqttConnected,
  mqttMessageArrived,
  mqttDisconnected,
  mqttSubscribed
} from '../actions/MqttActions'

class Mqtt {
  constructor () {
    // var parent = this
    this.client = mqtt.connect(`ws://iot.grownodes.com:9001`)

    this.client.on('connect', function () {
      store.dispatch(mqttConnected())
    })

    this.client.on('message', function (topic, payload) {
      store.dispatch(mqttMessageArrived(topic, payload.toString()))
    })

    this.client.on('offline', () => {
      console.log('MQTT connection offline')
      store.dispatch(mqttDisconnected())
    })
    this.client.on('error', () => {
      console.log('MQTT connection error')
      store.dispatch(mqttDisconnected())
    })
    this.client.on('close', () => {
      console.log('MQTT connection close')
      store.dispatch(mqttDisconnected())
    })
    this.client.on('reconnect', () => {
      console.log('MQTT connection reconnect')
      store.dispatch(mqttDisconnected())
    })
  }

  sendMessage (topic, message) {
    this.client.publish(`nodes/${topic}`, message)
    console.log('sending mqtt message', topic, message)
  }

  subscribeToTopics (topics) {
    for (var i = topics.length - 1; i >= 0; i--) {
      console.log(`subscribing to ${topics[i]}`)
      this.client.subscribe(topics[i])
      store.dispatch(mqttSubscribed(topics[i]))
    }
  }

  // close () {
  //   this.client.end()
  // }
}

// ES6 Singleton pattern
export default new Mqtt()
