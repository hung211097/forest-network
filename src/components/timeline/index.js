import React, {Component} from 'react';
import {PostBox, Post} from '../../components'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss';
import ApiService from '../../services/api.service'
import InfiniteScroll from 'react-infinite-scroller'
import loading from '../../images/loading.gif'

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer.info
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

class Timeline extends Component {
  static propTypes = {
    profile: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.apiService = ApiService()
    this.state = {
      page: 1,
      dataPosts: [],
      dataNewPosts: [],
      hasMoreItems: true
    }
  }

  loadItems(page) {
    this.apiService.getMyPosts(this.props.profile.user_id, this.state.page, 10).then((res) => {
      this.setState({
        dataPosts: [
          ...this.state.dataPosts,
          ...res.posts
        ],
        page: this.state.page + 1,
      }, () => {
        if (this.state.page >= res.total_page) {
          this.setState({hasMoreItems: false})
        }
        else this.setState({hasMoreItems: true})
      })
    })
  }

  handleAddPost(content, createdAt, hash) {
    const newPost = [
      {
        id: this.state.dataNewPosts.length,
        avatar: this.props.profile.avatar,
        user_id: this.props.profile.user_id,
        username: this.props.profile.username,
        created_at: createdAt,
        content: content,
        hash: hash
      }
    ]
    this.setState({
      dataNewPosts: newPost.concat(this.state.dataNewPosts)
    })
  }

  render() {
    const {dataPosts} = this.state
    const newPosts = this.state.dataNewPosts.map(post => {
      const postTemplate = {
        id: post.id,
        avatar: post.avatar,
        user_id: post.user_id,
        username: post.username,
        authorize: "Shared publicly",
        created_on: post.created_at,
        content: post.content,
        hash: post.hash
      }
      return (<Post key={postTemplate.id} post={postTemplate}/>);
    });

    return (<div className={styles.timeline}>
      <div className="tab-pane fade active in" id="timeline">
        <div className="box profile-info n-border-top animated fadedIn">
          <PostBox handleAdd={this.handleAddPost.bind(this)}/> {newPosts}
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreItems}
            threshold={100}
            loader={<div key={0} className="loader"><img src={loading} alt="loading"/></div>}>
            <div className="tracks">
              {
                dataPosts.length > 0
                  ? dataPosts.map((item) => {
                    const postTemplate = {
                      id: item.id,
                      avatar: item.User.avatar,
                      user_id: item.user_id,
                      username: item.User.username,
                      authorize: "Shared publicly",
                      created_on: item.created_at,
                      content: item.content,
                      hash: item.hash
                    }
                    return (<Post key={item.id} post={postTemplate}/>)
                  })
                  : <h2>You don&apos;t have any posts</h2>
              }
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
