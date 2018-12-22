import React, { Component } from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import {fromNowDate} from '../../services/utils.service';
import { connect } from 'react-redux'
import {likePost, createComment} from '../../actions'
import ReactEmoji from 'react-emoji'
import defaultAvatar from '../../images/default-avatar.png'
import { ReactButton } from '../../components'

const mapDispatchToProps = (dispatch) => {
  return{
    likePost: (id) => {dispatch(likePost(id))},
    createComment: (comment, id) => {dispatch(createComment(comment, id))}
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
      post: this.props.post,
      content: '',
    }
    this.react = [
      {
        type: 1,
        icon: "thumbs-up",
        text: "Like"
      },
      {
        type: 2,
        icon: "heart",
        text: "Love"
      },
      {
        type: 3,
        icon: "laugh-beam",
        text: "Haha"
      },
      {
        type: 4,
        icon: "surprise",
        text: "Wow"
      },

      {
        type: 5,
        icon: "sad-tear",
        text: "Sad"
      },
      {
        type: 6,
        icon: "angry",
        text: "Angry"
      }
    ]
  }

  static propTypes = {
    post: PropTypes.object,
    profile: PropTypes.object,
    likePost: PropTypes.func,
    createComment: PropTypes.func,
  }

  handleLike(id){
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

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleOnSubmit(){
    let {post, profile} = this.props
    if(this.state.content){
      this.props.createComment && this.props.createComment({
        avatar: profile.avatar,
        user_id: profile.user_id,
        username: profile.username,
        content: this.state.content,
        created_on: new Date().toString()
      }, post.id)
      this.setState({
        content: ''
      })
    }
  }

  handleKeyPress(event){
    if(event.key === 'Enter' && !event.altKey){
      event.preventDefault();
      event.target.value = ""
      this.handleOnSubmit()
    } else if (event.key === 'Enter' && !event.altKey){
      event.preventDefault();
      event.target.value = ""
    }
    else if(event.key === 'Enter' && event.altKey){
      let textarea = event.target
      let pos = textarea.selectionStart
      let first = textarea.value.substring(0, pos) + "\n"
      let rest = textarea.value.substring(pos)
      this.setState({
        content: first + rest
      }, () => {
        textarea.selectionStart = pos + 1
        textarea.selectionEnd = pos + 1
      })
    }
  }

  render() {
    let {post} = this.state
    let {profile} = this.props
    return (
      <div className={styles.post}>
        <div className="box box-widget">
          <div className="box-header with-border">
            <div className="user-block">
              <img className="img-circle" src={post.avatar ? post.avatar : defaultAvatar} alt="avatar" />
              <span className="username"><a href="null">{post.username}</a></span>
              <span className="description">{post.authorize} - {fromNowDate(post.created_on)}</span>
            </div>
          </div>
          <div className="box-body">
            {post.content.split('\n').map((itemChild, key) => {
                return <p key={key}>{ReactEmoji.emojify(itemChild, {emojiType: "emojione"})}</p>
              })
            }
            <div className="interact-area">
              {this.react.map((item, key) => {
                return(
                    <ReactButton objIcon={item} />
                  )
                })
              }
              <span className="float-right text-muted">{post.likes} reacts - {post.comments.length} comments</span>
            </div>
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
                      {item.content.split('\n').map((itemChild, key) => {
                          return <span key={key}>{ReactEmoji.emojify(itemChild, {emojiType: "emojione"})}<br/></span>
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <span className="load-more">Show more comments</span>
          </div>
          <div className="box-footer">
            <form action="#" method="post">
              <img className="img-responsive img-circle img-sm" src={profile.avatar ? profile.avatar : defaultAvatar} alt="Alt Text" />
              <div className="img-push">
                <textarea className="form-control input-sm" rows="2" placeholder="Type here for your comment"
                  value={this.state.content} onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleContentChange.bind(this)}>
                </textarea>
                {/*<input type="text" className="form-control input-sm" placeholder="Press enter to post comment" />*/}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
