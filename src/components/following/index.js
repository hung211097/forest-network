import React, { Component } from 'react';
import { connect } from 'react-redux'
import  styles from './index.scss';
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
	handleChangeFollow(contact) {
		this.props.changeFollowingUser(contact);
	}
	
  render() {
		const listUser = this.props.usersFollowing.map(user => {
			return(
				<div className="media user-following" key={user.contact}>
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
		<div className={styles.following}>
			{/* following */}
			<div className="tab-pane fade active in" id="following">
				{listUser}          
			</div>
			{/* end following */}
		</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowing);