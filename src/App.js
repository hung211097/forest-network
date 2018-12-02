import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp, ErrorPage, EditProfile, Profile} from './pages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignOutAlt, faUserFriends, faUsers, faNewspaper, faCalendarAlt, faImage, faThumbsUp, faShare, faUserPlus, faCheck, faSquare, faUser, faCog, faSave, faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faHome, faSignOutAlt, faUserFriends, faUsers, faUser, faNewspaper, faCalendarAlt, faImage, faThumbsUp, faShare, faUserPlus, faCheck, faSquare, faCog, faSave, faEdit, faEnvelope)

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
            <Route exact path='/edit-profile' component={EditProfile} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
