import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import cover from '../../images/cover-image.jpg'
import { ListFollowers, ListFollowing, OthersPost } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import defaultAvatar from '../../images/default-avatar.png'
import ApiService from '../../services/api.service'
import { withRouter } from 'react-router'
import { followUser, unFollowUser } from '../../actions';
import SweetAlert from 'react-bootstrap-sweetalert';
import CryptoJS from 'crypto-js';
import { keyStorage } from '../../constants/localStorage';
import { loadItem } from '../../services/storage.service';
import { SecretKey } from '../../constants/crypto';
import base32 from 'base32.js';
import transaction from '../../lib/transaction';
import { calcBandwithConsume } from '../../services/utils.service';


const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (user_id) => { dispatch(followUser(user_id)) },
        unFollowUser: (user_id) => { dispatch(unFollowUser(user_id)) },
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.info
    }
}

class Others extends Component {
    static propTypes = {
        profile: PropTypes.object,
        idGetListFollow: PropTypes.number
    }
    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            numNavTag: 1,
            intervalId: 0,
            balance: 0,
            currentEnergy: 0,
            consumedEnergy: 0,
            avatar: "",
            username: "",
            followers: 0,
            following: 0,
            sequence: 0,
            isFollowed: false,
            error: '',
            isShowSuccess: false,
            isShowErrorPopup: false
        }
    }

    handleTimeline() {
        this.setState({
            numNavTag: 1
        })
    }

    handleFollowers() {
        this.setState({
            numNavTag: 2
        })
    }

    handleFollowing() {
        this.setState({
            numNavTag: 3
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.match.params.id !== props.match.params.id) {
            this.setState({
                numNavTag: 1
            })
            this.loadInfoUser(props)
        }
    }

    loadInfoUser(props) {
        this.apiService.getInfoUser(props.match.params.id).then((res) => {
            this.setState({
                balance: res.info_user.amount,
                currentEnergy: res.info_user.bandwithMax - res.info_user.bandwith,
                consumedEnergy: res.info_user.bandwith,
                avatar: res.info_user.avatar,
                username: res.info_user.username,
                followers: res.info_user.follower.length,
                following: res.info_user.following.length,
                sequence: res.info_user.sequence
            })
        })
    }
    componentDidMount() {
        if (+this.props.match.params.id === +this.props.profile.user_id) {
            this.props.history.push('/profile')
        }
        this.loadInfoUser(this.props)
        this.props.profile.following.forEach(element => {
            if (element === +this.props.match.params.id) {
                this.setState({
                    isFollowed: true
                })
            }
        });
    }

    handleErrorImg(e) {
        e.target.onerror = null;
        e.target.src = defaultAvatar
    }

    handleSubmit() {
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
                            isShowSuccess: true,
                            isSuccess: true,
                            isFollowed: !this.state.isFollowed
                        })
                    }
                    else {
                        this.setState({
                            isShowErrorPopup: true,
                        })
                    }
                })
            })
        })
    }

    handleChangeFollow() {
        if (this.state.isFollowed) {
            this.props.unFollowUser && this.props.unFollowUser(+this.props.match.params.id);
            this.handleSubmit()
        }
        else {
            this.props.followUser && this.props.followUser(+this.props.match.params.id);
            this.handleSubmit()
        }
    }

    hideAlertSuccess() {
        this.setState({
            isShowSuccess: false
        })
    }

    hideAlertError() {
        this.setState({
            isShowErrorPopup: false
        })
    }
    render() {
        return (
            <Layout>
                <div className={styles.profile}>
                    <div className="container page-content">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="user-profile">
                                    <div className="profile-header-background">
                                        <img src={cover} alt="Profile Header Background" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="profile-info-left">
                                                <div className="text-center">
                                                    <img src={this.state.avatar ? this.state.avatar : defaultAvatar}
                                                        alt="Avatar" className="avatar img-circle"
                                                        onError={this.handleErrorImg.bind(this)} />
                                                    <h2>{this.state.username}</h2>
                                                </div>
                                                <div className="action-buttons">
                                                    <div className="row">
                                                        <button className="btn btn-azure btn-block" onClick={this.handleChangeFollow.bind(this)}>{this.state.isFollowed ? null : <FontAwesomeIcon icon="user-plus" />}{this.state.isFollowed ? "Following" : "Follow"}</button>
                                                    </div>
                                                </div>
                                                <div className="section no-margin">
                                                    <h3>Currency, energy</h3>
                                                    <p>Balance: {this.state.balance} Cellulose</p>
                                                    <p>Current Energy: {this.state.currentEnergy} OXY</p>
                                                    <p>Consumed Energy: {this.state.consumedEnergy} OXY</p>
                                                    <p>Sequence: {this.state.sequence}</p>
                                                </div>
                                                <div className="section">
                                                    <h3>Statistics</h3>
                                                    <p><span className="badge">{this.state.following}</span> Following</p>
                                                    <p><span className="badge">{this.state.followers}</span> Followers</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="profile-info-right">
                                                <ul className="nav nav-pills nav-pills-custom-minimal custom-minimal-bottom">
                                                    <li className={(this.state.numNavTag === 1) ? 'active' : ''}><span className="nav-tag" onClick={this.handleTimeline.bind(this)}>Timeline</span></li>
                                                    <li className={(this.state.numNavTag === 2) ? 'active' : ''}><span className="nav-tag" onClick={this.handleFollowers.bind(this)}>Followers</span></li>
                                                    <li className={(this.state.numNavTag === 3) ? 'active' : ''}><span className="nav-tag" onClick={this.handleFollowing.bind(this)}>Following</span></li>
                                                </ul>
                                                <div className="tab-content">
                                                    {(this.state.numNavTag === 1) ? <OthersPost user_id={this.props.match.params.id} /> :
                                                        (this.state.numNavTag === 2) ? <ListFollowers idGetListFollow={+this.props.match.params.id} /> :
                                                            (this.state.numNavTag === 3) ? <ListFollowing idGetListFollow={+this.props.match.params.id} /> :
                                                                ''
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        title={this.state.error}
                        show={this.state.isShowErrorPopup}
                        onConfirm={this.hideAlertError.bind(this)}
                        onCancel={this.hideAlertError.bind(this)}>
                    </SweetAlert>
                </div>
            </Layout>
        );
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Others));
