import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from '../store'
import Title from '../components/Title'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './UserForm.sass'

export class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      passwordError: false,
    }
  }

  submitForm(event) {
    event.preventDefault()

    const { name, email, password, passwordConfirmation } = this.refs

    const formData = {
      name: name ? name.getValue() : null,
      email: email.getValue(),
      password: password.getValue(),
      passwordConfirmation: passwordConfirmation ? passwordConfirmation.getValue() : null,
    }
    if (this.checkPasswords()) this.props.onSubmit(formData)
  }

  checkPasswords() {
    if (!this.props.signUp) return true

    const { password, passwordConfirmation } = this.refs
    if((password.getValue() === passwordConfirmation.getValue()) && (password.getValue())) {
      this.setState({
        passwordError: false
      })

      return true
    }

    this.setState({
      passwordError: true
    })
    return false
  }

  switchMode(){
    const { signUp } = this.props
    const location = signUp ? '/sign-in' : '/sign-up'
    history.push(location)
  }

  render() {
    const { signUp, errors } = this.props

    return (
      <Paper className={ this.state.passwordError || errors.hasOwnProperty('email' || 'name') ? "registration-form error ": "registration-form" } zDepth={3}>
        <form className="registration-form" onSubmit={ this.submitForm.bind(this) }>
          <Title label={ signUp ? 'Sign Up' : 'Sign In' } />

          { signUp ?
            <TextField
              ref="name"
              hintText="Name"
              floatingLabelText="Your name"
              type="text"
              errorText={ errors.hasOwnProperty('name')  ? errors.name : null }
            />
          : null }


          <TextField
            ref="email"
            hintText="Email"
            floatingLabelText="Email"
            type="email"
            errorText={ errors.hasOwnProperty('email') ? errors.email : null }
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
            <RaisedButton style={{ float: 'right' }} className="submit primary" type="submit" disabled={ this.state.passwordError } label={ signUp ? 'Sign Up' : 'Sign In' } primary={true}  />
            <FlatButton label={ signUp ? 'Sign In' : 'Sign Up' } className="submit" onClick={ this.switchMode.bind(this) }  />
          </div>
        </form>
      </Paper>
    )
  }
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  signUp: PropTypes.bool,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    errors: state.formErrors,
  }
}

export default connect(mapStateToProps, {})(UserForm)
