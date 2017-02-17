import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Content, Card, CardItem, Body, Text, H1, H2, H3 } from 'native-base'
import GrownodeTodoList from '../components/GrownodeTodoList'

class GrownodeControl extends Component {
  render () {
    const { selectedGrownodeId, grownode, grownodeMqtt } = this.props
    const configObj = grownodeMqtt['$implementation/config_obj']
    return (
      <Container>
        <Content>
          <Card>
            <CardItem button onPress={() => Actions.GrownodeGrowChanger({selectedGrownodeId})}>
              <H1>Cycle Status</H1>
            </CardItem>
            <CardItem>
              <Text>{configObj.settings.stage_name} stage since {configObj.settings.stage_start_at}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <H1>Environment</H1>
            </CardItem>
            <CardItem>
              <Text>
                Light: {grownodeMqtt['grow_light/on'] ? 'ON' : 'OFF'}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Water Pump: {grownodeMqtt['water_pump/on'] ? 'ON' : 'OFF'}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Air Temperature: {grownodeMqtt['air_sensor/temperature']} °F
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Air Humidity: {grownodeMqtt['air_sensor/humidity']}%
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <H1>Todo List</H1>
              </Body>
            </CardItem>
            <GrownodeTodoList todo_list={grownode.todo_list} selectedGrownodeId={selectedGrownodeId} />
          </Card>

          <Card>
            <CardItem>
              <Body>
                <H1>Switches</H1>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                    render switchers here
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <H1>System</H1>
              </Body>
            </CardItem>
            <CardItem>
              <Text>
                  Harware serial number {grownode.id}
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                  Wifi Connection: {grownodeMqtt['$online'] ? 'online' : 'offline'}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  grownode: {
    ...state.grownodes.data[ownProps.selectedGrownodeId],
    id: ownProps.selectedGrownodeId
  },
  grownodeMqtt: state.grownodesMqtt[ownProps.selectedGrownodeId]
})

export default connect(mapStateToProps)(GrownodeControl)
