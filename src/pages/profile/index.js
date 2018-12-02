import React, { Component } from 'react';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../../components'
import avatar from '../../images/guy-3.jpg'
import cover from '../../images/game.jpg'
import { ListFollowers, ListFollowing } from '../../components'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return{
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
														<a href="null" className="btn btn-azure btn-block"><FontAwesomeIcon icon="user-plus" /> Follow</a>
													</div>
													<div className="col-xs-6">
														<a href="null" className="btn btn-azure btn-block"><FontAwesomeIcon icon="envelope" /> Message</a>
													</div>
												</div>
											</div>
											<div className="section">
												<h3>About Me</h3>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed ullamcorper ligula. Curabitur in sapien sed risus finibus condimentum et ac quam. Quisque eleifend, lacus ut commodo pulvinar, elit augue eleifend leo, eget suscipit augue erat id orci. .</p>
											</div>
											<div className="section">
												<h3>Statistics</h3>
												<p><span className="badge">332</span> Following</p>
												<p><span className="badge">124</span> Followers</p>
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
												<ul className="list-group">
													<li className="list-group-item">
														<div id="carbonads"><span><span className="carbon-wrap"><a href="//srv.carbonads.net/ads/click/x/GTND42QWCKSDPKJECWYLYKQMCE7I5K3LCV7DPZ3JCWBDC2QWCYSD5K7KC6BIVK7NCWYI6K3EHJNCLSIZ?segment=placement:bootdeycom;" className="carbon-img" target="_blank" rel="noopener noreferrer"><img src="https://cdn4.buysellads.net/uu/1/3386/1525189909-61450.png" alt="true" border={0} height={100} width={130} style={{maxWidth: 130}} /></a><a href="//srv.carbonads.net/ads/click/x/GTND42QWCKSDPKJECWYLYKQMCE7I5K3LCV7DPZ3JCWBDC2QWCYSD5K7KC6BIVK7NCWYI6K3EHJNCLSIZ?segment=placement:bootdeycom;" className="carbon-text" target="_blank" rel="noopener noreferrer">Adobe Creative Cloud for Teams starting at $29.99 per month.</a></span><a href="http://carbonads.net/?utm_source=bootdeycom&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon" className="carbon-poweredby" target="_blank" rel="noopener noreferrer">ads via Carbon</a></span></div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="col-md-8">										
											{(this.props.status===2) ? <ListFollowers /> : (this.props.status===3) ? <ListFollowing /> : ''}
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
