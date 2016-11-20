import appLoading from './loading'
import gameModel from '../models/GameModel'
import signOutUser from './destroy-session-user'

// TODO do we need reset?
export default (game, properties = {}, reset = false) => {
  return (dispatch) => {
    gameModel.dispatch = dispatch
    gameModel.app.authenticate()
      .then((response) => {
        // TODO do we need reset?
        gameModel.save(game, properties, reset)
      }).catch((error) => {
        console.error(error)
        dispatch(signOutUser())
      })
  }
}
