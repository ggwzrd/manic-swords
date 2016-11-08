import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import appLoading from '../actions/loading'
import Title from '../components/Title'


class Home extends Component {

  componentWillMount(){
    this.props.appLoading(true)
  }

  componentDidMount(){
    const { appLoading } = this.props
    setTimeout(() => appLoading(false), 1000)
  }

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

export default connect(mapStateToProps, { appLoading })(Home)
