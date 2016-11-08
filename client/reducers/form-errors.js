import SET_FORM_ERRORS from '../actions/set-form-errors'
import  RESET_FORM_ERRORS from '../actions/reset-form-errors'

export default (state = {}, { type, payload } = {}) => {

  switch (type) {
    case 'SET_FORM_ERRORS':
      return Object.assign({}, state, payload)

    case 'RESET_FORM_ERRORS':
      return {}

    default: return state

  }
}
