import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Scoreboard.sass'

// material-ui
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'

//actions
import saveGame from '../actions/update-game'

// helpers
import { currentPlayer, otherPlayer } from '../helpers/update-player-helper'

class Scoreboard extends Component {

  constructor() {
    super()
    this.state = {
     timer: 6
    }
  }

  componentDidMount() {
      if (i === 6 ){
      this.counter()
    }
  }

  componentDidUpdate() {

    const { game } = this.props

    console.log('Scoreboard: updated')
    const i = this.state.timer
    if (i === 6 ){
      this.counter()
    }
  }

  counter() {
      const { game, saveGame } = this.props
      const { playerTwo } = game

      let i = this.state.timer

      // check here if the game has:
      // not yet started
      // if the other player joined
      // if true we start the timer
      if (!game.started && !!playerTwo && !game.ended) {

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
            const snd = new Audio('../audio/start.wav')
            snd.play()
            saveGame(game, {started: true})
            clearInterval(intId)
          }
        }, 1000)
    }
  }

  renderGameStatus() {

    const { game } = this.props
    const { playerOne, playerTwo } = game
    const player1 = playerOne
    const player2 = playerTwo


    const countDown = () => {
      const { timer } = this.state

      return (
        <div>{ (timer === 6) ? 'Get ready!' : (timer > 0 ) ? timer : 'Move!' }</div>
      )
    }

    // get hearts for each life
    const hearts = (lifes) => {
          let j = 0
          let imageTagsArray = []
          for( j = 0; j < lifes; j += 1 )  {
            imageTagsArray.push('http://res.cloudinary.com/pvdh/image/upload/v1478892038/oHgSPgd_-_Imgur_nxjibc.png')
          }
      return(
        imageTagsArray.map((img, index) => {
          return <img key={ index } src={ `${ img }` }></img>
        })
      )
    }

    return (
          <Paper className='game-status' zDepth={1}>

            <div className='status-player'>
              {/* PLAYER 1 */}
              <h3>{ !!player1 ? player1.name : null }</h3>
              <Avatar
                src={ "https://api.adorable.io/avatars/" + player1.name + ".png" }
                size={120}
                icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
              />
              <div className="lifes">{ hearts(player1.lifes) }</div>
            </div>

            <div className='count-down'>
              { game.started ? game.level.title : countDown() }
            </div>

            <div className='status-player'>
              {/* PLAYER 2 */}
              <h3>{ !!player2 ? player2.name : null }</h3>
              { !!player2 ? <Avatar
                src={ "https://api.adorable.io/avatars/" + player2.name + ".png" }
                size={120}
                icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
                            /> : null }
              <div className="lifes"> { !!player2 ? hearts(player2.lifes) : null } </div>
            </div>

          </Paper>
      )
  }

  render() {

      return (
          <div className="scoreboard-container">
            { this.renderGameStatus.bind(this)() }
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
