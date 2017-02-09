import React, { Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import { Container, Content, List, ListItem, Text } from 'native-base'
import _ from 'lodash'
import { fetchGrownodesAndConnectToMqtt } from '../actions'
import GrownodesListItem from '../components/GrownodesListItem'

class GrownodesList extends Component {

  componentWillMount() {
    this.props.fetchGrownodesAndConnectToMqtt()
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.grownodes}
            renderRow={grownode =>
              <ListItem>
                <Text>{grownode.id}</Text>
              </ListItem>
            }
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  // Convert adsfasdf: {foo:'bar'} to [{foo:'bar', id: adsfasdf}]
  // equiv. to asArray in rebase?
  const grownodes = _.map(state.grownodes, (value, id) => {
    return { ...value, id }
  })

  return { grownodes }
}

export default connect(mapStateToProps, { fetchGrownodesAndConnectToMqtt })(GrownodesList)
