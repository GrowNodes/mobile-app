// import Moment from 'moment'
//
// export const formatNodeSettings = (cylce_obj) => {
//     var obj_to_push = _.cloneDeep(cylce_obj)
//
//     // var new_stage = {}
//     // new_stage.from_rel = parseInt(obj_to_push.from_rel)
//     // new_stage.to_rel = parseInt(obj_to_push.to_rel)
//     // new_stage.light_on_at = parseInt(obj_to_push.light_on_at)
//     // new_stage.light_off_at = parseInt(obj_to_push.light_off_at)
//     // new_stage.air_temp_high = parseInt(obj_to_push.air_temp_high)
//     // new_stage.air_temp_low = parseInt(obj_to_push.air_temp_low)
//
//     delete obj_to_push.stage_name
//     // delete obj_to_push.status
//     obj_to_push = {settings: obj_to_push}
//
//     const text_to_push = JSON.stringify(obj_to_push)
//     return text_to_push
// }

export * from './Base'
export * from './Mqtt'
