import React, { Component, PropTypes } from 'react'
import Title from '../components/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './UserForm.sass'

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      passwordError: false
    }
  }

  submitForm(event) {
    event.preventDefault()

    const { name, email, password, passwordConfirmation } = this.refs

    console.log('name: ', (name && name.getValue()))
    console.log('email: ', (email && email.getValue()))
    console.log('password: ', (password && password.getValue()))
    console.log('passwordConfirmation: ', (passwordConfirmation && passwordConfirmation.getValue()))

    const formData = {
      name,
      email,
      password,
      passwordConfirmation,
    }

    this.props.onSubmit(formData)
  }

  checkPasswords() {
    if (!this.props.signUp) return

    const { password, passwordConfirmation } = this.refs

    if (password.getValue() === passwordConfirmation.getValue()) {
      this.setState({
        passwordError: false
      })

      return
    }

    this.setState({
      passwordError: true
    })
  }

  render() {
    const { signUp } = this.props

    return (
      <Paper className="registration-form" zDepth={3}>
        <form className={ this.state.passwordError ? "registration-form error ": "registration-form" } onSubmit={ this.submitForm.bind(this) }>
          <Title label={ signUp ? 'Sign Up' : 'Sign In' } />

          { signUp ?
              <TextField
                ref="name"
                hintText="Name"
                floatingLabelText="Your name"
                type="text"
              />
              : null }


            <TextField
              ref="email"
              hintText="Email"
              floatingLabelText="Email"
              type="email"
            />



            <TextField
              ref="password"
              hintText="Password"
              floatingLabelText="Password"
              type="password"
            />


          { signUp ?
              <TextField
                ref="passwordConfirmation"
                hintText="Password Confirmation"
                floatingLabelText="Confirm your password"
                type="password"
                onChange={ this.checkPasswords.bind(this) }
                errorText={ this.state.passwordError ? 'Passwords don\'t match!' : null }
              />
             : null }

          <div className="controls">
            <RaisedButton style={{ float: 'right' }} className="submit" type="submit" disabled={ this.state.passwordError } label={ signUp ? 'Sign Up' : 'Sign In' } primary={true}  />
            <FlatButton label={ signUp ? 'Sign In' : 'Sign Up' } className="submit"  href={ signUp ? '/sign-in' : '/sign-up' } />
          </div>
        </form>
      </Paper>
    )
  }
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
}

export default UserForm
