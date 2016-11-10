import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'
import store, { history } from '../store'
import appLoading from '../actions/loading'
import setUpGame from '../actions/setup-game'
import deleteGame from '../actions/delete-game'
import createGame from '../actions/create-game'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import { Link } from 'react-router'
import './GameList.sass'


class GameList extends Component {
  componentWillMount(){
    const { appLoading, setUpGame } = this.props
    appLoading(true)
    setUpGame()

  }

  componentDidMount(){
    const { appLoading } = this.props
    appLoading(false)
  }

  join(game){
    const location = 'game/' + game._id
    history.push(location)
  }

  renderGames(game, index){
    const { deleteGame, currentUser } = this.props
    return(
        <Paper key={index} className="game container" zDepth={1} >
          <FloatingActionButton mini={true} style={{float: 'right'}} type="button" onClick={ deleteGame.bind(this, game) } disabled={ currentUser._id !== game.createdBy._id } >
            <ContentRemove style={{'fontSize': '10px'}} />
          </FloatingActionButton>
          <Link to={ `profile/${game.createdBy._id }`} >
            <Avatar
              src={ "https://api.adorable.io/avatars/" + game.createdBy.name + ".png" }
              size={50}
              icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
            />
            <h3>{game.createdBy && game.createdBy.name}</h3>
          </Link>
          <FlatButton  className="submit primary" type="submit" onClick={ this.join.bind(this, game) } label="Join" />
        </Paper>
      )
  }

  render() {
    const { games, createGame } = this.props
    return (
      <div>
        <RaisedButton style={{ float: 'right' }} className="submit primary" onClick={ createGame } type="submit" label="Create Game" primary={true}  />
        <div className="game-list">
          { !!games[0] ? games.map(this.renderGames.bind(this)) : null }
        </div>
      </div>
    )
  }
}

GameList.propTypes = {
  games: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    games: state.games
  }
}
export default connect(mapStateToProps, { appLoading, setUpGame, createGame, deleteGame })(GameList)
