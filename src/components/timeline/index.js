import React, { Component } from 'react';
import { PostBox, Post } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = (state) => {
  return{
    profile: PropTypes.object,
    posts: state.postsReducer.posts
  }
}

class Timeline extends Component {
    static propTypes = {
      posts: PropTypes.array
    }
  
    render() {
        return (
            <div className="box profile-info n-border-top animated fadedIn">
                <PostBox />
                {!!this.props.posts.length && this.props.posts.map((item) => {
                    return (
                        <Post key={item.id} post={item} />
                    )
                })
                }
            </div>
        );
    }
  }
  
  export default connect(mapStateToProps)(Timeline);