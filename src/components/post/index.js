import React, { Component } from 'react';
import styles from './index.scss';
import PropTypes from 'prop-types';
import {fromNowDate, calcBandwithConsume} from '../../services/utils.service';
import { connect } from 'react-redux'
import ReactEmoji from 'react-emoji'
import defaultAvatar from '../../images/default-avatar.png'
import { ReactButton } from '../../components'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api.service'
import { SecretKey } from '../../constants/crypto'
import CryptoJS from 'crypto-js'
import { keyStorage } from '../../constants/localStorage'
import { loadItem } from '../../services/storage.service'
import { saveProfileFromApi } from '../../actions'
import transaction from '../../lib/transaction'
import SweetAlert from 'react-bootstrap-sweetalert'

const mapDispatchToProps = (dispatch) => {
  return{
    saveProfileFromApi: (info) => {dispatch(saveProfileFromApi(info))}
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
    saveProfileFromApi: PropTypes.func
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
			total_page: 0,
      react: 0,
      isShowError: false,
      error: '',
      isShowSuccess: false
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
          number_of_comments: data.total_item,
          page: this.state.page + 1,
					total_page: data.total_page
        })
      }
    })
  }

	hideAlertError(){
    this.setState({
      isShowError: false
    })
  }

  hideAlertSuccess(){
    this.setState({
      isShowSuccess: false
    })
  }

  handleReact(type){
    this.apiService.getCurrentProfile().then((data) => {
      this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
      let reactContent = {
        type: 2,
        reaction: type
      }
      if (this.state.react === type) {
        reactContent.reaction = 0
      }

      let tx = {
        version: 1,
        account: data.public_key,
        sequence: data.sequence + 1,
        memo: Buffer.alloc(0),
        operation: "interact",
        params: {
          object: this.props.post.hash,
          content: reactContent
        },
        signature: new Buffer(64)
      }
      let temp = loadItem(keyStorage.private_key)
      let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)
      transaction.sign(tx, my_private_key);
      let TxEncode = '0x' + transaction.encode(tx).toString('hex');

      const consume = calcBandwithConsume(data, transaction.encode(tx).toString('base64'), new Date());
      if (consume > data.bandwithMax) {
        this.setState({error: "You don't have enough OXY to conduct transaction!", isShowError: true})
      } else {
        this.apiService.postReact(TxEncode).then((status) => {
          if (status === 'success') {
            this.setState({
              react: this.state.react === type
                ? 0
                : type,
              number_of_reacts: this.state.react === type
                ? this.state.number_of_reacts - 1
                : this.state.number_of_reacts + 1
            })
          } else {
            this.setState({error: "Fail to react", isShowError: true})
          }
        })
      }
    })
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleOnSubmit(){
    if(this.state.content){
      this.apiService.getCurrentProfile().then((data) => {
        this.props.saveProfileFromApi && this.props.saveProfileFromApi(data)
        const plainTextContent = {
          type: 1,
          text: this.state.content
        }
        let tx = {
          version: 1,
          account: data.public_key,
          sequence: data.sequence + 1,
          memo: Buffer.alloc(0),
          operation: "interact",
          params: {
            object: this.props.post.hash,
            content: plainTextContent
          },
          signature: new Buffer(64)
        }
        let temp = loadItem(keyStorage.private_key)
        let my_private_key = CryptoJS.AES.decrypt(temp, SecretKey).toString(CryptoJS.enc.Utf8)
        transaction.sign(tx, my_private_key);
        let TxEncode = '0x' + transaction.encode(tx).toString('hex');

        const consume = calcBandwithConsume(data, transaction.encode(tx).toString('base64'), new Date());
        if (consume > data.bandwithMax) {
          this.setState({error: "You don't have enough OXY to conduct transaction!", isShowError: true})
        } else {
          this.apiService.postComment(TxEncode).then((status) => {
            if (status === 'success') {
              const tempComment = {
                User: {
                  avatar: this.props.profile.avatar,
                  user_id: this.props.profile.user_id,
                  username: this.props.profile.username
                },
                content: this.state.content,
                created_at: new Date(),
                post_id: this.props.post.id,
                user_id: this.props.profile.user_id
              }
              this.setState({
                content: '',
                comments: [
                  tempComment, ...this.state.comments
                ],
                number_of_comments: this.state.number_of_comments + 1
              })
            } else {
              this.setState({error: "Fail to comment", isShowError: true})
            }
          })
        }
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
                      <img className="img-circle img-sm" src={item.User.avatar ? item.User.avatar : defaultAvatar} alt="avatar" onError={this.handleErrorImg.bind(this)}/>
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
            {this.state.page <= this.state.total_page &&
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
        <SweetAlert
          error
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          title={this.state.error}
          show={this.state.isShowError}
          onConfirm={this.hideAlertError.bind(this)}
          onCancel={this.hideAlertError.bind(this)}>
        </SweetAlert>
        <SweetAlert
          success
          confirmBtnText="OK"
          confirmBtnBsStyle="success"
          title="Successfully!"
          show={this.state.isShowSuccess}
          onConfirm={this.hideAlertSuccess.bind(this)}
          onCancel={this.hideAlertSuccess.bind(this)}>
        </SweetAlert>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
