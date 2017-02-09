import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scene, Router, Actions } from 'react-native-router-flux'
import Store from './Store'
import LoginForm from './components/LoginForm'
import GrownodesList from './screens/GrownodesList'
import EmployeeCreate from './components/EmployeeCreate'
import GrownodeEdit from './components/GrownodeEdit'
import { logoutUser } from './actions'
import { Base } from './utils'
import HomeScreen from './screens/HomeScreen'
import TabIcon from './components/TabIcon'

const RouterWithRedux = connect()(Router)

class RouterComponent extends Component {
  componentWillMount() {
    // Listen for firebase auth and kick the user if not valid
    Base.auth().onAuthStateChanged((user) => {
      console.log('onAuthStateChanged user:', user)
      if (!user && this.props.user) {
        // Clearing saved user
        Store.dispatch(logoutUser())
      }
    })
  }

  createScenes() {
    return Actions.create(
      // We are optimistically assuming any persisted user is valid
      // and setting the initial scene to "main".
      // Firebase will verify auth later asyncly (see App.js)

      // Scenes read from top down
      <Scene key="root">
        <Scene key="auth" >
          <Scene key="login" component={LoginForm} title="Please Login" direction="vertical" />
        </Scene>

        {/* set initial to true if user exists */}
        <Scene key="main" initial={this.props.user} tabs >
          <Scene key="home" title="Home" component={HomeScreen} icon={TabIcon} />
          <Scene
            key="employeeList"
            component={GrownodesList}
            title="Grow Nodes"
            rightTitle="Add"
            onRight={() => Actions.employeeCreate()}
            icon={TabIcon}
          />
          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Community"
            icon={TabIcon}
          />
          <Scene
            key="GrownodeEdit"
            component={GrownodeEdit}
            title="Shop"
            icon={TabIcon}
          />
        </Scene>
      </Scene>,
    )
  }

  render() {
    if (this.props.render) {
      return <RouterWithRedux scenes={this.createScenes()} />
    }
    return null
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(RouterComponent)
