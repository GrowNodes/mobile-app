import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { CardSection } from './common'

class GrownodesListItem extends Component {

  onRowPress() {
    Actions.grownodeEdit({ grownode: this.props.grownode })
  }

  render() {
    console.log(this.props.grownode)
    const { serial } = this.props.grownode

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {serial}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
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
