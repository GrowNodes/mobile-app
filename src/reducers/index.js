import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import RouterReducer from './RouterReducer'
// import EmployeeFormReducer from './EmployeeFormReducer'
import GrownodesReducer from './GrownodesReducer'
import MqttReducer from './MqttReducer'

export default combineReducers({
  router: RouterReducer,
  auth: AuthReducer,
  // employeeForm: EmployeeFormReducer,
  mqtt: MqttReducer,
  grownodes: GrownodesReducer,
})
