import React, { Component } from 'react'
import './Canvas.sass'


class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(300,300,300,300);

        console.log(currentUser.position.x)

        // call functions:
        // 1) player hit by sword?  YES -> update-player
        // 2) key down?         YES -> update-player

    }

    // check if player is hitted by sword
    //...

    render() {
        return (
            <canvas ref="canvas" width={1200} height={600} onKeyDown = { this.updateCanvas.bind(this) } />
        );
    }
}

// copied this from Game.js
Canvas.propTypes = {
  game: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Canvas
