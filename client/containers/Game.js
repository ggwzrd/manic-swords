import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import setUpGame from '../actions/setup-game'
import setGameId from '../actions/set-current-game'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import saveGame from '../actions/update-game'
import './Game.sass'
import { randomNumBetween } from '../helpers/game-helper'

import Canvas from '../components/Canvas'

class Game extends Component {
  componentWillMount() {
    console.log('were mounting')
    this.props.setGameId(this.props.routeParams.id)
    this.props.setUpGame()
  }

  isPlayer() {
    const { game, currentUser } = this.props
    return game.players.filter((player) =>
      player.userId === currentUser._id).length > 0
  }

  canJoin() {
    if (this.isPlayer()) { return false }
    const { game } = this.props
    return game.players.length < 2         // this determines the amount of players that can join the game
  }

  joinGame() {
    const { game, saveGame, currentUser } = this.props
    saveGame(game, { players: game.players.concat({
      userId: currentUser._id,
      name: currentUser.name,
      puppet: 'http://i.imgur.com/Gz6uk6O.png',
      position: {
        x: randomNumBetween(100, 700),
        y: 450
      }
    })})
  }

  render() {
    const { game, currentUser } = this.props

    if (!!!game._id) { return null }

    if (this.canJoin()) {
      return (
        <Paper zDepth={3} className="join-game">
          <h3>Join this Game?</h3>
          <p> {'Join '+ game.createdBy.name + ' in this game.'}</p>
          <RaisedButton label="Join" primary={true} onClick={ this.joinGame.bind(this) } />
          <Link to="/"><FlatButton label="Back to the Lobby" /></Link>
        </Paper>
      )
    }

    return (
      <Canvas game={ game } currentUser={ currentUser } />
    )
  }
}

Game.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    game: state.games.reduce((prevGame, nextGame) => {
      return nextGame._id === state.currentGame ? nextGame : prevGame
    }, {}),
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, { setUpGame, setGameId, saveGame })(Game)
