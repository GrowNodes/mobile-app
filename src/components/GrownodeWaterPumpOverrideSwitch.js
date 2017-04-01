import React, { Component } from 'react'
import { Switch } from 'react-native'
import { ListItem, Text } from 'native-base'
import Mqtt from '../utils/Mqtt'

// TODO refactor into parent class, and pass in props from GrownodeControl
// DRY up the code
class GrownodeWaterPumpOverrideSwitch extends Component {
  constructor (props) {
    super(props)
    this.state = { render: false }
  }

  handleWaterPumpChange (value) {
    Mqtt.sendMessage(`${this.props.selectedGrownodeId}/water_pump_override/enabled/set`, value ? 'true' : 'false')
  }

  render () {
    const { grownodeMqtt } = this.props
    // TODO fix the jank when switching. maybe use a spinner
    return (
      <Switch
        onValueChange={this.handleWaterPumpChange.bind(this)}
        value={grownodeMqtt['water_pump_override/enabled']} />
    )
  }
}

export default GrownodeWaterPumpOverrideSwitch
