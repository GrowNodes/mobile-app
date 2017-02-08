import {
  EMAIL_SET_STATE,
  PASSWORD_SET_STATE,
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../actions'

const initialState = {
  email: 'example@mail.com',
  password: '123123123',
  user: null,
  error: '',
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SET_STATE:
      return { ...state, email: action.payload }
    case PASSWORD_SET_STATE:
      return { ...state, password: action.payload }

    case LOGIN_USER_START:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: '',
        password: '',
        loading: false,
      }
    case LOGIN_USER_FAILED:
      return {
        ...state,
        error: action.payload,
        password: '',
        loading: false,
      }
    default:
      return state
  }
}
