import React, { Component } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Canvas.sass'


class Canvas extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillRect(300,300,300,300);

        // call functions:
        // 1) player hit by sword?  YES -> update-player
        // 2) key down?         YES -> update-player

    }
    
    // check if player is hitted by sword
    //...

    render() {
        return (
            <canvas ref="canvas" width={1200} height={600} />
        );
    }
}

export default connect()(Canvas)
