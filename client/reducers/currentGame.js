import { SET_CURRENT_GAME } from '../actions/set-current-game'

export default (state = null, { type, payload } = {}) => {
  switch(type) {
    case SET_CURRENT_GAME :
      return payload

    default :
      return state
  }
}
