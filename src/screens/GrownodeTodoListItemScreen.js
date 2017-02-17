import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, Card, H1, CardItem, Body, Text } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { GrownodeTodoListItemSetComplete } from '../actions'

class GrownodeTodoListItemScreen extends Component {
  componentWillMount () {
    Actions.refresh({ onRight: this.handleSetCompleteBtn.bind(this), rightTitle: 'Done' })
  }

  handleSetCompleteBtn () {
    const { selectedGrownodeId, selectedGrownodeTodoId } = this.props

    this.props.GrownodeTodoListItemSetComplete(selectedGrownodeId, selectedGrownodeTodoId)
    .then(() => {
      Actions.pop()
    })
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
                  {todoItem.body}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const todoList = state.grownodes.data[ownProps.selectedGrownodeId].todo_list || {}
  const todoItem = todoList[ownProps.selectedGrownodeTodoId] || {}

  return {
    todoItem
  }
}

export default connect(mapStateToProps, { GrownodeTodoListItemSetComplete })(GrownodeTodoListItemScreen)
