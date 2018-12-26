import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { followUser, unFollowUser, closePopup } from '../../actions';
import defaultAvatar from '../../images/default-avatar.png';
import { Link } from 'react-router-dom'
import ApiService from '../../services/api.service';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import base32 from 'base32.js';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (user_id) => {dispatch(followUser(user_id))},
    unFollowUser: (user_id) => {dispatch(unFollowUser(user_id))},
    closePopup: () => {dispatch(closePopup())}
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class ReactUsersItem extends Component {
  static propTypes = {
    profile: PropTypes.object,
    followUser: PropTypes.func,
    unFollowUser: PropTypes.func,
    closePopup: PropTypes.func,
    post: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      error: '',
      isShowError: false,
      isFollow: this.props.post.isFollow
    }
  }

  handleChangeFollow(item){
    if(item.isFollow){
      this.handleSubmit(item.User.user_id, false)
    }
    else{
      this.handleSubmit(item.User.user_id, true)
    }
  }

  handleSubmit(newId, isFollow) {
      let temp = loadItem(keyStorage.private_key)
      let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)
      let arrFollows = this.props.profile.following

      if(isFollow){
        arrFollows.push(newId)
        this.props.followUser && this.props.followUser(newId);
      }
      else{
        arrFollows = arrFollows.filter((item) => {
          return item !== newId
        })
        this.props.unFollowUser && this.props.unFollowUser(newId);
      }

      this.apiService.getPubkeysFollowing(this.props.profile.public_key, arrFollows).then((data) => {
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
              if (consume > profile.bandwithMax) {
                  this.setState({
                      error: "You don't have enough OXY to conduct transaction!",
                      isShowError: true
                  })
                  return
              }

              transaction.sign(tx, my_private_key);
              let TxEncode = '0x' + transaction.encode(tx).toString('hex');
              this.apiService.updateListFollow(TxEncode).then((flag) => {
                  if (flag === 'success') {
                      this.setState({
                          isFollow: !this.state.isFollow
                      })
                  }
                  else {
                      this.setState({
                          error: "Fail to update list follow!",
                          isShowError: true,
                      })
                  }
              })
          })
      })
  }

  closeModal(){
    this.props.closePopup && this.props.closePopup()
  }

  handleErrorImg(e){
    e.target.onerror = null;
    e.target.src = defaultAvatar
  }

  render() {
    let {post} = this.props
    return (
      <div className={styles.reactUserItem}>
        <div className="card-user row">
          <div className="col-3">
            <Link to={"/user/" + post.User.user_id} onClick={this.closeModal.bind(this)}>
              <img src={post.User.avatar ? post.User.avatar : defaultAvatar } alt="avatar" onError={this.handleErrorImg.bind(this)}/>
            </Link>
          </div>
          <div className="col-5 username">
            <Link to={"/user/" + post.User.user_id} onClick={this.closeModal.bind(this)}>
              <span className="user-name">{post.User.username}</span>
            </Link>
          </div>
          <div className="col-4 follow-btn">
            {this.state.isFollow && post.User.user_id !== this.props.profile.user_id ?
              <span className="btn btn-sm btn-toggle-following"
                onClick={this.handleChangeFollow.bind(this, post)}>
                <span>Following</span>
              </span>
              : !this.state.isFollow && post.User.user_id !== this.props.profile.user_id ?
              <span className="btn btn-sm btn-default"
                onClick={this.handleChangeFollow.bind(this, post)}>
                <FontAwesomeIcon icon="plus" /> Follow
              </span>
              : null
            }
          </div>
          {this.state.isShowError &&
            <span className="error">{this.state.error}</span>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactUsersItem);
