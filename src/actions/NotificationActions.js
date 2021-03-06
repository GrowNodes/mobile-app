import { Base } from '../utils'

export const saveFCMToken = (token) => {
  return (dispatch, getState) => {
    const uid = getState().auth.user.uid
    return Base.update(`fcm_tokens/${token}`, {
      data: {
        uid,
        updated: new Date()
      }
    })
  }
}

export const removeFCMToken = (token) => {
  return (dispatch) => {
    return Base.remove(`fcm_tokens/${token}`)
  }
}
