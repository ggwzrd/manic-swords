import appLoading from './loading'
import model from '../models/GameModel'
import signOutUser from './destroy-session-user'

export default (game, properties = {}, reset = false) => {
  return (dispatch) => {
    dispatch(appLoading(true))
    model.dispatch = dispatch
    model.app.authenticate()
      .then((response) => {
        model.save(game, properties, reset)
        dispatch(appLoading(false))
      }).catch((error) => {
        dispatch(appLoading(false))
        console.error(error)
        dispatch(signOutUser())
      })
  }
}
