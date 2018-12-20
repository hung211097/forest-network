import React, { Component } from 'react';
import styles from './index.scss';
import { UserCard } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApiService from '../../services/api.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import base32 from 'base32.js';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import SweetAlert from 'react-bootstrap-sweetalert';

const mapStateToProps = (state) => {
  return{
    users: state.usersReducer.users,
    profile: state.profileReducer.info,
  }
}

class ListUser extends Component {
  static propTypes = {
    users: PropTypes.array,
    profile: PropTypes.object,
    saveProfileFromApi: PropTypes.func
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      users: [],
      page: 1,
      total_page: 0,
      showConfirm: false,
      error: '',
      isShowSuccess: false,
      isShowErrorPopup: false,
    }
  }

  handleShowConfirm(){
    if(!this.state.showConfirm){
      this.setState({
        showConfirm: true
      })
    }
  }

  handleLoadMore(){
    this.apiService.getUnfollowedUsers(this.props.profile.user_id, this.state.page, 10).then((data) => {
      this.setState({
        users: [...this.state.users, ...data.users],
        total_page: data.total_page,
        page: this.state.page + 1
      })
    })
  }

  handleSubmit(){
    let temp = loadItem(keyStorage.private_key)
    let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)

    this.apiService.getPubkeysFollowing(this.props.profile.public_key, this.props.profile.following).then((data) => {
      let listPubkey = {
        addresses: []
      }

      data.forEach((item) => {
        listPubkey.addresses.push(Buffer.from(base32.decode(item.public_key)))
      })

      this.apiService.getCurrentProfile().then((userProfile) => {
        const profile = userProfile
        const tx = {
          version: 1,
          sequence: profile.sequence + 1,
          memo: Buffer.alloc(0),
          account: profile.public_key,
          operation: "update_account",
          params: {
            key: 'followings',
            value: listPubkey
          },
          signature: new Buffer(64)
        }

        let consume = calcBandwithConsume(profile, transaction.encode(tx).toString('base64'), new Date())
        if(consume > profile.bandwithMax){
          this.setState({
            error: "You don't have enough OXY to conduct transaction!",
            isShowError: true
          })
          return
        }

        transaction.sign(tx, my_private_key);
        let TxEncode = '0x' + transaction.encode(tx).toString('hex');
        this.apiService.updateListFollow(TxEncode).then((flag) => {
          if(flag === 'success'){
            this.setState({
              isShowSuccess: true,
              isSuccess: true,
              showConfirm: false,
            })
          }
          else{
            this.setState({
              isShowErrorPopup: true,
            })
          }
        })
      })
    })
  }

  componentDidMount(){
    this.handleLoadMore()
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }

  hideAlertError(){
    this.setState({
      isShowErrorPopup: false
    })
  }

  render() {
    let {users} = this.state
    return (
      <div className={styles.listUser}>
        <div className="list-follow animated fadeIn">
          <div className="row">
            {!!users.length && users.map((item, key) => {
              return(
                  <div className="col-sm-6 col-12" key={key}>
                    <UserCard user={item} onShowConfirm={this.handleShowConfirm.bind(this)}/>
                  </div>
                )
              })
            }
          </div>
          {this.state.page <= this.state.total_page &&
            <div className="load-more">
              <button className="btn btn-more" onClick={this.handleLoadMore.bind(this)}>LOAD MORE</button>
            </div>
          }
        </div>
        <button className={this.state.showConfirm ? "btn btn-azure btn-confirm" : "d-none"}
          data-tip="Confirm" onClick={this.handleSubmit.bind(this)}>
          <i><FontAwesomeIcon icon="check"/></i>
        </button>
        <ReactTooltip effect="solid"/>
        <SweetAlert
          success
          confirmBtnText="OK"
          confirmBtnBsStyle="success"
          title="Update list follow successfully!"
          show={this.state.isShowSuccess}
          onConfirm={this.hideAlertSuccess.bind(this)}
          onCancel={this.hideAlertSuccess.bind(this)}>
        </SweetAlert>
        <SweetAlert
          error
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          title={this.state.error}
          show={this.state.isShowErrorPopup}
          onConfirm={this.hideAlertError.bind(this)}
          onCancel={this.hideAlertError.bind(this)}>
        </SweetAlert>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListUser);
