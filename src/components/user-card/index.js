import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { followUser } from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (id) => {dispatch(followUser(id))}
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.usersReducer.users
  }
}

class UserCard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    followUser: PropTypes.func
  }

  handleFollow(){
    this.props.followUser && this.props.followUser(this.props.user.id)
  }
  
  render() {
    let {user} = this.props
    return (
      <div className={styles.userCard}>
        <div className="contact-box center-version">
          <a href="null">
            <img alt="avatar" className="img-circle" src={user.avatar}/>
            <h3 className="m-b-xs"><strong>{user.username}</strong></h3>
            <div className="font-bold">{user.career}</div>
          </a>
          <div className="contact-box-footer">
            <div className="m-t-xs btn-group">
              {user.isFollow ?
                <button className="btn btn-xs btn-white" onClick={this.handleFollow.bind(this)}>
                  Followed &nbsp;<i><FontAwesomeIcon icon="check"/></i>
                </button>
                :
                <button className="btn btn-xs btn-white" onClick={this.handleFollow.bind(this)}>
                  <i><FontAwesomeIcon icon="user-plus"/></i>&nbsp;
                  Follow
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCard);
