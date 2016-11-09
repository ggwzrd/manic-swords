import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'


class Canvas extends React.Component {

  componentDidMount() {
        this.updateCanvas();


        window.addEventListener( 'keydown', function(event) {
            this.updatePlayer(event).bind(this)
        }.bind(this))

    }

    updateCanvas() {

        // console.log(currentUser.position.x)

        // call functions:
        // 1) player hit by sword?  YES -> update-player
        // 2) key down?         YES -> update-player

        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(300,300,300,300);
    }

    updatePlayer(event) {

      const { currentUser, game, isPlayer } = this.props
      console.log(isPlayer)
      if( !isPLayer ) return

      console.log(event)
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
  isPlayer: PropTypes.bool.isRequired
}

export default connect()(Canvas)
