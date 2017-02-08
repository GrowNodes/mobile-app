import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, CardSection, Button } from './common'
// import EmployeeForm from './EmployeeForm'

class GrownodeEdit extends Component {
  componentWillMount() {
    // _.each(this.props.employee, (value, key) => {
      // Update employee form reducer with the employee data.. lmfao what a hack.
      // this.props.employeeUpdate({ prop: key, value })
    // })
    console.log(this.props.employee)
  }

  onSettingsButtonPress() {
    // const { name, phone, shift } = this.props
    // console.log(name, phone, shift)
  }

  render() {
    const { id } = this.props.employee
    return (
      <Card>
        <CardSection>
          <Text>
            Serial number {id}
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            Online
          </Text>
        </CardSection>
        <CardSection>
          <Text>
            Temp grow light fan etc
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.onSettingsButtonPress.bind(this)}>Change Settings</Button>
        </CardSection>
      </Card>
    )
  }
}

export default GrownodeEdit
