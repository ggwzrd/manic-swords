import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UserForm from '../components/UserForm';
import registerUser from '../actions/register-user'

export class SignUp extends Component {

  render() {
    return <UserForm signUp={true} onSubmit={ this.props.registerUser } />
  }
}

export default connect(null, {registerUser})(SignUp)
