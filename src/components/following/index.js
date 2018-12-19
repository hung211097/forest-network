import React, { Component } from 'react';
import { connect } from 'react-redux'
import  styles from './index.scss';
import PropTypes from 'prop-types'
import ApiService from '../../services/api.service';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import base32 from 'base32.js';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import defaultAvatar from '../../images/default-avatar.png';
import { unFollowUser } from '../../actions';
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const mapDispatchToProps = (dispatch) => {
  return{
    unFollowUser: (user_id) => {dispatch(unFollowUser(user_id))},
  }
}

const mapStateToProps = (state) => {
  return{
    usersFollowing: state.profileReducer.usersFollowing,
    profile: state.profileReducer.info,
  }
}

class ListFollowing extends Component {
  static propTypes = {
    usersFollowing: PropTypes.array,
    profile: PropTypes.object,
    unFollowUser: PropTypes.func
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
      isShowErrorPopup: false
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
    this.apiService.getFollowing(this.props.profile.user_id, this.state.page, 3).then((data) => {
      this.setState({
        users: [...this.state.users, ...data.followings],
        total_page: data.total_page,
        page: this.state.page + 1
      })
    })
  }

  handleSubmit(){
    const {profile} = this.props
    let temp = loadItem(keyStorage.private_key)
    let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)

    this.apiService.getPubkeysFollowing(profile.public_key, profile.following).then((data) => {
      let listPubkey = {
        addresses: []
      }

      data.forEach((item) => {
        listPubkey.addresses.push(Buffer.from(base32.decode(item.public_key)))
      })

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
          isShowErrorPopup: true
        })
        return
      }

      transaction.sign(tx, my_private_key);
      let TxEncode = '0x' + transaction.encode(tx).toString('hex');
      this.apiService.updateListFollow(TxEncode).then((flag) => {
        if(flag === 'success'){
          this.setState({
            isShowSuccess: true,
            showConfirm: false
          })
        }
        else{
          this.setState({
            isShowErrorPopup: true,
            error: 'Fail to update list follow!'
          })
        }
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

  handleChangeFollow(user_id) {
    this.props.unFollowUser && this.props.unFollowUser(user_id);
    this.handleShowConfirm()
    this.setState({
      users: this.state.users.filter((item) =>{
        return item.user_id !== user_id
      })
    })
  }

  render() {
    return (
      <div className={styles.following}>
        {/* following */}
        <div className="tab-pane fade active in" id="following">
          {!!this.state.users.length && this.state.users.map((item, key) => {
              return(
                <div className="media user-following" key={key}>
                  <img src={item.avatar ? item.avatar : defaultAvatar} alt="User Avatar"
                    className="media-object pull-left" />
                  <div className="media-body">
                    <a href="null">{item.username}<br /><span className="text-muted username">@username</span></a>
                    <button type="button" className="btn btn-sm btn-danger pull-right"
                      onClick={this.handleChangeFollow.bind(this, item.user_id)}>
                      <i className="fa fa-close-round" /> Unfollow
                    </button>
                  </div>
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
        <button className={this.state.showConfirm ? "btn btn-azure btn-confirm" : "d-none"}
          data-tip="Confirm" onClick={this.handleSubmit.bind(this)}>
          <i><FontAwesomeIcon icon="check"/></i>
        </button>
        <ReactTooltip effect="solid"/>
        {/* end following */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowing);
