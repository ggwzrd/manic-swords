import React, { Component, PropTypes } from 'react'
import UserForm from '../components/UserForm'
import signInUser from '../actions/sign-in-user'

class SignIn extends Component {

  render() {
    return <UserForm onSubmit={ signInUser } />
  }
}

export default SignIn
