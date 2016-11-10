const currentPlayer = (_self) => {
    // if the currentUser has created or joined the game this should return a player
    const { game, currentUser } = _self.props
    return game.players.filter((player) =>
    player.userId === currentUser._id)[0]

}
const otherPlayer = (_self) => {
  // if another player has joined the game AND there is a currentPlayer,
  // this function will return the other player
  // if we wanna have all the others, get them here as an an array
  const { game, currentUser } = _self.props
  return game.players.filter((player) =>
  player.userId !== currentUser._id)[0]
}

export const updatePlayer = (_self, event) => {

    const { saveGame, game } = _self.props
    const { players } = game.players

    const player1 = currentPlayer(_self)
    const player2 = otherPlayer(_self)

    if(!!!player1) return false

    const positionX = player1.position.x
    const positionY = player1.position.y

    const moveAmount = 22

    switch(event.keyCode){
      case 37:  //left
        const newPlayersLeft = [player2, Object.assign({}, player1,
          {position: {
            // left 'wall'? go through
            x: positionX <= -40 ? 760 : positionX - moveAmount,
            y: positionY
          }
        })]
        saveGame(game, { players: newPlayersLeft })
        return false
      case 39:  // right
        const newPlayersRight = [player2, Object.assign({}, player1,
          {position: {
            // right 'wall'? go through
            x: positionX >= 760 ? -40 : positionX + moveAmount,
            y: positionY
          }
        })]
        saveGame(game, { players: newPlayersRight })
        return
      case 38:  // up 'wall' ? stop
        const newPlayersUp = [player2, Object.assign({}, player1,
          {position: {
            x: positionX,
            y: positionY <= 5 ? positionY : positionY - moveAmount
          }
        })]
        saveGame(game, { players: newPlayersUp })
        return
      case 40:  // down 'wall' ? stop
        const newPlayersDown = [player2, Object.assign({}, player1,
          {position: {

            x: positionX,
            y: positionY >= 440 ? positionY : positionY + moveAmount
          }
        })]
        saveGame(game, { players: newPlayersDown })
      return
      default :
        return
    }
}
