import React, { Component } from 'react';
import styles from './index.scss';
import { Layout } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, InputGroup, Input, FormGroup, } from 'reactstrap';
import { connect } from 'react-redux'
import ApiService from '../../services/api.service'
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class SearchUser extends Component {
  static propTypes = {
    profile: PropTypes.object,
    saveProfileFromApi: PropTypes.func
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
			rSelected: 'PublicKey',
      inputSearch: '',
      isSubmit: false,
      error: '',
      isShowError: false,
      isShow: false,
			usersResult: []
    }
  }

  handleChangeInputSearch(e){
    this.setState({
      inputSearch: e.target.value
    })
  }

	onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  handleSubmit(e){
		e.preventDefault(0)
		this.setState({
			usersResult: []
		})
		
		this.apiService.getSearchUsers(this.state.rSelected, this.state.inputSearch).then((res) => {
			res.users.map(user => {
				return(this.setState ({
					usersResult: this.state.usersResult.concat({
						id: user.user_id,
						publicKey: user.public_key,
						avatar:user.avatar,
						username: user.username
					})
				}))
			})		
		})
  }
	
	handleGoToOther(id){
		this.props.history.push(`/other/${id}`);
  }

  hideAlert(){
    this.setState({
      isShow: false
    })
  }

  hideAlertError(){
    this.setState({
      isShowError: false
    })
  }

  render() {
		const listUsers = this.state.usersResult.map(user => {
			return (
				<tr className="result-users" key={user.id} onClick={this.handleGoToOther.bind(this, user.id)}>					
					<td>{user.username}</td>
					<td><img src={user.avatar} height="60" width="60" alt="Avatar" className="avatar img-circle" /></td>
					<td>{user.publicKey}</td>
				</tr>
			);
		})
		
    return (
      <Layout>
        <div className={styles.searchUser}>
          <h2 className="text-center page-title">Search User</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="info-account container">
                <div className="info">
									<h2 className="title">Info User</h2>
                  <FormGroup>
                    <ButtonGroup>
											<Button color="primary" onClick={() => this.onRadioBtnClick('PublicKey')} active={this.state.rSelected === 'PublicKey'}>Public Key</Button>
											<Button color="primary" onClick={() => this.onRadioBtnClick('Username')} active={this.state.rSelected === 'Username'}>Username</Button>
										</ButtonGroup>                    
                  </FormGroup>
                  <InputGroup>
										<Input value={this.state.your_public_key} name="input-search"
											onChange={this.handleChangeInputSearch.bind(this)}
											placeholder={this.state.rSelected}/>
										<button type="button" className="btn btn-azure btn-search" onClick={this.handleSubmit.bind(this)}>Search</button>
									</InputGroup>									
                </div>
              </div>
							<div className="arrow">
                <i className="d-sm-block d-none"><FontAwesomeIcon icon="arrow-down"/></i>
              </div>
              <div className="result-account container">
                <div className="info">
                  <h2 className="title">Result User</h2>
									{this.state.usersResult.length===0 
									? <div>Didn't find any users</div>
									: <table>
											<thead>
												<tr>
													<th>Username</th>
													<th>Avatar</th>
													<th>Public key</th>
												</tr>
											</thead>
											<tbody>
											{listUsers}
											</tbody>
										</table>
									}
                </div>
              </div>
          </form>
          <SweetAlert
          	success
          	confirmBtnText="OK"
          	confirmBtnBsStyle="success"
          	title="Searching successfully!"
            show={this.state.isShow}
            onConfirm={this.hideAlert.bind(this)}
            onCancel={this.hideAlert.bind(this)}>
          </SweetAlert>
          <SweetAlert
          	error
          	confirmBtnText="OK"
          	confirmBtnBsStyle="danger"
          	title={this.state.error}
            show={this.state.isShowError}
            onConfirm={this.hideAlertError.bind(this)}
            onCancel={this.hideAlertError.bind(this)}>
          </SweetAlert>
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps)(SearchUser);
