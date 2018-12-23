import React, { Component } from 'react';
import styles from './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { followUser, unFollowUser } from '../../actions';
import defaultAvatar from '../../images/default-avatar.png';
import { Link } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (user_id) => {dispatch(followUser(user_id))},
    unFollowUser: (user_id) => {dispatch(unFollowUser(user_id))},
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class UserCard extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object,
    followUser: PropTypes.func,
    unFollowUser: PropTypes.func,
    onShowConfirm: PropTypes.func,
  }

  constructor(props){
    super(props)
    this.state = {
      isFollow: false
    }
  }

  componentDidMount(){
    let temp = this.props.profile.following.find((item) => {
      return item === this.props.user.user_id
    })
    if(temp){
      this.setState({
        isFollow: true
      })
    }
  }

  handleFollow(){
    this.setState({
      isFollow: !this.state.isFollow
    }, () =>{
      if(this.state.isFollow){
        this.props.followUser && this.props.followUser(this.props.user.user_id)
      }
      else{
        this.props.followUser && this.props.unFollowUser(this.props.user.user_id)
      }
    })
    this.props.onShowConfirm && this.props.onShowConfirm()
  }

  render() {
    let {user} = this.props
    return (
      <div className={styles.userCard}>
        <div className="contact-box center-version">
          <Link to={'/user/' + user.user_id}>
            <img alt="avatar" className="img-circle" src={user.avatar ? user.avatar : defaultAvatar}/>
            <h3 className="m-b-xs"><strong>{user.username}</strong></h3>
            <div className="font-bold">@username</div>
          </Link>
          <div className="contact-box-footer">
            <div className="m-t-xs btn-group">
              {this.state.isFollow ?
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
