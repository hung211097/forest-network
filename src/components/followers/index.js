import React, { Component } from 'react';
import { connect } from 'react-redux'
import  styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeFollowingUser } from '../../actions';
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => {
  return{
		changeFollowingUser: (contact) => {dispatch(changeFollowingUser(contact))}
  }
}

const mapStateToProps = (state) => {
  return{
    usersFollow: state.profileReducer.usersFollow
  }
}

class ListFollowers extends Component {
  static propTypes = {
    usersFollow: PropTypes.array
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
		<div className={styles.followers}>
			{/* followers */}
			<div className="tab-pane fade active in" id="followers">
				{listUser}
			</div>
			{/* end followers */}
		</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowers);
