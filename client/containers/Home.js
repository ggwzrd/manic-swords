import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Title from '../components/Title'


class Home extends Component {
  render() {
    const { userName } = this.props
    return(
      <div className="home">
        <Title label={ userName ? "Welcome, "+userName : "Welcome, Stranger"} />
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
