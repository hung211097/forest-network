import React, { Component } from 'react';
import styles from './index.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import {fromNowDate} from '../../services/utils.service';
import { connect } from 'react-redux'
import {likePost} from '../../actions'

const mapDispatchToProps = (dispatch) => {
  return{
    likePost: (id) => {dispatch(likePost(id))}
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      post: this.props.post
    }
  }

  static propTypes = {
    post: PropTypes.object,
    profile: PropTypes.object,
    likePost: PropTypes.func
  }

  onLike(id){
    let temp = Object.assign({}, this.state.post)
    temp.isLike = !temp.isLike
    if(temp.isLike){
      temp.likes = temp.likes + 1
    }
    else{
      temp.likes = temp.likes - 1
    }

    this.setState({
      post: temp
    }, () => {
      this.props.likePost && this.props.likePost(id)
    })
  }

  render() {
    let {post} = this.state
    let {profile} = this.props
    return (
      <div className={styles.post}>
        <div className="box box-widget">
          <div className="box-header with-border">
            <div className="user-block">
              <img className="img-circle" src={post.avatar} alt="avatar" />
              <span className="username"><a href="null">{post.username}</a></span>
              <span className="description">{post.authorize} - {fromNowDate(post.created_on)}</span>
            </div>
          </div>
          <div className="box-body">
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            <button type="button" className={post.isLike ? "btn btn-default btn-xs active" : "btn btn-default btn-xs"} onClick={this.onLike.bind(this, post.id)}>
              <i><FontAwesomeIcon icon="thumbs-up"/></i> Like
            </button>
            <button type="button" className="btn btn-default btn-xs">
              <i><FontAwesomeIcon icon="share" /></i> Share
            </button>
            <span className="float-right text-muted">{post.likes} likes - {post.comments.length} comments</span>
          </div>
          <div className="box-footer box-comments">
            {!!post.comments.length && post.comments.map((item, key) => {
                return(
                  <div className="box-comment" key={key}>
                    <img className="img-circle img-sm" src={item.avatar} alt="avatar" />
                    <div className="comment-text">
                      <span className="username">
                        {item.username}
                        <span className="text-muted float-right">{fromNowDate(item.created_on)}</span>
                      </span>
                      {item.content}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="box-footer">
            <form action="#" method="post">
              <img className="img-responsive img-circle img-sm" src={profile.avatar} alt="Alt Text" />
              <div className="img-push">
                <input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
