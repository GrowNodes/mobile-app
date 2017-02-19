import React, { Component } from 'react'
import { connect } from 'react-redux'
import { detectGrownodeSsid } from '../actions'
import { Container, Content, Card, CardItem, Body, Text } from 'native-base'

class ProvisioningDetect extends Component {
  componentDidMount () {
    this.props.detectGrownodeSsid()
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Text>
                Detecting grow node...
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                {this.props.detectedGrowNodeId}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  detectedGrowNodeId: state.provisioning.detectedGrowNodeId
})

export default connect(mapStateToProps, { detectGrownodeSsid })(ProvisioningDetect)
