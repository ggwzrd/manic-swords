import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'


class Home extends Component {
  render() {
    const { userName } = this.props
    return(
      <div className="home">
        <h2> Welcome, { userName ? userName : 'Stranger'} </h2>
      </div>
    )
  }
}

Home.propTypes = {
  userName: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    userName: state.currentUser.name
  }
}

export default connect(mapStateToProps, {})(Home)
