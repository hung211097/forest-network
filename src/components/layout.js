import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Header, Footer} from './index';
import { connect } from 'react-redux';
import ApiService from '../services/api.service';
import { saveProfileFromApi } from '../actions';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{ 
    saveProfileFromApi: (info) => {dispatch(saveProfileFromApi(info))},
  }
}

class Layout extends Component {
  static propTypes = {
      children: PropTypes.any.isRequired,
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
  }

  componentDidMount(){
      this.apiService.getCurrentProfile().then((data) => {
      if(data){
        this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
      }
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
