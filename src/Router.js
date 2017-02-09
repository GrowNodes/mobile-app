import React, { Component } from 'react'
import { Navigator } from 'react-native'
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
import GrownodeControl from './screens/GrownodeControl'
const RouterWithRedux = connect()(Router)


const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    // flex: 1,
    // backgroundColor: '#fff',
    // shadowColor: null,
    // shadowOffset: null,
    // shadowOpacity: null,
    // shadowRadius: null,
  }

  // Fix navbar overlap see
  // https://github.com/aksonov/react-native-router-flux/issues/103#issuecomment-218375308
  // https://github.com/aksonov/react-native-router-flux/issues/836#issuecomment-227142091
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ?
    0 : Navigator.NavigationBar.Styles.General.TotalNavHeight
    style.marginBottom = computedProps.hideTabBar ? 0 : 50
  }
  return style
}


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
        <Scene key="main" initial={this.props.user} tabs>
          <Scene key="home" title="Home" component={HomeScreen} icon={TabIcon} />
          <Scene key="grownodes" icon={TabIcon} title="Grow Nodes" >

            <Scene
              key="list"
              component={GrownodesList}
              title="Your Grow Nodes"
              rightTitle="Add"
              onRight={() => Actions.employeeCreate()}
            />
            <Scene key="control" component={GrownodeControl} title="Grow Node" />
          </Scene>

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
      return (
        <RouterWithRedux
          scenes={this.createScenes()}
          getSceneStyle={getSceneStyle}

          onExitApp={() => true} // ANDROID: don't exit on back @todo exit after 3 presses
        />
      )
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
