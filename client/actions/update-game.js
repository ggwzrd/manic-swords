import appLoading from './loading'
import gameModel from '../models/GameModel'
import signOutUser from './destroy-session-user'

export const GAME_UPDATED = 'GAME_UPDATED'

export default (game, properties = {}, reset = false) => {
  return (dispatch) => {
    // dispatch(appLoading(true))

    gameModel.dispatch = dispatch
    gameModel.app.authenticate()
      .then((response) => {
        gameModel.save(game, properties, reset)
        // dispatch(appLoading(false))
      }).catch((error) => {
        // dispatch(appLoading(false))
        console.error(error)
        dispatch(signOutUser())
      })
  }
}

export function gameUpdate() {
  return {
    type: GAME_UPDATED
  }
}
