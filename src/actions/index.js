import { grownodesFetch } from './GrownodesActions'
import { mqttConnect, mqttSubscribe } from './MqttActions'

export * from './AuthActions'
export * from './GrownodesActions'
export * from './MqttActions'


export function fetchGrownodesAndConnectToMqtt() {
  return (dispatch) => {
    return dispatch(grownodesFetch()).then(() => {
      return dispatch(mqttConnect()).then(() => {
        // return dispatch(mqttSubscribe(['woppa?']))
        console.log("oh")
      })
    })
  }
}
