import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'

// helpers
import { updatePlayer, currentPlayer, otherPlayer } from '../helpers/update-player-helper'
import { checkCollision } from '../helpers/game-helper'

// models [still empty]
import Player from '../models/PlayerModel'
import Sword from '../models/SwordModel'

const WIDTH = 800
const HEIGHT = 550
let clientSwords = []

class Canvas extends React.Component {

    componentWillMount(){
        const { swords, players, levels } = this.props.game
        clientSwords = swords.map((sword) => {
          return new Sword(sword, levels[0])
        })
    }

    // we bind addEventListener to update the player position
    // when the component has mounted
    componentDidMount() {
       // we draw the players for the first time
      this.drawPlayers()
      console.log('Hey, we`re MOUNTING')
      window.addEventListener( 'keydown', function(event) {
        updatePlayer(this, event)
      }.bind(this))

      // here we trigger the draw function for the first time
      // we should call this at least once to start the loop
      // to continuously trigger the drawPlayer and drawSwords functions
      this.draw()
    }

    // we continuously draw all swords and players
    draw(){
        const { swords } = this.props.game
        const ctx = this.refs.canvas.getContext('2d')
        ctx.clearRect(0,0,WIDTH,HEIGHT)

        const collided = checkCollision(swords, currentPlayer(this))

        !!collided ? saveGame(collided) : false

        this.drawSwords(swords)
        this.drawPlayers()

        window.requestAnimationFrame(this.draw.bind(this))
    }

    // this is how we draw swords
    drawSwords(swords) {

      const ctx = this.refs.canvas.getContext('2d')
      const swordImg = new Image()
      clientSwords.map((sword) => {

        // the falling class function increments the y-coordinates
        // of the swords each time we draw
        sword.falling()
        swordImg.src = sword.image
        ctx.drawImage(swordImg, sword.position.x, sword.position.y)
      })
    }

    // this is how we draw players
    drawPlayers() {
        const { players } = this.props.game
        const ctx = this.refs.canvas.getContext('2d')

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
              <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
            </div>
        );
    }
}

// copied this from Game.js. This sort of validates the game and currentUser
Canvas.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

// we don't use mapStateToProps here
// because we feed the needed props straight
// to the Canvas tag in the Game component
export default connect(null, { saveGame })(Canvas)
