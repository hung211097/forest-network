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
    // console.log("OKOKOKOKOKOK");
    this.checkProfile()
  }

  componentDidUpdate(prevProps){
    // console.log("OK");
    // console.log(this.props.profile);
    // console.log(prevProps.profile);
    // if(this.props.profile. !== prevProps.profile){
    //   this.checkProfile()
    // }
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
