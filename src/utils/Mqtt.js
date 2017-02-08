import mqtt from 'mqtt';
import * as MQTT_ACTION_TYPES from '../actions/types';
// See index.js
export default class Mqtt {
    constructor(url, dispatcher, topics) {
        console.log("construtro")
        var parent = this;
        this.client  = mqtt.connect(`mqtt://${url}:9001`);
        this.dispatcher = dispatcher

        this.client.on('connect', function () {
            console.log("connect")
            console.log(topics)
            for (var i = topics.length - 1; i >= 0; i--) {
                parent.client.subscribe("nodes/"+topics[i]+"/#")
                parent.client.publish(topics[i], 'Hello mqtt')
            }
            dispatcher(MQTT_ACTION_TYPES.MQTT_CONNECTED, null)
        })

        this.client.on('message', function(topic, payload) {
            dispatcher(topic, payload.toString())
        })

        const dispatchDisconnected = function() {
            console.log('dispatching disconnected');
          dispatcher(MQTT_ACTION_TYPES.MQTT_DISCONNECTED, null)
        }

        this.client.on('offline', dispatchDisconnected)
        this.client.on('error', dispatchDisconnected)
        this.client.on('close', dispatchDisconnected)
        this.client.on('reconnect', dispatchDisconnected)
    }

    sendMessage(topic, message) {
        this.client.publish(`nodes/${topic}`, message)
        console.log("index.js:39 posting message", topic, message);
        return true;
    }

    close() {
        this.client.end();
    }

}
