import { Base } from '../utils'
import { mqttSend } from './MqttActions'

function sendGrownodeSettingsToMqtt (nodeSettingsObj, grownodeId) {
  return (dispatch) => {
    const msgToPush = JSON.stringify({ settings: nodeSettingsObj })
    dispatch(mqttSend(`${grownodeId}/$implementation/config/set`, msgToPush))
  }
}

export function changeGrownodeGrowStage (newStage, grownodeId) {
  return (dispatch, getState) => {
    let objToPush = {}

    objToPush.stage_start_at = Math.floor(new Date() / 1000)  // epoch time, seconds

    switch (newStage) {
      case 'vegetation':
        objToPush['stage_name'] = 'vegetation'
        objToPush['light_on_at'] = 6
        objToPush['light_off_at'] = 22
        break
      case 'flowering':
        objToPush['stage_name'] = 'flowering'
        objToPush['light_on_at'] = 6
        objToPush['light_off_at'] = 18
        break
    }

    dispatch(sendGrownodeSettingsToMqtt(objToPush, grownodeId))
  }
}
