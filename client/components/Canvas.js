import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'

// import Player from ''
// import Sword from ''

class Canvas extends React.Component {

  currentPlayer() {
    // if the currentUser has created or joined the game this should return a player
    const { gameStatus, currentUser } = this.props
    return gameStatus.players.filter((player) =>
      player.userId === currentUser._id)[0]
  }

  componentDidMount() {
        this.updateCanvas();
        window.addEventListener( 'keydown', function(event) {
            this.updatePlayer(event)
        }.bind(this))

    }

  updateCanvas() {
        const {players} = this.props.gameStatus

        const ctx = this.refs.canvas.getContext('2d')
        ctx.fillRect(players[0].position.x,players[0].position.y, 50,50)
        ctx.fillRect(players[1].position.x + 60 ,players[1].position.y + 60, 50,50)
  }

    updatePlayer(event) {


      const currentPlayer = this.currentPlayer()
      if(!!!currentPlayer) return false



      console.log(event)
      console.log(currentPlayer)
      console.log(currentPlayer.position.x)


    }

    // check if player is hitted by sword
    //...

    render() {
        return (
            <canvas ref="canvas" width={1200} height={600} />
        );
    }
}

// copied this from Game.js
Canvas.propTypes = {
  gameStatus: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default connect()(Canvas)
