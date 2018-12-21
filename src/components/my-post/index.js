import React, { Component } from 'react';
import { Post } from '../../components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.scss';
import ApiService from '../../services/api.service'
import { createPost } from '../../actions'
import InfiniteScroll from 'react-infinite-scroller'
import avatar2 from '../../images/guy-5.jpg'
import avatar3 from '../../images/guy-6.jpg'


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

class MyPost extends Component {
    constructor(props) {
        super(props)
        this.apiService = ApiService()
        this.state = {
            page: 0,
            tracks: [],
            hasMoreItems: true,
        }
    }

    static propTypes = {
        posts: PropTypes.array
    }

    // componentDidMount(){
    // 	this.apiService.getMyPosts(this.props.profile.user_id, 1, 10).then((res) => {
    // 		console.log(res)
    // 		res.posts.forEach((element) => {
    // 			element.comments = [{
    // 				      avatar: avatar2,
    // 				      user_id: 3,
    // 				      username: "Maria Gonzales",
    // 				      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    // 				      created_on: "Sat Dec 01 2018 10:56:49 GMT+0700 (Indochina Time)"
    // 				    },
    // 				    {
    // 				      avatar: avatar3,
    // 				      user_id: 2,
    // 				      username: "Luna Stark",
    // 				      content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    // 				      created_on: "Sat Dec 01 2018 11:00:49 GMT+0700 (Indochina Time)"
    // 						}]
    // 			element.isLike = false
    // 			element.likes = 100
    // 			element.authorize =  "Shared publicly"
    // 		})
    // 		res.posts.forEach((element) => {
    // 			this.props.createPost(element)
    // 		})
    // 		console.log(this.props.posts)
    // 	})
    // }

    loadItems(page) {
        if (this.props.posts.length > 0) {
            var tracks = this.state.tracks
            for (var index = 0; index < this.props.posts.length; index++) {
                if (index === this.state.page) {
                    console.log(index)
                    tracks.push(this.props.posts[index])
                    break
                }
            }
            // this.props.posts.map((track, i) => {
            // 	if (i === this.state.page) {
            // 		tracks.push(track)
            // 		break
            // 	}
            // });
            if (this.state.page < this.props.posts.length) {
                this.setState({
                    tracks: tracks,
                    page: this.state.page + 1
                });
            } else {
                this.setState({
                    hasMoreItems: false
                });
            }
        }
    }

    render() {
        const { tracks } = this.state

        return (
            <div className={styles.timeline}>
                <div className="tab-pane fade active in" id="timeline">
                    <div className="box profile-info n-border-top animated fadedIn">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItems.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            threshold={100}
                            loader={<div key={0} className="loader">Loading ...</div>}>
                            <div className="tracks">
                                {!!tracks.length && tracks.map((item) => {
                                    return (
                                        <Post key={item.id} post={item} />
                                    )
                                })
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPost);