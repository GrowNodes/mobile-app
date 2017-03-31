import { grownodesFetch, grownodesSync } from './GrownodesActions'
import Mqtt from '../utils/Mqtt'

export * from './AuthActions'
export * from './GrownodesActions'
export * from './MqttActions'
export * from './GrownodeTodoListActions'
export * from './NotificationActions'
export * from './FirebaseStatusActions'

export function fetchGrownodesAndConnectToMqtt () {
  return (dispatch, getState) => {
    return dispatch(grownodesFetch())
    .then(() => dispatch(grownodesSync()))
    .then(() => {
      const serials = Object.keys(getState().grownodes.data)
      const topics = serials.map((serial) => {
        return `nodes/${serial}/#`
      })
      Mqtt.subscribeToTopics(topics)
    })
    // .catch(error => {
    //   console.warn('fetchGrownodesAndConnectToMqtt', error)
    // })
  }
}
