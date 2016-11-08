import AUTHENTICATE_USER from '../actions/authenticate-user'
import REGISTER_USER from '../actions/register-user'
import DESTROY_SESSION_USER from '../actions/destroy-session-user'
import USER_AUTHENTICATED from '../actions/user-authenticated'

export default (state = JSON.parse(localStorage.getItem('ms.currentUser')) || {}, { type, payload } = {}) => {

  switch (type) {
    case 'AUTHENTICATE_USER':
      localStorage.setItem('ms.currentUser', JSON.stringify(payload))
      return payload

    case 'REGISTER_USER':
      return payload

    case 'DESTROY_SESSION_USER':
      localStorage.removeItem('ms.currentUser')
      return {}

    case 'USER_AUTHENTICATED':
      return payload

    default: return state

  }
}
