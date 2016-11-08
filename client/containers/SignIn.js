import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserForm from '../components/UserForm'
import authenticateUser from '../actions/authenticate-user'
import './SignIn.sass'

export class SignIn extends Component {

  render() {
    return <UserForm onSubmit={ this.props.authenticateUser } />
  }
}

export default connect(null, { authenticateUser })(SignIn)
