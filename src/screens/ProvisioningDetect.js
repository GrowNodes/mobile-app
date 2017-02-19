import React, { Component } from 'react'
import { connect } from 'react-redux'
import { detectGrownode, connectToDetectedGrownode, provisionGrownode, fetchNetworksFromGrownode } from '../actions'
import { Container, Content, Card, CardItem, Button, Text, H1, Form, Item, Input } from 'native-base'

class ProvisioningDetect extends Component {
  handleStartButton () {
    this.props.detectGrownode()
    .then(this.props.connectToDetectedGrownode)
    .then(this.props.fetchNetworksFromGrownode)
  }

  handleUploadSettings () {
    this.props.provisionGrownode()
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <Button onPress={this.handleStartButton.bind(this)}>
              <Text>Start</Text>
            </Button>
            <CardItem>
              <H1>
                {this.props.detectedGrownodeId}
              </H1>
            </CardItem>
            <CardItem>
              <Text>
                {this.props.statusText}
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <H1>Scanned networks</H1>
            </CardItem>
            {this.props.scannedNetworks.map(network => {
              return (
                <CardItem>
                  <Text>{network.rssi} {network.encryption} | {network.ssid}</Text>
                </CardItem>
              )
            })}
          </Card>
          <Form>
            <Item>
              <Input placeholder='Grownode Nickname' />
            </Item>
            <Item last>
              <Input placeholder='psk' />
            </Item>
            <Button onPress={this.handleUploadSettings.bind(this)}>
              <Text>Upload settings</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  shouldDetectGrownode: state.provisioning.shouldDetectGrownode,
  detectedGrownodeId: state.provisioning.detectedGrownodeId,
  scannedNetworks: state.provisioning.scannedNetworks,
  statusText: state.provisioning.statusText
})

export default connect(mapStateToProps, { detectGrownode, connectToDetectedGrownode, provisionGrownode, fetchNetworksFromGrownode })(ProvisioningDetect)
