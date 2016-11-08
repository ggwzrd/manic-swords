
// going upstream
import UPDATE_PLAYER from '../actions/update-players'
import UPDATE_GAME  from '../actions/update-game'
import UPDATE_LEVEL from '../actions/update-level'
import UPDATE_SWORDS from '../actions/update-swords'

// going downstream
import UPDATE_PLAYERS from '../actions/update-player'
// fetch all players optional ?

//  fetch all swords optional ?

export default (state = {}, { type, payload } = {} ) => {

  switch(type) {
    case UPDATE_PLAYER:
      return payload
      
    case UPDATE_GAME:
      return payload

    case UPDATE_LEVEL:
      return payload

    case UPDATE_PLAYERS:
      return payload

    default :
      return state
  }
}
