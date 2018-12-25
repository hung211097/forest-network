import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import cover from '../../images/cover-image.jpg'
import { ListFollowers, ListFollowing, Timeline } from '../../components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import defaultAvatar from '../../images/default-avatar.png'
import ApiService from '../../services/api.service'
import { fromNowDate } from '../../services/utils.service';

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.info
  }
}

class Profile extends Component {
  static propTypes = {
    profile: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.apiService = ApiService()
    this.state = {
      numNavTag: 1,
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

  handleErrorImg(e){
    e.target.onerror = null;
    e.target.src = defaultAvatar
  }

  render() {
    let { profile } = this.props
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
                          <img src={profile.avatar ? profile.avatar : defaultAvatar}
                            alt="Avatar"
                            className="avatar img-circle"
                            onError={this.handleErrorImg.bind(this)}/>
                          <h2>{profile.username}</h2>
                        </div>
                        <div className="action-buttons">
                          <div className="row">
                            <div className="col-xs-6">
                              <a href="null" className="btn btn-azure btn-block" hidden><FontAwesomeIcon icon="user-plus" /> Follow</a>
                            </div>
                            <div className="col-xs-6">
                              <a href="null" className="btn btn-azure btn-block" hidden><FontAwesomeIcon icon="envelope" /> Message</a>
                            </div>
                            <div className="col-12">
                              <Link to='/edit-profile' className="btn btn-azure btn-block">
                                <i><FontAwesomeIcon icon="edit" /></i> Edit Profile
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="section">
                          <h3>Currency, energy</h3><p>Balance: {profile.amount} Cellulose</p>
                          <p>Current Energy: {profile.bandwithMax - profile.bandwith} OXY</p>
                          <p>Consumed Energy: {profile.bandwith} OXY</p>
                          <p>Sequence: {profile.sequence}</p>
                          <p>Last transaction: {fromNowDate(profile.bandwithTime)}</p>
                        </div>
                        <div className="section">
                          <h3>Statistics</h3>
                          <p><span className="badge">{profile.following.length}</span> Following</p>
                          <p><span className="badge">{profile.follower.length}</span> Followers</p>
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
                          {
                            (this.state.numNavTag === 1) ? <Timeline /> :
                            (this.state.numNavTag === 2) ? <ListFollowers idGetListFollow={this.props.profile.user_id}/> :
                            (this.state.numNavTag === 3) ? <ListFollowing idGetListFollow={this.props.profile.user_id}/> :
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

export default connect(mapStateToProps)(Profile);
