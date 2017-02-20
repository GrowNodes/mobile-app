import React, { Component } from 'react'
import { List, ListItem, Text } from 'native-base'
// import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

class WifiApList extends Component {
  handlePress (todoItem) {
    Actions.ProvisioningWifiPsk()
  }

  render () {
    if (_.isEmpty(this.props.networks)) {
      return <Text>None</Text>
    }

    return (
      <List dataArray={this.props.networks}
        renderRow={(network) =>
          <ListItem onPress={this.handlePress.bind(this, network)}>
            <Text>{network.rssi} {network.encryption} | {network.ssid}</Text>
          </ListItem>
        }
      />
    )
  }
}
export default WifiApList
