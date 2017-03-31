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
    console.log('construtro')
    // var parent = this
    this.client = mqtt.connect(`mqtt://iot.grownodes.com:9001`)

    this.client.on('connect', function () {
      console.log('connect')
      store.dispatch(mqttConnected())
    })

    this.client.on('message', function (topic, payload) {
      store.dispatch(mqttMessageArrived(topic, payload.toString()))
    })

    const dispatchDisconnected = function () {
      console.log('dispatching disconnected')
      store.dispatch(mqttDisconnected())
    }

    this.client.on('offline', dispatchDisconnected)
    this.client.on('error', dispatchDisconnected)
    this.client.on('close', dispatchDisconnected)
    this.client.on('reconnect', dispatchDisconnected)
  }

  sendMessage (topic, message) {
    this.client.publish(`nodes/${topic}`, message)
    console.log('sending mqtt message', topic, message)
  }

  subscribeToTopics (topics) {
    for (var i = topics.length - 1; i >= 0; i--) {
      console.log('subscribing to')
      this.client.subscribe('nodes/' + topics[i] + '/#')
      store.dispatch(mqttSubscribed(topics[i]))
    }
  }

  close () {
    this.client.end()
    store.dispatch(mqttDisconnected())
  }
}

// ES6 Singleton pattern
export default new Mqtt()
