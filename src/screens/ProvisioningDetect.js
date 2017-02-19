import React, { Component } from 'react'
import { connect } from 'react-redux'
import { detectGrownode } from '../actions'
import { Container, Content, Card, CardItem, Button, Text, H1 } from 'native-base'

class ProvisioningDetect extends Component {
  handleDetectingButton () {
    this.props.detectGrownode()
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <Button onPress={this.handleDetectingButton.bind(this)}>
              <Text>{this.props.shouldDetectGrownode ? 'stop detecting' : 'Start detecting' }</Text>
            </Button>
            <CardItem>
              <H1>
                Detected grownode
              </H1>
            </CardItem>
            <CardItem>
              <Text>
                {this.props.detectedGrownodeId}
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  shouldDetectGrownode: state.provisioning.shouldDetectGrownode,
  detectedGrownodeId: state.provisioning.detectedGrownodeId
})

export default connect(mapStateToProps, { detectGrownode })(ProvisioningDetect)
