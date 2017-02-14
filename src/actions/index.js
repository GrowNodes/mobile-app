import { grownodesFetch, grownodesSync } from './GrownodesActions'
import { mqttConnect, mqttSubscribe } from './MqttActions'

export * from './AuthActions'
export * from './GrownodesActions'
export * from './MqttActions'
export * from './GrownodeTodoListActions'
export * from './NotificationActions'

export function fetchGrownodesAndConnectToMqtt () {
  return (dispatch, getState) => {
    return dispatch(grownodesFetch())
    .then(() => dispatch(grownodesSync()))
    .then(() => dispatch(mqttConnect()))
    .then(() => {
      const serials = Object.keys(getState().grownodes)
      const topics = serials.map((serial) => {
        return `nodes/${serial}/#`
      })
      return dispatch(mqttSubscribe(topics))
    })
    // .catch(error => {
    //   console.warn('fetchGrownodesAndConnectToMqtt', error)
    // })
  }
}
