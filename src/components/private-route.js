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

class PrivateRoute extends Component {
  static propTypes = {
    config: PropTypes.any,
    saveProfileFromApi: PropTypes.func
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      block: true,
			bandwith: 0
    }
  }

  componentDidMount(){
		fetch('http://localhost:8888/users/29')
      .then(res => res.json())
			.then(dataFetch => {				
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
        console.log(dataFetch.info_user.bandwith)
				this.setState({
					bandwith: dataFetch.info_user.bandwith
				})
			});
  }

  render() {
		const a = this.state.bandwith
    if(this.state.block){
      return null
    }
    return (
      <Route {...this.props} />
    );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(PrivateRoute));
