import React, { Component } from 'react'
import { Container, Content, Card, H1, CardItem, Body, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'

class GrownodeTodoListItemScreen extends Component {
  static onRight () {
    Actions.pop()
  }

  render () {
    const {todoItem} = this.props

    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <H1>
                  {todoItem.title}
                </H1>
              </Body>
            </CardItem>
            <CardItem>
              <Text>Created: {todoItem.created_at}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default GrownodeTodoListItemScreen
