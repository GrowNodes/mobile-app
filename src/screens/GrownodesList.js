import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, List, Spinner } from 'native-base'
import _ from 'lodash'
import { fetchGrownodesAndConnectToMqtt } from '../actions'
import GrownodesListItem from '../components/GrownodesListItem'

class GrownodesList extends Component {
  componentWillMount () {
    this.props.fetchGrownodesAndConnectToMqtt()
  }

  renderWithSpinner () {
    if (!this.props.mqttConnected) {
      return <Spinner />
    }
    return <List
      dataArray={this.props.grownodes}
      renderRow={grownode =>
        <GrownodesListItem grownode={grownode} />
      }
    />
  }

  render () {
    return (
      <Container>
        <Content>
          {this.renderWithSpinner()}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  // Convert adsfasdf: {foo:'bar'} to [{foo:'bar', id: adsfasdf}]
  // equiv. to asArray in rebase?
  const grownodes = _.map(state.grownodes.data, (value, id) => {
    return { ...value, id }
  })

  return {
    grownodes,
    mqttConnected: state.mqtt.connected
  }
}

export default connect(mapStateToProps, { fetchGrownodesAndConnectToMqtt })(GrownodesList)
