import { Base } from '../utils'

export const saveFCMToken = (token) => {
  return (dispatch, getState) => {
    const uid = getState().auth.user.uid
    console.log(uid)
    return Base.update(`users/${uid}/fcm_tokens/${token}`, {
      data: {
        registered: new Date()
      }
    })
    .then(() => {
      console.log('it worked')
    })
    .catch(() => {
      console.log('it didnt work')
    })
  }
}
