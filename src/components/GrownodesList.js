import React, { Component } from 'react'
import { ListView } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import { grownodesFetch } from '../actions'
import GrownodesListItem from './GrownodesListItem'

class EmployeeList extends Component {

  componentWillMount() {
    this.props.grownodesFetch()

    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ grownodes }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.dataSource = ds.cloneWithRows(grownodes)
  }

  renderRow(grownode) {
    return <GrownodesListItem grownode={grownode} />
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
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

export default connect(mapStateToProps, { grownodesFetch })(EmployeeList)
