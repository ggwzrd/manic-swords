import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from '../store'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import destroySessionUser from '../actions/destroy-session-user'

import './Header.sass'

class Header extends Component {
  renderMenu() {
    const { destroySessionUser, userName, signedIn } = this.props

    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
        <MenuItem primaryText={ signedIn ? userName : 'Sign in' } onClick={ this.signIn.bind(this) } />
        <MenuItem primaryText={ signedIn ? 'Sign out' : 'Sign up' } onClick={ this.signUpOrOut.bind(this) } />
      </IconMenu>
    )
  }

  signIn() {
    const { signedIn } = this.props
    if (signedIn) return

    history.push('/sign-in')
  }

  signUpOrOut() {
    const { signedIn, destroySessionUser } = this.props
    if (signedIn) return destroySessionUser()

    history.push('/sign-up')
  }

  render() {
    return (

      <AppBar
        title="Manic Swords"
        className="header"
        iconElementRight={ this.renderMenu() }
      />
    )
  }
}

Header.propTypes = {
  destroySessionUser: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    signedIn: !!state.currentUser._id,
    userName: state.currentUser.name,
  }
}

export default connect(mapStateToProps, { destroySessionUser })(Header)
