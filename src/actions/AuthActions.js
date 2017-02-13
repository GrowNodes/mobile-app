import { Actions } from 'react-native-router-flux'
import { Base } from '../utils'

export const EMAIL_SET_STATE = 'email_changed'
export const PASSWORD_SET_STATE = 'pw_changed'
export const LOGIN_USER_START = 'starting to login user'
export const LOGIN_USER_SUCCESS = 'login user success'
export const LOGIN_USER_FAILED = 'login user failed'
export const LOGOUT_USER = 'logout user'

export const emailSetState = (text) => {
  return {
    type: EMAIL_SET_STATE,
    payload: text
  }
}

export const passwordSetState = (password) => {
  return {
    type: PASSWORD_SET_STATE,
    payload: password
  }
}

export const loginUserWithCreds = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START })

    Base.authWithPassword({ email, password }, (error, user) => {
      if (error) {
        dispatch({ type: LOGIN_USER_FAILED, payload: error.message })
      } else {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
        Actions.HomeScreen({ type: 'reset' })
      }
    })
  }
}

export const logoutUser = () => {
  Actions.auth({ type: 'reset' })
  return { type: LOGOUT_USER }
}
