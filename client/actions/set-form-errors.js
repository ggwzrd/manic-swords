export const SET_FORM_ERRORS = 'SET_FORM_ERRORS'

export default (errors = {}) => {
  return {
    type: SET_FORM_ERRORS,
    payload: errors
  }
}
