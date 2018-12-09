import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp, ErrorPage, EditProfile, Profile, TransferMoney} from './pages'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faHome,
          faSignOutAlt,
          faUserFriends,
          faUsers,
          faNewspaper,
          faCalendarAlt,
          faImage,
          faThumbsUp,
          faShare,
          faUserPlus,
          faCheck,
          faSquare,
          faUser,
          faCog,
          faSave,
          faEdit,
          faEnvelope,
          faPlus,
          faArrowRight,
          faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { ScrollToTop } from './components'

library.add(fab,
            faHome,
            faSignOutAlt,
            faUserFriends,
            faUsers,
            faUser,
            faNewspaper,
            faCalendarAlt,
            faImage,
            faThumbsUp,
            faShare,
            faUserPlus,
            faCheck,
            faSquare,
            faCog,
            faSave,
            faEdit,
            faEnvelope,
            faPlus,
            faArrowRight,
            faArrowDown)

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Redirect from='/home' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInUp} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/edit-profile' component={EditProfile} />
            <Route exact path='/transfer-money' component={TransferMoney} />
            <Route component={ErrorPage} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
