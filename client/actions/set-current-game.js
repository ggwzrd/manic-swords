export const SET_CURRENT_GAME = 'SET_CURRENT_GAME'

export default (gameId) => {
  return {
    type: SET_CURRENT_GAME,
    payload: gameId
  }
}
