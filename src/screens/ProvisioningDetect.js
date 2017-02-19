import React, { Component } from 'react'
import { connect } from 'react-redux'
import { detectGrownode, connectToDetectedGrownode, provisionGrownode, fetchNetworksFromGrownode } from '../actions'
import { Container, Content, Card, CardItem, Button, Text, H1, Form, Item, Input } from 'native-base'

class ProvisioningDetect extends Component {
  handleDetectingButton () {
    this.props.detectGrownode()
  }

  handleConnectButton () {
    this.props.connectToDetectedGrownode().then(this.props.fetchNetworksFromGrownode)
  }

  handleUploadSettings () {
    this.props.provisionGrownode()
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <Button onPress={this.handleDetectingButton.bind(this)}>
              <Text>{this.props.shouldDetectGrownode ? 'Stop' : 'Detect' }</Text>
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
          <Card>
            <CardItem>
              <Button onPress={this.handleConnectButton.bind(this)}>
                <Text>Connect to {this.props.detectedGrownodeId}</Text>
              </Button>
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
  scannedNetworks: state.provisioning.scannedNetworks
})

export default connect(mapStateToProps, { detectGrownode, connectToDetectedGrownode, provisionGrownode, fetchNetworksFromGrownode })(ProvisioningDetect)
