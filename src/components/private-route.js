import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ApiService from '../services/api.service';
import { Route } from 'react-router-dom'

class PrivateRoute extends Component {
  static propTypes = {
    config: PropTypes.any,
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      block: true
    }
  }

  componentDidMount(){
    this.apiService.getCurrentProfile().then((data) => {
      if(!data){
        this.props.history.push('/login')
      }
      else{
        this.setState({
          block: false
        })
      }
    })
  }

  render() {
    if(this.state.block){
      return null
    }
    return (
      <Route {...this.props} />
    );
  }
}

export default withRouter(PrivateRoute);
