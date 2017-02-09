import React, { Component } from 'react'
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base'

class NBHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
    )
  }
}
export default NBHeader
