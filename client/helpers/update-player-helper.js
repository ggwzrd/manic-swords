export const currentPlayer = (_self) => {
    // if the currentUser has created or joined the game this should return a player
    const { game, currentUser } = _self.props
    const { playerOne, playerTwo } = _self.props.game

    if (currentUser._id === playerOne.userId) return playerOne
    if (!!playerTwo && currentUser._id === playerTwo.userId) return playerTwo

    // return game.players.filter((player) =>
    // player.userId === currentUser._id)[0]

}

export const otherPlayer = (_self) => {
  // if another player has joined the game AND there is a currentPlayer,
  // this function will return the other player
  // if we wanna have all the others, get them here as an an array
  const { game, currentUser } = _self.props
  const { playerOne, playerTwo } = _self.props.game

  if (currentUser._id === playerOne.userId) return playerTwo
  if (!!playerTwo && currentUser._id === playerTwo.userId) return playerOne

  // return game.players.filter((player) =>
  // player.userId !== currentUser._id)[0]
}

export const savePlayer = (_self, newPosition ) => {
    // if the currentUser has created or joined the game this should return a player
    const { game, saveGame, currentUser } = _self.props
    const { playerOne, playerTwo } = game
    console.log('update-player-helper: savePlayer')
    debugger
    if (currentUser._id === playerOne.userId) {
      saveGame(game, { playerOne: { position: newPosition } })
    }
    if (currentUser._id === playerTwo.userId) {
      saveGame(game, { playerTwo: { position: newPosition } })
    }
}

export const updatePlayer = (_self, event) => {

    const { saveGame, game } = _self.props

    // player1 is the currentUser playing, so not necessarily playerOne
    const player1 = currentPlayer(_self)
    // const player2 = otherPlayer(_self)
    console.log('update-player-helper: updatePlayer')
    debugger
    if(!player1 || player1.isDead || !game.started){ return false }

    const positionX = player1.position.x
    const positionY = player1.position.y

    const moveAmount = 22

    switch(event.keyCode){
      case 37:  // moving left
        const newPositionLeft = {
          // left 'wall'? go through
          x: positionX <= -40 ? 760 : positionX - moveAmount,
          y: positionY
        }
        savePlayer(_self, newPositionLeft)
        return
      case 39:  // moving right
        const newPositionRight = {
          // right 'wall'? go through
          x: positionX >= 760 ? -40 : positionX + moveAmount,
          y: positionY
        }
        savePlayer(_self, newPositionRight)
        return

      default :
        return
    }
}
