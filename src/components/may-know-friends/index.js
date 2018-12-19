import React, { Component } from 'react';
import styles from'./index.scss';
import ApiService from '../../services/api.service';
import { MayKnowFriendsItem } from '../../components';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';
import SweetAlert from 'react-bootstrap-sweetalert';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import base32 from 'base32.js';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

class MayKnowFriends extends Component {
  static propTypes = {
    profile: PropTypes.object
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      users: [],
      isSubmit: false,
      isShowError: false,
      error: '',
      showConfirm: false,
      isShowSuccess: false,
      isShowErrorPopup: false,
      isSuccess: false,
    }
  }

  componentDidMount(){
    const {profile} = this.props
    this.apiService.getUnfollowedUsers(profile.user_id, 1, 3).then((data) => {
      if(data){
        this.setState({
          users: data.users
        })
      }
    })
  }

  handleShowConfirm(){
    if(!this.state.showConfirm){
      this.setState({
        showConfirm: true
      })
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.setState({
      isSubmit: true
    })

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
            showConfirm: false
          })
        }
        else{
          this.setState({
            isShowErrorPopup: true,
            showConfirm: false
          })
        }
      })
    })
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
    return (
      <div className={styles.mayKnowFriend}>
        <div className="widget-mayknow">
          <div className="widget-header">
            <h3 className="widget-caption">New People</h3>
          </div>
          <div className="widget-body bordered-top bordered-sky">
            <div className="card-mayknow">
              <div className="content">
                <ul className="list-unstyled team-members">
                  {!!this.state.users.length && this.state.users.map((item, key) => {
                      return(
                        <li key={key}>
                          <MayKnowFriendsItem user={item}
                            onShowConfirm={this.handleShowConfirm.bind(this)}
                            isSuccess={this.state.isSuccess}/>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            {this.state.isShowError &&
              <p className="error">{this.state.error}</p>
            }
            {this.state.showConfirm &&
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="confirmation">
                  <button className="btn btn-azure" onClick={this.handleSubmit.bind(this)}>Confirm</button>
                </div>
              </form>
            }
          </div>
        </div>
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
          title="Fail to update list follow!"
          show={this.state.isShowErrorPopup}
          onConfirm={this.hideAlertError.bind(this)}
          onCancel={this.hideAlertError.bind(this)}>
        </SweetAlert>
      </div>
    );
  }
}

export default connect(mapStateToProps)(MayKnowFriends);
