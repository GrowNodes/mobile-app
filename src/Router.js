import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Store from './Store'
import LoginForm from './components/LoginForm'
import GrownodesList from './components/GrownodesList'
import EmployeeCreate from './components/EmployeeCreate'
import GrownodeEdit from './components/GrownodeEdit'

class RouterComponent extends Component {
  renderRouter() {
    // We are optimistically assuming any persisted user is valid
    // and setting the initial scene to "main".
    // Firebase will verify auth later asyncly (see App.js)
    const user = Store.getState().auth.user

    // Scenes read from top down
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="auth" >
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>

        {/* set initial to true if user exists */}
        <Scene key="main" initial={user}>
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

  render() {
    if (this.props.render) {
      return this.renderRouter()
    }
    return null
  }
}

export default RouterComponent
