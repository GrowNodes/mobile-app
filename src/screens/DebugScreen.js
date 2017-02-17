import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Card, CardItem, Body, Text, H1 } from 'native-base'

class DebugScreen extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <H1>MQTT</H1>
            </CardItem>
            <CardItem>
              <Text>{this.props.mqtt.connected ? 'Connected' : 'Disconnected'}</Text>
            </CardItem>
            <CardItem>
              <Text>Subscribed to {JSON.stringify(this.props.mqtt.subscriptions)}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <H1>User Auth</H1>
            </CardItem>
            <CardItem>
              <Text>UID: {this.props.auth.user.uid}</Text>
            </CardItem>
            <CardItem>
              <Text>Subscribed to {JSON.stringify[this.props.mqtt.subscriptions] || 'none'}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <H1>Firebase</H1>
            </CardItem>
            <CardItem>
              <Text>{this.props.firebaseConnected ? 'Connected' : 'Disconnected'}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  mqtt: state.mqtt,
  auth: state.auth,
  firebaseConnected: state.firebaseStatus.connected
})

export default connect(mapStateToProps)(DebugScreen)
