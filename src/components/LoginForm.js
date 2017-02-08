import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { emailSetState, passwordSetState, loginUserWithCreds } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailSetState(text)
  }

  onPasswordChange(pw) {
    this.props.passwordSetState(pw)
  }

  onButtonPress() {
    const { email, password } = this.props

    this.props.loginUserWithCreds({ email, password })
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            secureTextEntry
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
}

const mapStateToProps = state => {
  const { email, password, error, loading } = state.auth

  return { email, password, error, loading }
}
export default connect(
  mapStateToProps,
  { emailSetState, passwordSetState, loginUserWithCreds })(LoginForm)
