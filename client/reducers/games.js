
export default function updateGames(state = [], { type, payload } = {}) {
  switch (type) {
    case 'GAMES_FETCHED' :
      return payload

    case 'GAME_CREATED' :
      return [payload].concat(state)

    case 'GAME_UPDATED' :
      const current = payload
      return state.map((game) => {
        return (game._id === current._id) ? current : game
      })

    case 'GAME_REMOVED' :
      const removed = payload
      return state.filter((game) => (game._id !== removed._id))

    default :
      return state
  }
}
