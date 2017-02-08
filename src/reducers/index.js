import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
// import EmployeeFormReducer from './EmployeeFormReducer'
import GrownodesReducer from './GrownodesReducer'
import MqttReducer from './MqttReducer'

export default combineReducers({
  auth: AuthReducer,
  // employeeForm: EmployeeFormReducer,
  mqtt: MqttReducer,
  grownodes: GrownodesReducer,
})
