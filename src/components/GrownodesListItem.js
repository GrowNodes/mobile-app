import React, { Component } from 'react'
import { ListItem, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

class GrownodesListItem extends Component {

  onRowPress() {
    Actions.control({ grownode: this.props.grownode })
  }

  render() {
    const { serial } = this.props.grownode

    return (
      <ListItem onPress={this.onRowPress.bind(this)}>
        <Text>{serial}</Text>
      </ListItem>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
}

export default GrownodesListItem
