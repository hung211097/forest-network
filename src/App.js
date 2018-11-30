import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp, ErrorPage} from './pages'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignOutAlt, faUserFriends, faUsers, faNewspaper, faCalendarAlt, faImage } from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faSignOutAlt, faUserFriends, faUsers, faNewspaper, faCalendarAlt, faImage)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect from='/home' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInUp} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
