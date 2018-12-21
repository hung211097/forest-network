import React, { Component } from 'react';
import styles from'./index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createPost } from '../../actions';
import ApiService from '../../services/api.service'
import {calcBandwithConsume} from '../../services/utils.service'
import { Keypair } from 'stellar-base';
import transaction from '../../lib/transaction';
import SweetAlert from 'react-bootstrap-sweetalert';
import PropTypes from 'prop-types'
import { SecretKey } from '../../constants/crypto';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { saveProfileFromApi } from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return{
    createPost: (post) => {dispatch(createPost(post))},
		saveProfileFromApi: (info) => {dispatch(saveProfileFromApi(info))},
  }
}

const mapStateToProps = (state) => {
  let temp = state.postsReducer.posts.concat()
  temp.sort((a, b) => {
    return a.id - b.id
  })
  return{
    profile: state.profileReducer.info,
    posts: temp
  }
}

class PostBox extends Component {
  static propTypes = {
    createPost: PropTypes.func,
    profile: PropTypes.object,
		saveProfileFromApi: PropTypes.func
  }

  constructor(props){
    super(props)
		this.apiService = ApiService()
    this.state = {
      content: '',
			privateKey: 'SCC364LOGS5SHIYYK3RJEYP6AHL5GQN2LCYZPAH6643IM3LYUZW74LFH',
      isShowError: false,
			error: '',
      isShowSuccess: false
    }
  }

	hideAlertError(){
    this.setState({
      isShowError: false
    })
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }
	
  handleSubmit(){
    if(this.state.content){			
			this.apiService.getCurrentProfile().then((data) => {
				if(!data){
					this.props.history.push('/login')
				}
				else{
					this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
					console.log(this.props.profile)
					const plainTextContent = {
						type: 1,
						text: this.state.content
					}
					
					let tx = {
						version: 1,
						account: this.props.profile.public_key,
						sequence: this.props.profile.sequence + 1,
						memo: Buffer.alloc(0),
						operation: "post",
						params: {
							keys: [],
							content: plainTextContent,
						},
						signature: new Buffer(64)
					}
					console.log(this.props.profile.sequence);
					console.log(this.props.profile.bandwith);
					let temp = loadItem(keyStorage.private_key)
					let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)
					transaction.sign(tx, my_private_key);
					let TxEncode = '0x' + transaction.encode(tx).toString('hex');
					
					const consume = calcBandwithConsume(this.props.profile, transaction.encode(tx).toString('base64'), new Date());
					if(consume > this.props.profile.bandwithMax){
						this.setState({
							error: "You don't have enough OXY to conduct transaction!",
							isShowError: true
						})
					}
					else {
						this.apiService.createPost(TxEncode).then((status) => {
							if(status === 'success'){
								this.setState({
									content: ''
								})
							}
							else{
								console.log(status)
							}
						})
					}
				}
			})			
    }
  }

  handleChangeContent(e){
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <div className={styles.postBox}>
        <div className="box profile-info n-border-top">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea className="form-control input-lg p-text-area" rows={2} placeholder="Whats in your mind today?"
              value={this.state.content} onChange={this.handleChangeContent.bind(this)}/>
          </form>
          <div className="box-footer box-form">
            <button type="button" className="btn btn-azure float-right" onClick={this.handleSubmit.bind(this)}>Post</button>
            <ul className="nav nav-pills">
              <li><a href="null"><i><FontAwesomeIcon icon="image"/></i></a></li>
            </ul>
          </div>
        </div>
			
				<SweetAlert
					error
					confirmBtnText="OK"
					confirmBtnBsStyle="danger"
					title={this.state.error}
					show={this.state.isShowError}
					onConfirm={this.hideAlertError.bind(this)}
					onCancel={this.hideAlertError.bind(this)}>
				</SweetAlert>
				<SweetAlert
					success
					confirmBtnText="OK"
					confirmBtnBsStyle="success"
					title="Update profile successfully!"
					show={this.state.isShowSuccess}
					onConfirm={this.hideAlertSuccess.bind(this)}
					onCancel={this.hideAlertSuccess.bind(this)}>
				</SweetAlert>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
