import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Button, Text } from 'native-base'
import { connect } from 'react-redux'
import { changeGrownodeGrowStage } from '../actions/GrownodeGrowChangerActions'
class GrownodeGrowChanger extends Component {
  handleChange (newPlantStage) {
    this.props.changeGrownodeGrowStage(newPlantStage, this.props.selectedGrownodeId)
  }

  render () {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Button onPress={this.handleChange.bind(this, 'vegetation')}>
                <Text>Vegetation</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button onPress={this.handleChange.bind(this, 'flowering')}>
                <Text>Flowering</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

export default connect(null, { changeGrownodeGrowStage })(GrownodeGrowChanger)
