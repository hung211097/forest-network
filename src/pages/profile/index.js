import React, { Component } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import avatar from '../../images/guy-3.jpg'
import cover from '../../images/game.jpg'
import { ListFollowers, ListFollowing, Timeline } from '../../components'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return{
		numFollowers: state.profileReducer.numFollowers,
		numFollowing: state.profileReducer.numFollowing,
    status: state.profileReducer.status
  }
}

class Profile extends Component {	
  render() {
    return (
			<Layout>
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
                        <img src={avatar} alt="Avatar" className="avatar img-circle" />
												<h2>John Breakgrow jr.</h2>
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
											<div className="section">
												<h3>About Me</h3>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ullamcorper ligula. Curabitur in sapien sed risus finibus condimentum et ac quam. Quisque eleifend, lacus ut commodo pulvinar, elit augue eleifend leo, eget suscipit augue erat id orci. .</p>
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
											{(this.props.status===1) ? <Timeline /> : (this.props.status===2) ? <ListFollowers /> : (this.props.status===3) ? <ListFollowing /> : ''}
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
