import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'

class Shop extends Component {
  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Buy some Grow Nodes/ferts/filters here
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default Shop
