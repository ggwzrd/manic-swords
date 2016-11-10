import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'

// helpers
import { updatePlayer, currentPlayer, otherPlayer } from '../helpers/update-player-helper'

// models [still empty]
// import Player from '../models/PlayerModel'
// import Sword from '../models/SwordModel'

class Canvas extends React.Component {

    componentDidMount() {
      this.updateCanvas()
      console.log('Hey, we`re MOUNTING')
      window.addEventListener( 'keydown', function(event) {
        updatePlayer(this, event)
      }.bind(this))
    }

    componentDidUpdate() {
      console.log('Hey, I received props!')
      this.updateCanvas()
    }

    updateCanvas() {
        const {players} = this.props.game
        console.log('redrawing', this.props)
        const ctx = this.refs.canvas.getContext('2d')

        ctx.clearRect(0,0,800,550)
        const puppet1 = new Image()
        const puppet2 = new Image()
        puppet2.src = players[1].puppet
        puppet1.src = players[0].puppet
        ctx.drawImage(puppet1, players[0].position.x, players[0].position.y)
        ctx.drawImage(puppet2, players[1].position.x, players[1].position.y)
    }

    render() {
        return (
          <div className="canvas-container">
            <canvas ref="canvas" width={800} height={550} />
          </div>
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
