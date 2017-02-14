import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base'
import { connect } from 'react-redux'
import {logoutUser} from '../actions'

class HomeScreen extends Component {
  handleLogoutButton () {
    this.props.logoutUser()
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Button onPress={this.handleLogoutButton.bind(this)}>
                  <Text>Logout</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
export default connect(null, {logoutUser})(HomeScreen)
