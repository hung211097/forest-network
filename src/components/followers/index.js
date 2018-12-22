import React, { Component } from 'react';
import { connect } from 'react-redux'
import  styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { followUser, unFollowUser } from '../../actions';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (user_id) => {dispatch(followUser(user_id))},
    unFollowUser: (user_id) => {dispatch(unFollowUser(user_id))},
  }
}

const mapStateToProps = (state) => {
  return{
    usersFollow: state.profileReducer.usersFollow,
    profile: state.profileReducer.info,
  }
}

class ListFollowers extends Component {
  static propTypes = {
    usersFollow: PropTypes.array,
    followUser: PropTypes.func,
    unFollowUser: PropTypes.func,
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
    this.apiService.getFollowers(this.props.idGetListFollow, this.state.page, 3).then((data) => {
      data.followers.forEach((item) => {
        let temp = this.props.profile.following.find((findItem) => {
          return findItem === item.user_id
        })
        if(temp){
          item.isFollow = true
        }
        else{
          item.isFollow = false
        }
      })
      this.setState({
        users: [...this.state.users, ...data.followers],
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

  handleChangeFollow(item) {
    if(item.isFollow){
      this.props.unFollowUser && this.props.unFollowUser(item.user_id);
    }
    else{
      this.props.followUser && this.props.followUser(item.user_id);
    }
    this.handleShowConfirm()
    let temp = this.state.users.slice()
    for(let i = 0; i < temp.length; i++){
      if(temp[i].user_id === item.user_id){
        temp[i].isFollow = !temp[i].isFollow
        break
      }
    }
    this.setState({
      users: temp
    })
  }

  render() {
    console.log(this.props.profile);
    return (
      <div className={styles.followers}>
        {/* followers */}
        <div className="tab-pane fade active in" id="followers">
          {!!this.state.users.length && this.state.users.map((item, key) => {
              return(
                <div className="media user-follower" key={key}>
                  <Link to={"/user/" + item.user_id}>
                    <img src={item.avatar ? item.avatar : defaultAvatar} alt="User Avatar"
                      className="media-object pull-left" />
                  </Link>
                  <div className="media-body">
                    <Link to={"/user/" + item.user_id}>
                      {item.username}<br /><span className="text-muted username">@username</span>
                    </Link>
                    {item.isFollow ?
                      <button type="button" className="btn btn-sm btn-toggle-following pull-right"
                        onClick={this.handleChangeFollow.bind(this, item)}>
                        <span>Following</span>
                      </button>
                      :
                      <button type="button" className="btn btn-sm btn-default pull-right"
                        onClick={this.handleChangeFollow.bind(this, item)}>
                        <FontAwesomeIcon icon="plus" /> Follow
                      </button>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
        {/* end followers */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowers);
