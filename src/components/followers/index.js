import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { chooseTagProfile, changeFollowingUser } from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return{
    chooseTagProfile: (num) => {dispatch(chooseTagProfile(num))},
		changeFollowingUser: (contact) => {dispatch(changeFollowingUser(contact))}
  }
}

const mapStateToProps = (state) => {
  return{
    usersFollow: state.profileReducer.usersFollow
  }
}

class ListFollowers extends Component {	
	handleTimeline() {
		this.props.chooseTagProfile(1);
	}
	
	handleFollowers() {
		this.props.chooseTagProfile(2);
	}
	
	handleFollowing() {
		this.props.chooseTagProfile(3);
	}
	
	handleChangeFollow(contact) {
		this.props.changeFollowingUser(contact);
	}
	
  render() {
		const listUser = this.props.usersFollow.map(user => {
			return(
				<div className="media user-follower" key={user.contact}>
					<img src={user.avatar} alt="User Avatar" className="media-object pull-left" />
					<div className="media-body">
						<a href="null">{user.username}<br /><span className="text-muted username">{user.contact}</span></a>
						{user.isFollow
						? <button type="button" className="btn btn-sm btn-toggle-following pull-right" onClick={this.handleChangeFollow.bind(this, user.contact)}>
							<span>Following</span></button>
						: <button type="button" className="btn btn-sm btn-default pull-right" onClick={this.handleChangeFollow.bind(this, user.contact)}>
							<FontAwesomeIcon icon="plus" /> Follow </button>}
					</div>
				</div>
			)
		});
    return (
			<div className="profile-info-right">
				<ul className="nav nav-pills nav-pills-custom-minimal custom-minimal-bottom">
					<li><Link to="/profile" className="nav-tag" onClick={this.handleTimeline.bind(this)}>Timeline</Link></li>
					<li className="active"><Link to="/profile" className="nav-tag" onClick={this.handleFollowers.bind(this)}>Followers</Link></li>
					<li><Link to="/profile" className="nav-tag" onClick={this.handleFollowing.bind(this)}>Following</Link></li>
				</ul>
				<div className="tab-content">
					{/* followers */}
					<div className="tab-pane fade active in" id="followers">
						{listUser}					
					</div>
					{/* end followers */}
				</div>
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowers);