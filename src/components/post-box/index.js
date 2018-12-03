import React, { Component } from 'react';
import styles from'./index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { createPost } from '../../actions';
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => {
  return{
    createPost: (post) => {dispatch(createPost(post))}
  }
}

const mapStateToProps = (state) => {
  let temp = state.postsReducer.posts.concat()
  temp.sort((a, b) => {
    return a.id - b.id
  })
  return{
    profile: state.profileReducer.info,
    posts: temp
  }
}

class PostBox extends Component {
  static propTypes = {
    createPost: PropTypes.func,
    profile: PropTypes.object
  }

  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
  }

  handleSubmit(){
    if(this.state.content){
      let {posts, profile} = this.props
      let obj = {
        id: posts[posts.length - 1].id + 1,
        userID: profile.userID,
        avatar: profile.avatar,
        username: profile.username,
        authorize: "Shared publicly",
        created_on: new Date().toString(),
        likes: 0,
        isLike: false,
        content: this.state.content,
        comments: []
      }
      this.props.createPost && this.props.createPost(obj)
      this.setState({
        content: ''
      })
    }
  }

  handleChangeContent(e){
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <div className={styles.postBox}>
        <div className="box profile-info n-border-top">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <textarea className="form-control input-lg p-text-area" rows={2} placeholder="Whats in your mind today?"
              value={this.state.content} onChange={this.handleChangeContent.bind(this)}/>
          </form>
          <div className="box-footer box-form">
            <button type="button" className="btn btn-azure float-right" onClick={this.handleSubmit.bind(this)}>Post</button>
            <ul className="nav nav-pills">
              <li><a href="null"><i><FontAwesomeIcon icon="image"/></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
