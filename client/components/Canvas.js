import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'

import Player from '../models/PlayerModel'
import Sword from '../models/SwordModel'

class Canvas extends React.Component {

  currentPlayer() {
      // if the currentUser has created or joined the game this should return a player
      const { game, currentUser } = this.props
      return game.players.filter((player) =>
      player.userId === currentUser._id)[0]
  }

  otherPlayer() {
    // if another player has joined the game AND there is a currentPlayer,
    // this function will return the other player
    // if we wanna have all the others, get them here as an an array
    const { game, currentUser } = this.props
    return game.players.filter((player) =>
    player.userId !== currentUser._id)[0]
  }

  componentDidMount() {
    this.updateCanvas()
    window.addEventListener( 'keydown', function(event) {
        this.updatePlayer(event)
    }.bind(this))
  }

  componentWillReceiveProps() {
    console.log('Hey, I received props!')
    this.updateCanvas()
  }

  updateCanvas() {
      const {players} = this.props.game
      console.log('redrawing', this.props)
      const ctx = this.refs.canvas.getContext('2d')
      ctx.fillRect(players[0].position.x, players[0].position.y, 50,50)
      ctx.fillRect(players[1].position.x, players[1].position.y, 50,50)
  }

  updatePlayer(event) {
      const { saveGame, game } = this.props
      const { players } = game.players

      const currentPlayer = this.currentPlayer()
      const otherPlayer = this.otherPlayer()

      // console.log(event)
      // console.log(currentPlayer)
      // console.log(currentPlayer.position.x)

      if(!!!currentPlayer) return false

      const positionX = currentPlayer.position.x
      const positionY = currentPlayer.position.y

      switch(event.keyCode){
        case 37:
          const newPlayersLeft = [otherPlayer, Object.assign({}, currentPlayer,
            {position: {x: positionX - 50, y: positionY}
          })]
          saveGame(game, { players: newPlayersLeft })
          return false
        case 39:
          const newPlayersRight = [otherPlayer, Object.assign({}, currentPlayer,
            {position: {x: positionX + 50, y: positionY}
          })]
          saveGame(game, { players: newPlayersRight })
          return
        case 32:
          const newPlayersJump = [otherPlayer, Object.assign({}, currentPlayer,
            {position: {x: positionX, y: positionY - 50}
          })]
          saveGame(game, { players: newPlayersJump })
          return
        default :
          return
      }
  }

    render() {
        return (
            <canvas ref="canvas" width={1000} height={500} />
        );
    }
}

// copied this from Game.js
Canvas.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

// we don't use mapStateToProps here cause we got the props from the Game
export default connect(null, { saveGame })(Canvas)
