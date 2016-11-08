import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Header from './components/Header'
import './App.sass'

class App extends Component {
  render() {
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Header/>
          <main className="app">
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
