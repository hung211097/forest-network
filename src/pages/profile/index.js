import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import cover from '../../images/game.jpg'
import { ListFollowers, ListFollowing, Timeline } from '../../components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import defaultAvatar from '../../images/default-avatar.png'

const mapStateToProps = (state) => {
  return{
    numFollowers: state.profileReducer.numFollowers,
    numFollowing: state.profileReducer.numFollowing,
    profile: state.profileReducer.info
  }
}

class Profile extends Component {
  static propTypes = {
    numFollowers: PropTypes.number,
    numFollowing: PropTypes.number,
    profile: PropTypes.object
  }
	constructor(props){
    super(props)
    this.state = {
      numNavTag: 1
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

  render() {
    let {profile} = this.props
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
                        <img src={profile.avatar ? profile.avatar : defaultAvatar} alt="Avatar" className="avatar img-circle" />
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
                              <FontAwesomeIcon icon="edit" /> Edit Profile
                            </Link>
													</div>
												</div>
											</div>
											<div className="section">
												<h3>Currency, energy</h3>
												<p>Balance: 100,000,000 Cellulose</p>
												<p>Current Energy: 21122 OXY</p>
												<p>Consumed Energy: 1513 OXY</p>
											</div>
											<div className="section">
												<h3>About Me</h3>
												<p dangerouslySetInnerHTML={{ __html: profile.about }}></p>
											</div>
											<div className="section">
												<h3>Statistics</h3>
												<p><span className="badge">{332 + this.props.numFollowing}</span> Following</p>
												<p><span className="badge">{124 + this.props.numFollowers}</span> Followers</p>
												<p><span className="badge">620</span> Likes</p>
											</div>
											<div className="section">
												<h3>Social</h3>
												<ul className="list-unstyled list-social">
													<li><a href="null"><FontAwesomeIcon icon={['fab', 'twitter']} /> @jhongrwo</a></li>
													<li><a href="null"><FontAwesomeIcon icon={['fab', 'facebook']} /> John grow</a></li>
													<li><a href="null"><FontAwesomeIcon icon={['fab', 'dribbble']} /> johninizzie</a></li>
													<li><a href="null"><FontAwesomeIcon icon={['fab', 'linkedin']} /> John grow</a></li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-md-8">
										<div className="profile-info-right">
											<ul className="nav nav-pills nav-pills-custom-minimal custom-minimal-bottom">
												<li className={(this.state.numNavTag === 1)	? 'active' : ''}><Link to="/profile" className="nav-tag" onClick={this.handleTimeline.bind(this)}>Timeline</Link></li>
												<li className={(this.state.numNavTag === 2)	? 'active' : ''}><Link to="/profile" className="nav-tag" onClick={this.handleFollowers.bind(this)}>Followers</Link></li>
												<li className={(this.state.numNavTag === 3)	? 'active' : ''}><Link to="/profile" className="nav-tag" onClick={this.handleFollowing.bind(this)}>Following</Link></li>
											</ul>
											<div className="tab-content">
												{(this.state.numNavTag === 1)	? <Timeline /> :
													(this.state.numNavTag === 2) ? <ListFollowers /> :
													(this.state.numNavTag === 3) ? <ListFollowing /> :
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
