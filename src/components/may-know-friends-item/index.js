import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultAvatar from '../../images/default-avatar.png';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser, unFollowUser } from '../../actions';
import { Link } from 'react-router-dom';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    followUser: (user_id) => {dispatch(followUser(user_id))},
    unFollowUser: (user_id) => {dispatch(unFollowUser(user_id))},
  }
}

class MayKnowFriendsItem extends Component {
  static propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object,
    followUser: PropTypes.func,
    unFollowUser: PropTypes.func,
    onShowConfirm: PropTypes.any,
    isSuccess: PropTypes.bool,
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
    return (
      <div className="row">
        <div className="col-3">
          <div className="avatar">
            <Link to={'/user/' + this.props.user.user_id}>
              <img src={this.props.user.avatar ? this.props.user.avatar : defaultAvatar} alt="avatar" className="img-circle img-no-padding img-responsive" />
            </Link>
          </div>
        </div>
        <div className="col-6">
          <Link to={'/user/' + this.props.user.user_id}>
            {this.props.user.username}
          </Link>
        </div>
        <div className="col-3 text-right">
          {this.props.isSuccess && this.state.isFollow ?
            <span className="check-success"><i><FontAwesomeIcon icon="check"/></i></span>
            :
            <span className="btn btn-sm btn-azure btn-icon" data-tip={!this.state.isFollow ? "Follow" : "Unfollow"}
              onClick={this.handleFollow.bind(this)}>
              <i><FontAwesomeIcon icon={!this.state.isFollow ? "user-plus" : "user-minus"}/></i>
            </span>
          }
        </div>
        <ReactTooltip effect="solid"/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MayKnowFriendsItem);
