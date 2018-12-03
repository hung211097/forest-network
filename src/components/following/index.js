import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.scss';
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
    usersFollowing: state.profileReducer.usersFollowing
  }
}

class ListFollowing extends Component {	
	handleTimeline() {
		this.props.chooseTagProfile(1);
	}
	
	handleFollowers() {
		this.props.chooseTagProfile(2);
		console.log('change')
	}
	
	handleFollowing() {
		this.props.chooseTagProfile(3);
	}
		
	handleChangeFollow(contact) {
		this.props.changeFollowingUser(contact);
	}
	
  render() {
		const listUser = this.props.usersFollowing.map(user => {
			return(
				<div className="media user-following" key={user.id}>
            <img src={user.avatar} alt="User Avatar" className="media-object pull-left" />
            <div className="media-body">
              <a href="null">{user.username}<br /><span className="text-muted username">{user.contact}</span></a>
              <button type="button" className="btn btn-sm btn-danger pull-right" onClick={this.handleChangeFollow.bind(this, user.contact)}>
                <i className="fa fa-close-round" /> Unfollow</button>
            </div>
          </div>
			)
		});
    return (
			<div className="profile-info-right">
				<ul className="nav nav-pills nav-pills-custom-minimal custom-minimal-bottom">
					<li><Link to="/profile" className="nav-tag" onClick={this.handleTimeline.bind(this)}>Timeline</Link></li>
					<li><Link to="/profile" className="nav-tag" onClick={this.handleFollowers.bind(this)}>Followers</Link></li>
					<li className="active"><Link to="/profile" className="nav-tag" onClick={this.handleFollowing.bind(this)}>Following</Link></li>
				</ul>
				<div className="tab-content">
					{/* following */}
					<div className="tab-pane fade active in" id="following">
						{listUser}          
					</div>
					{/* end following */}
				</div>
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowing);