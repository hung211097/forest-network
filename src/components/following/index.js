import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.scss';
import { Link } from 'react-router-dom'
import { chooseTagProfile } from '../../actions';

const mapDispatchToProps = (dispatch) => {
  return{
    chooseTagProfile: (num) => {dispatch(chooseTagProfile(num))}
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.usersReducer.users
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
	
  render() {
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
          <div className="media user-following">
            <img src={require("../../images/woman-2.jpg")} alt="User Avatar" className="media-object pull-left" />
            <div className="media-body">
              <a href="null">Jane Doe<br /><span className="text-muted username">@janed</span></a>
              <button type="button" className="btn btn-sm btn-danger pull-right">
                <i className="fa fa-close-round" /> Unfollow</button>
            </div>
          </div>
          <div className="media user-following">
            <img src={require("../../images/guy-3.jpg")} alt="User Avatar" className="media-object pull-left" />
            <div className="media-body">
              <a href="null">John Simmons<br /><span className="text-muted username">@jsimm</span></a>
              <button type="button" className="btn btn-sm btn-danger pull-right">
                <i className="fa fa-close-round" /> Unfollow</button>
            </div>
          </div>
          <div className="media user-following">
            <img src={require("../../images/guy-5.jpg")} alt="User Avatar" className="media-object pull-left" />
            <div className="media-body">
              <a href="null">Michael<br /><span className="text-muted username">@iamichael</span></a>
              <button type="button" className="btn btn-sm btn-danger pull-right">
                <i className="fa fa-close-round" /> Unfollow</button>
            </div>
          </div>
        </div>
        {/* end following */}
				</div>
			</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFollowing);