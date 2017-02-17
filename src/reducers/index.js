import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RouterReducer from './RouterReducer'
import GrownodesReducer from './GrownodesReducer'
import GrownodesMqttReducer from './GrownodesMqttReducer'
import MqttReducer from './MqttReducer'
import FirebaseStatusReducer from './FirebaseStatusReducer'

export default combineReducers({
  router: RouterReducer,
  auth: AuthReducer,
  mqtt: MqttReducer,
  firebaseStatus: FirebaseStatusReducer,
  grownodes: GrownodesReducer,
  grownodesMqtt: GrownodesMqttReducer
})
