import React, { Component } from 'react'
import './Title.sass'

class Title extends Component {
  render() {
    const { label } = this.props

    return (
      <h1>{ label }</h1>
    )
  }
}

export default Title
