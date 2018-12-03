import React, { Component } from 'react';
import { PostBox, Post } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss';

const mapStateToProps = (state) => {
  return{
    posts: state.postsReducer.posts
  }
}

class Timeline extends Component {
    static propTypes = {
      posts: PropTypes.array
    }
	
    render() {
        return (
				<div className={styles.timeline}>
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
        );
    }
  }
  
  export default connect(mapStateToProps)(Timeline);