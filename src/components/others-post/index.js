import React, { Component } from 'react';
import { Post } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss';
import ApiService from '../../services/api.service'
import { createPost } from '../../actions'
import InfiniteScroll from 'react-infinite-scroller'
import loading from '../../images/loading.gif'

const mapStateToProps = (state) => {
    return {
        posts: state.postsReducer.posts,
        profile: state.profileReducer.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

class OthersPost extends Component {
    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            page: 1,
            dataPosts: [],
            hasMoreItems: true
        }
    }

    static propTypes = {
        posts: PropTypes.array
    }

    loadItems(page) {
        this.apiService.getMyPosts(this.props.user_id, this.state.page, 10).then((res) => {
            res.posts.forEach((element) => {
                element.comments = []
                element.likes = 100
                element.authorize = "Shared publicly"
            })
            this.setState ({
              dataPosts: [...this.state.dataPosts, ...res.posts],
              page: this.state.page + 1,
              pages: res.total_page,
            }, () => {
                if (this.state.page > res.total_page) {
                    this.setState({
                        hasMoreItems: false
                    })
                }
            })
          })
    }

    render() {
        const { dataPosts } = this.state
        return (
            <div className={styles.timeline}>
                <div className="tab-pane fade active in" id="timeline">
                    <div className="box profile-info n-border-top animated fadedIn">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            threshold={100}
                            loader={<div key={0} className="loader"><img src={loading} alt="loading"/></div>}>
                            <div className="tracks">
                                {dataPosts.length > 0
                                    ?
                                dataPosts.map((item) => {
                                    const postTemplate = {
                                        id: item.id,
                                        avatar: item.User.avatar,
                                        user_id: item.user_id,
                                        username: item.User.username,
                                        authorize: "Shared publicly",
                                        created_on: item.created_at,
                                        likes: 100,
                                        isLike: false,
                                        content: item.content,
                                        comments: []
                                    }
                                    return (
                                        <Post key={item.id} post={postTemplate} />
                                    )
                                })
                                 :
                                 <h2>Don&apos;t have any posts</h2>
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OthersPost);