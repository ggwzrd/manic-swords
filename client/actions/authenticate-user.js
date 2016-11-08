import api from '../middleware/api'
import appLoading from './loading'
import userAuthenticated from './user-authenticated'
import setFormErrors from './set-form-errors'
import resetFormErrors from './reset-form-errors'
import destroySessionUser from './destroy-session-user'

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'

const authenticateUser = (user) => {
  return {
    type: AUTHENTICATE_USER,
    payload: user
  }
}

export default (user) => {
  return dispatch => {
    dispatch(resetFormErrors())
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))
    // Here's the new user data, create a User with it
    api.authenticate(user)
    .then((response) => {
      // response.data has the currentUser...
      dispatch(authenticateUser(response.data))
      dispatch(userAuthenticated())
      dispatch(appLoading(false))
    })
    .catch((error) => {
      console.error('Error authenticating!', error);
      dispatch(setFormErrors({ email: error.message }))
      dispatch(destroySessionUser())
      dispatch(appLoading(false))
    })
  }
}
