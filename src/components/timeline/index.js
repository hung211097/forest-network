import React, { Component } from 'react';
import { PostBox, Post } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { chooseTagProfile } from '../../actions';
import { Link } from 'react-router-dom'

const mapDispatchToProps = (dispatch) => {
  return{
    chooseTagProfile: (num) => {dispatch(chooseTagProfile(num))}
  }
}

const mapStateToProps = (state) => {
  return{
    posts: state.postsReducer.posts
  }
}

class Timeline extends Component {
    static propTypes = {
      posts: PropTypes.array
    }
  
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
							<li className="active"><Link to="/profile" className="nav-tag" onClick={this.handleTimeline.bind(this)}>Timeline</Link></li>
							<li><Link to="/profile" className="nav-tag" onClick={this.handleFollowers.bind(this)}>Followers</Link></li>
							<li><Link to="/profile" className="nav-tag" onClick={this.handleFollowing.bind(this)}>Following</Link></li>
						</ul>
						<div className="tab-content">
							<div className="tab-pane fade active in" id="timeline">
								<div className="box profile-info n-border-top animated fadedIn">
										<PostBox />
										{!!this.props.posts.length && this.props.posts.map((item) => {
												return (
														<Post key={item.id} post={item} />
												)
										})
										}
								</div>
							</div>
						</div>
					</div>
        );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Timeline);