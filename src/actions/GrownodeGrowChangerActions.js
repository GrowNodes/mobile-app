import { Base } from '../utils'
import { mqttSend } from './MqttActions'

export const FBGN_SETTINGS_CHANGING = 'Changing firebase grownode settings'
export const FBGN_SETTINGS_CHANGED = 'Changed firebase grownode settings'
export const FBGN_SETTINGS_CHANGE_FAILED = 'Failed to change firebase grownode settings'

function sendGrownodeSettingsToFirebase (nodeSettingsObj, grownodeId) {
  return (dispatch) => {
    dispatch({ type: FBGN_SETTINGS_CHANGING, grownodeId })

    return Base.post(`grownodes/${grownodeId}/settings`, {
      data: nodeSettingsObj
    })
    .then(() => {
      dispatch({ type: FBGN_SETTINGS_CHANGED })
    })
    .catch(error => {
      dispatch({ type: FBGN_SETTINGS_CHANGE_FAILED, error })
    })
  }
}

function sendGrownodeSettingsToMqtt (nodeSettingsObj, grownodeId) {
  return (dispatch) => {
    const msgToPush = JSON.stringify({ settings: nodeSettingsObj })
    dispatch(mqttSend(`${grownodeId}/$implementation/config/set`, msgToPush))
  }
}

function sendGrownodeSettings (nodeSettingsObj, grownodeId) {
  return (dispatch) => {
    return dispatch(sendGrownodeSettingsToFirebase(nodeSettingsObj, grownodeId))
    .then(() => dispatch(sendGrownodeSettingsToMqtt(nodeSettingsObj, grownodeId)))
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

    dispatch(sendGrownodeSettings(objToPush, grownodeId))
  }
}
