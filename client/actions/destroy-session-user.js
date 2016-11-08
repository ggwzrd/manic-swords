import api from '../middleware/api'
import { history } from '../store'
export const DESTROY_SESSION_USER = 'DESTROY_SESSION_USER'

export default () => {
  api.signOut()
  history.push('/')
  return {
    type: DESTROY_SESSION_USER,
  }
}
