import { grownodesFetch, grownodesSync } from './GrownodesActions'
import { mqttConnect, mqttSubscribe } from './MqttActions'

export * from './AuthActions'
export * from './GrownodesActions'
export * from './MqttActions'
export * from './GrownodeTodoListActions'

export function fetchGrownodesAndConnectToMqtt () {
  return (dispatch, getState) => {
    return dispatch(grownodesFetch())
    .then(dispatch(grownodesSync()))
    // .then(dispatch(mqttConnect()))
    // .then(dispatch(mqttSubscribe(Object.keys(getState().grownodes))))
  }
}
