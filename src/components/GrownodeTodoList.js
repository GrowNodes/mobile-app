import React, { Component } from 'react'
import { List, ListItem, Text } from 'native-base'
// import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash'

class GrownodeTodoList extends Component {
  handlePress (todoItem) {
    Actions.GrownodeTodoListItemScreen({ todoItem })
  }

  render () {
    if (_.isEmpty(this.props.todo_list)) {
      return <Text>Nothing to do here!</Text>
    }

    // Convert {somekey: {foo:'bar'}} to [{foo:'bar', id: somekey}]
    const todosArray = _.map(this.props.todo_list, (value, id) => {
      return { ...value, id }
    })

    return (
      <List dataArray={todosArray}
        renderRow={(todoItem) =>
          <ListItem onPress={this.handlePress.bind(this, todoItem)}>
            <Text>{todoItem.title}</Text>
          </ListItem>
        } />
    )
  }
}
export default GrownodeTodoList
