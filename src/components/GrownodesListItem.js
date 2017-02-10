import React, { Component } from 'react'
import { ListItem, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

class GrownodesListItem extends Component {
  onRowPress () {
    Actions.control({ selectedGrownodeId: this.props.grownode.id })
  }

  render () {
    const { serial } = this.props.grownode

    return (
      <ListItem onPress={this.onRowPress.bind(this)}>
        <Text>{serial}</Text>
      </ListItem>
    )
  }
}

export default GrownodesListItem
