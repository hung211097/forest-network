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
            sequence: 0
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

    UNSAFE_componentWillReceiveProps(props){
      if(this.props.match.params.id !== props.match.params.id){
        this.setState({
          numNavTag: 1
        })
        this.loadInfoUser(props)
      }
    }

    loadInfoUser(props){
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
        if(+this.props.match.params.id === +this.props.profile.user_id){
          this.props.history.push('/profile')
        }
        this.loadInfoUser(this.props)
    }

    handleErrorImg(e){
      e.target.onerror = null;
      e.target.src = defaultAvatar
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
                                                      onError={this.handleErrorImg.bind(this)}/>
                                                    <h2>{this.state.username}</h2>
                                                </div>
                                                <div className="action-buttons">
                                                    <div className="row">
                                                        <div className="col-xs-6">
                                                            <a href="null" className="btn btn-azure btn-block" hidden><FontAwesomeIcon icon="user-plus" /> Follow</a>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <a href="null" className="btn btn-azure btn-block" hidden><FontAwesomeIcon icon="envelope" /> Message</a>
                                                        </div>
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
                                                        (this.state.numNavTag === 2) ? <ListFollowers idGetListFollow={+this.props.match.params.id}/> :
                                                            (this.state.numNavTag === 3) ? <ListFollowing idGetListFollow={+this.props.match.params.id}/> :
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
                </div>
            </Layout>
        );
    }
};

export default withRouter(connect(mapStateToProps)(Others));
