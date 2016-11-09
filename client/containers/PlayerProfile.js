import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '../middleware/api'
import appLoading  from '../actions/loading'
import Title from '../components/Title'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import ListItem from 'material-ui/List/ListItem'

import './PlayerProfile.sass'

export class PlayerProfile extends Component {

  componentWillMount(){
    this.props.appLoading(true)
  }

  componentDidMount(){
    const { appLoading } = this.props
    const { playerId } = this.props.routeParams
    setTimeout(() => appLoading(false), 1000)
  }

  render() {

    if(this.props.player){
      const { name } = this.props.player

      return (
        <div>

          <ListItem
            disabled={true}
            leftAvatar={
              <Avatar
                src={ "https://api.adorable.io/avatars/" + name + ".png" }
                size={200}
                icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
              />
            }
          >

          </ListItem>
          <Title label={ name } />
        </div>
      )
    }else{
      return(
        <Title label="Profile not found" />
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    player: state.currentUser
  }
}

export default connect(mapStateToProps, { appLoading })(PlayerProfile)
