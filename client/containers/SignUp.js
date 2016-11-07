import React, { Component, PropTypes } from 'react'
import UserForm from '../components/UserForm';
import signUpUser from '../actions/sign-up-user'

class SignUp extends Component {

  render() {
    return <UserForm signUp={true} onSubmit={ signUpUser } />
  }
}

export default SignUp
