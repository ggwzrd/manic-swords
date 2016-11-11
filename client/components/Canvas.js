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
    componentDidMount() {
      this.drawPlayers()
      console.log('Hey, we`re MOUNTING')
      window.addEventListener( 'keydown', function(event) {
        updatePlayer(this, event)
      }.bind(this))

      this.draw()
    }

    // Update swords when the hit something
    //
    componentDidUpdate() {
      const { swords, levels } = this.props.game
      console.log('Hey, I have been updated!')
      clientSwords.map((sword) => {
        sword.update(sword) // update the speed (only when level changes) and the swords status
      })
      this.draw()
    }

    draw(){
        const { game } = this.props
        const { saveGame } = this.props
        const ctx = this.refs.canvas.getContext('2d')
        ctx.clearRect(0,0,WIDTH,HEIGHT)

        const collided = checkCollision(clientSwords, currentPlayer(this))
        collided.player.hasOwnProperty('isHit') ?
          saveGame(game, {swords: collided.swords, players: [otherPlayer(this)].concat(collided.player)} ) : null

        this.drawSwords()
        this.drawPlayers()

        window.requestAnimationFrame(this.draw.bind(this))
    }

    drawSwords() {
      const ctx = this.refs.canvas.getContext('2d')
      const swordImg = new Image()
      clientSwords.map((sword) => {
        sword.falling()
        swordImg.src = sword.image
        if(sword.active)
          ctx.drawImage(swordImg, sword.position.x, sword.position.y)
      })
    }

    drawPlayers() {
        const { players } = this.props.game
        const ctx = this.refs.canvas.getContext('2d')

        const puppet1 = new Image()
        const puppet2 = new Image()
        puppet1.src = players[0].puppet

        ctx.drawImage(puppet1, players[0].position.x, players[0].position.y)
        if(players.length < 2){ return }

        puppet2.src = players[1].puppet
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

// copied this from Game.js
Canvas.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

// we don't use mapStateToProps here cause we got the props from the Game
export default connect(null, { saveGame })(Canvas)
