import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'
var wifi = require('react-native-android-wifi')

class ProvisioningDetect extends Component {
  componentDidMount () {
    wifi.connectionStatus((isConnected) => {
      if (isConnected) {
        console.log('is connected')
      } else {
        console.log('is not connected')
      }
    })
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Detecting grow node...
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default ProvisioningDetect
