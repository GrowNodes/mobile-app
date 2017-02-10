import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Content, Card, CardItem, Body, Text, H1, H2, H3 } from 'native-base'
import GrownodeTodoList from '../components/GrownodeTodoList'

class GrownodeControl extends Component {
  render () {
    const { selectedGrownodeId, grownode } = this.props
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <H1>Cycle Status</H1>
            </CardItem>
            <CardItem>
              <Text>Flowering stage since {grownode.settings.stage_start_at}</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <H1>Environment</H1>
            </CardItem>
            <CardItem>
              <Text>
                Light: ON
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Fan: ON
              </Text>
            </CardItem>
            <CardItem>
              <Text>
                Air Temperature: 78.2 F
              </Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <H1>Todo List</H1>
              </Body>
            </CardItem>
            <GrownodeTodoList todo_list={grownode.todo_list} selectedGrownodeId={selectedGrownodeId} />
          </Card>

          <Card>
            <CardItem>
              <Body>
                <H1>Switches</H1>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                    render switchers here
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <H1>Props</H1>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Harware serial number {grownode.id}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  grownode: state.grownodes[ownProps.selectedGrownodeId]
})

export default connect(mapStateToProps)(GrownodeControl)
