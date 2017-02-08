import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
// import EmployeeFormReducer from './EmployeeFormReducer'
import GrownodesReducer from './GrownodesReducer'

export default combineReducers({
  auth: AuthReducer,
  // employeeForm: EmployeeFormReducer,
  grownodes: GrownodesReducer,
})
