import { history } from '../store'
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED'

export default (user = {}) => {
  history.push('/')
  return {
    type: USER_AUTHENTICATED,
    payload: user
  }
}
