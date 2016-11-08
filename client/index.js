import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store, { history } from './store'
import { Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import Home from './containers/Home'
import NotFound from './containers/NotFound'
import SignUp from './containers/SignUp'
import SignIn from './containers/SignIn'
import PlayerProfile from './containers/PlayerProfile'

import Game from './containers/Game'

injectTapEventPlugin()

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="sign-up" component={SignUp} />
        <Route path="sign-in" component={SignIn} />
        <Route path="profile/:id" component={PlayerProfile} />
        <Route path="game" component={Game} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
document.getElementById('root'))
