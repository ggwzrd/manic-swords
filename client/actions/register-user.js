import api from '../middleware/api'
import appLoading from './loading'
import authenticateUser from './authenticate-user'
import setFormErrors from './set-form-errors'
import resetFormErrors from './reset-form-errors'

const REGISTER_USER = 'REGISTER_USER'

export default (user) => {
  return dispatch => {
    dispatch(resetFormErrors())
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))

    // Here's the new user data, create a User with it
    api.service('users').create(user)
      .then((response) => {
        // We're done creating the User, now authenticate
        dispatch(authenticateUser(user))
      }).catch((error) => {
        console.error('Error registering!', error);
        if (error.code === 409) {
          const emailError = {
            email: 'This email address already exists!'
          }
          dispatch(setFormErrors(emailError))
        }
        const emailError = {
          name: 'Name can\'t be blank',
          email: 'Email can\'t be blank'
        }
        dispatch(setFormErrors(emailError))
        dispatch(appLoading(false))
      })
  }
}

const registerUser = (user) => {
  return {
    type: REGISTER_USER,
    payload: user
  }
}
