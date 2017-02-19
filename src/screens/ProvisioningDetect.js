import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'

class ProvisioningDetect extends Component {
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
