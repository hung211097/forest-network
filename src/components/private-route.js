import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ApiService from '../services/api.service';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveProfileFromApi } from '../actions';

const mapDispatchToProps = (dispatch) => {
  return{
    saveProfileFromApi: (info) => {dispatch(saveProfileFromApi(info))},
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class PrivateRoute extends Component {
  static propTypes = {
    config: PropTypes.any,
    saveProfileFromApi: PropTypes.func,
    profile: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      block: true
    }
  }

  checkProfile(){
    this.apiService.getCurrentProfile().then((data) => {
      if(!data){
        this.props.history.push('/login')
      }
      else{
        this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
        this.setState({
          block: false
        })
      }
    })
  }

  componentDidMount(){
    this.checkProfile()
  }

  componentDidUpdate(prevProps){
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkProfile()
    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
