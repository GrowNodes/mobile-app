import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import GrownodesList from './components/GrownodesList'
import EmployeeCreate from './components/EmployeeCreate'
import GrownodeEdit from './components/GrownodeEdit'

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth" >
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>

      <Scene key="main" >
        <Scene
          key="employeeList"
          component={GrownodesList}
          title="Employees"
          rightTitle="Add"
          onRight={() => Actions.employeeCreate()}
        />
        <Scene
          key="employeeCreate"
          component={EmployeeCreate}
          title="Create Employee"
        />
        <Scene
          key="GrownodeEdit"
          component={GrownodeEdit}
          title="Edit Employee"
        />
      </Scene>
    </Router>
  )
}

export default RouterComponent
