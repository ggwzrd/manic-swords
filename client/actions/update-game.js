import api from '../middleware/api'
import appLoading from './loading'

const UPDATE_GAME = 'UPDATE_GAME'

export default (newGameStatus) => {
  return dispatch => {
    // We're loading (communicating with the API asynchronously)
    dispatch(appLoading(true))

    // Here's the new user data, create a User with it
    api.service('game').update(newGameStatus._id, newGameStatus)
      .then((response) => {
        dispatch(updateGame(response.data))
      }).catch((error) => {
        console.error('Error registering!', error);
        dispatch(appLoading(false))
      })
  }
}

const updateGame = (game) => {
  return {
    type: UPDATE_GAME,
    payload: game
  }
}
