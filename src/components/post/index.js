import React, { Component } from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import {fromNowDate} from '../../services/utils.service';
import { connect } from 'react-redux'
import ReactEmoji from 'react-emoji'
import defaultAvatar from '../../images/default-avatar.png'
import { ReactButton } from '../../components'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api.service'

const mapDispatchToProps = (dispatch) => {
  return{
  }
}

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    profile: PropTypes.object,
  }

  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
      post: this.props.post,
      content: '',
      comments: [],
      number_of_comments: 0,
      number_of_reacts: 0,
      page: 1,
      react: 0
    }
    this.react = [
      null,
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

  componentDidMount(){
    this.loadComments()
    this.apiService.getPostReacts(this.props.post.id).then((data) => {
      if(data){
        this.setState({
          number_of_reacts: data.total_reacts,
          react: data.your_react
        })
      }
    })
  }

  loadComments(){
    this.apiService.getPostComments(this.props.post.id, this.state.page, 2).then((data) => {
      if(data){
        this.setState({
          comments: [...this.state.comments, ...data.comments],
          number_of_comments: data.total_page,
          page: this.state.page + 1
        })
      }
    })
  }

  handleReact(type){
    this.setState({
      react: this.state.react === type ? 0 : type,
      number_of_reacts: this.state.react === type ? this.state.number_of_reacts - 1 : this.state.number_of_reacts + 1
    })
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleOnSubmit(){
    console.log("OK");
    // let {post, profile} = this.props
    // if(this.state.content){
    //   this.props.createComment && this.props.createComment({
    //     avatar: profile.avatar,
    //     user_id: profile.user_id,
    //     username: profile.username,
    //     content: this.state.content,
    //     created_on: new Date().toString()
    //   }, post.id)
    //   this.setState({
    //     content: ''
    //   })
    // }
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

  handleLoadMore(){
    this.loadComments()
  }

  handleErrorImg(e){
    e.target.onerror = null;
    e.target.src = defaultAvatar
  }

  render() {
    let {post} = this.state
    let {profile} = this.props
    return (
      <div className={styles.post}>
        <div className="box box-widget">
          <div className="box-header with-border">
            <div className="user-block">
              <Link to={"/user/" + post.user_id}>
                <img className="img-circle" src={post.avatar ? post.avatar : defaultAvatar} alt="avatar" onError={this.handleErrorImg.bind(this)}/>
              </Link>
              <span className="username">
                <Link to={"/user/" + post.user_id}>
                  {post.username}
                </Link>
              </span>
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
                // console.log("REaCT", this.state.react);
                // console.log("KEY", key + 1);
                return(
                    <ReactButton
                      objIcon={item}
                      react={this.state.react > 0 && this.state.react === key ? true : false}
                      key={key}
                      onChangeReact={this.handleReact.bind(this)}/>
                  )
                })
              }
              <span className="float-right text-muted">{this.state.number_of_reacts} reacts - {this.state.number_of_comments} comments</span>
            </div>
          </div>
          <div className="box-footer box-comments">
            {!!this.state.comments.length && this.state.comments.map((item, key) => {
                return(
                  <div className="box-comment" key={key}>
                    <Link to={"/user/" + item.User.user_id}>
                      <img className="img-circle img-sm" src={item.User.avatar} alt="avatar" onError={this.handleErrorImg.bind(this)}/>
                    </Link>
                    <div className="comment-text">
                      <span className="username">
                        <Link to={"/user/" + item.User.user_id}>{item.User.username}</Link>
                        <span className="text-muted float-right">{fromNowDate(item.created_at)}</span>
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
            {this.state.page <= this.state.number_of_comments &&
              <span className="load-more" onClick={this.handleLoadMore.bind(this)}>Show more comments</span>
            }
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
