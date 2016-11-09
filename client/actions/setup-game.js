import model from '../models/GameModel'

export const GAME_SETUP = 'GAME_SETUP'

export default function setupGames() {
  return dispatch => {
    model.dispatch = dispatch
    model.app.authenticate().then((response) => {
      model.find()
      dispatch(gameSetup())
    })
  }
}

export function gameSetup() {
  return {
    type: GAME_SETUP
  }
}
