import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp, ErrorPage, Profile} from './pages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignOutAlt, faUserFriends, faUsers, faNewspaper, faCalendarAlt, faImage, faThumbsUp, faShare, faUserPlus, faCheck, faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faHome, faSignOutAlt, faUserFriends, faUsers, faNewspaper, faCalendarAlt, faImage, faThumbsUp, faShare, faUserPlus, faCheck, faEnvelope, faPlus)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect from='/home' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInUp} />
						<Route exact path='/profile' component={Profile} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
