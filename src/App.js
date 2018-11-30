import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import {Home, SignInUp} from './pages'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Redirect from='/home' to='/' />
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={SignInUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
