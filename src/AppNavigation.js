

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from './AppNavigationConfig'

// Redux
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabBar,
  }
}

class AppNavigation extends React.Component {

  render() {
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(AppNavigation)
