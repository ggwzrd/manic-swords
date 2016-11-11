import React, { Component } from 'react'
import { connect } from 'react-redux'

//actions
import saveGame from '../actions/update-game'

// helpers
import { currentPlayer, otherPlayer } from '../helpers/update-player-helper'

class Scoreboard extends Component {

  constructor() {
      console.log('Scoreboard: I`m constructing')
         super()
         this.state = {
           status: 'Waiting to start...',
           timer: 5
           }
   }

  componentDidMount() {
        console.log('Scoreboard: component mounted')
        this.counter()
  }

  componentDidUpdate () {
        const i = this.state.timer
        if (i === 5){
          this.counter()
        }
  }

  counter() {

      const { game, saveGame } = this.props
      let i = this.state.timer

      // check here if the game has:
      // not yet started
      // if the other player joined
      // if true we start the timer
      if (!game.started && (game.players.length >= 2) && !game.ended) {
        console.log('Scoreboard: I`m gonna start the counter')
        console.log(i)
        // count down
        const intId = setInterval(() => {
          i--
          // update counter
          if ( i > -1 ) {
          this.setState({
               timer: i
             })
           }
          if (i < 0) {
            // start the game
            saveGame(game, {started: true})
            clearInterval(intId)
          }
        }, 1000)
    }
  }

  renderPlayers() {
    const player1 = currentPlayer(this)
    const player2 = otherPlayer(this)

    return (
      <div>
        <div>{ player1.name } : { player1.lifes }</div>
        <div>{ player2 ? player2.name : 'Waiting for other player' } : { player2 ? player2.lifes : null }</div>
      </div>
    )

  }

  renderCountDown() {
    const { timer } = this.state

    return (
      <div>Countdown: { (timer > 0) ? timer : 'Move!' }</div>
    )
  }

  render() {

      return (
          <div className="scoreboard-container">
            { this.renderCountDown.bind(this)() }
            { this.renderPlayers.bind(this)() }
          </div>
      )
    }
  }



const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((prevGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : prevGame
    }, {}),
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { saveGame })(Scoreboard)
