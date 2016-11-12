import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'

// the Scoreboard
import Scoreboard from '../containers/Scoreboard'

// helpers
import { updatePlayer, currentPlayer, otherPlayer } from '../helpers/update-player-helper'
import { checkCollision, cleanDisabledSword } from '../helpers/game-helper'

// models [still empty]
import Player from '../models/PlayerModel'
import Sword from '../models/SwordModel'

const WIDTH = 800
const HEIGHT = 550
let clientSwords = []

class Canvas extends React.Component {

    componentWillMount(){
        const { swords, levels } = this.props.game
        clientSwords = swords.map((sword) => {
          return new Sword(sword, levels[0])
        })
    }

    // we bind addEventListener to update the player position
    // when the component has mounted
    componentDidMount() {
       // we draw the players for the first time
       const { game } = this.props
      this.drawPlayers()
      window.addEventListener( 'keydown', function(event) {
        updatePlayer(this, event)
      }.bind(this))
      // here we trigger the draw function for the first time
      // we should call this at least once to start the loop
      // to continuously trigger the drawPlayer and drawSwords functions
      this.drawPlayers()
      this.draw()
    }
    // Update swords when the hit something
    //
    componentDidUpdate() {
      const { game } = this.props

      if(game.started){
        // this.startCleaning.bind(this)()
      }
    }

    startCleaning (){
      const { game } = this.props
      const cleaningSwords = setInterval(function () {
        cleanDisabledSword(this, game,  clientSwords)
        if(!game.started){
          clearInterval(cleaningSwords)
        }
      }.bind(this), 5000)
    }

    // we continuously draw all swords and players
    draw(){
      const { game, saveGame, currentUser } = this.props
      const { playerOne, playerTwo } = game

	    const player1 = currentPlayer(this)

      const ctx = this.refs.canvas.getContext('2d')
      ctx.clearRect(0,0,WIDTH,HEIGHT)


      if(!player1.isDead) {
        window.setTimeout(function(){
          const collided = checkCollision(clientSwords, player1)
          if(collided.player.hasOwnProperty('isHit')){
  	   	     const snd = new Audio('../audio/hit.wav')
             snd.play()
             clientSwords = collided.swords

             if (currentUser._id === playerOne.userId) {
               saveGame(game, {swords: clientSwords, playerOne: collided.player })
             }
             if (currentUser._id === playerTwo.userId) {
               saveGame(game, {swords: clientSwords, playerTwo: collided.player })
             }
          }
        }.bind(this), 700);
      }
      if(game.started) this.drawSwords()

      this.drawPlayers()

      window.requestAnimationFrame(this.draw.bind(this))
    }

    // this is how we draw swords
    drawSwords() {
      const ctx = this.refs.canvas.getContext('2d')
      const swordImg = new Image()
      clientSwords.map((sword) => {
        // the falling class function increments the y-coordinates
        // of the swords each time we draw
        sword.falling()
        swordImg.src = sword.image
        if(sword.active)
          ctx.drawImage(swordImg, sword.position.x, sword.position.y)
      })
    }

    // this is how we draw players
    drawPlayers() {
        const { playerOne, playerTwo } = this.props.game
        const ctx = this.refs.canvas.getContext('2d')

        if(!playerOne.isDead) {
          const puppet1 = new Image()
          puppet1.src = playerOne.puppet

          ctx.drawImage(puppet1, playerOne.position.x, playerOne.position.y)
        }

        if( !playerTwo || playerTwo.isDead){ return }

        const puppet2 = new Image()
        puppet2.src = playerTwo.puppet

        ctx.drawImage(puppet2, playerTwo.position.x, playerTwo.position.y)

    }

    render() {
        return (
          <div>
            <Scoreboard className='scoreboard'/>
            <div className="canvas-container">
              <canvas ref="canvas" width={WIDTH} height={HEIGHT} />
            </div>
          </div>
        )
    }
}

// copied this from Game.js. validates the game and currentUser
Canvas.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

// we don't use mapStateToProps here
// because we feed the needed props straight
// to the Canvas tag in the Game component
export default connect(null, { saveGame })(Canvas)
