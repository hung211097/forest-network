import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp, ErrorPage, EditProfile, Profile, TransferMoney, TransactionHistory, CreateAccount} from './pages'
import  { PrivateRoute } from './components'
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
          faArrowLeft,
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
            faArrowLeft,
            faArrowDown)

class App extends Component {
  render() {
    return (
      <Router>
        <ScrollToTop>
          <Switch>
            <Redirect from='/home' to='/' />
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/login' component={SignInUp} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            <PrivateRoute exact path='/transfer-money' component={TransferMoney} />
            <PrivateRoute exact path='/transaction-history' component={TransactionHistory} />
            <PrivateRoute exact path='/create-account' component={CreateAccount} />
            <Route component={ErrorPage} />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;
