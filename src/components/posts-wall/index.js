import React, { Component } from 'react';
import { PostBox, Post } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApiService from '../../services/api.service';
import InfiniteScroll from 'react-infinite-scroller';

const mapStateToProps = (state) => {
  return{
    profile: state.profileReducer.info,
  }
}

class PostsWall extends Component {
  constructor(props){
    super(props)
    this.apiService = ApiService()
    this.state = {
			dataNewPosts: [],
			dataPosts: [],
			pages: 10,
			page: 1,
			perPage: 10,
    }
  }

  static propTypes = {
    profile: PropTypes.object,
  }

  // componentDidMount(){
		// this.apiService.getPostOnHome(this.props.profile.user_id, 1, this.state.perPage).then((res) => {
			// this.setState ({
				// dataPosts: res.posts,
				// page: 1,
				// pages: res.total_page,
			// })
		// })
  // }
	
	loadData(page) {
		this.apiService.getPostOnHome(this.props.profile.user_id, this.state.page, this.state.perPage).then((res) => {
			this.setState ({
				dataPosts: this.state.dataPosts.concat(res.posts),
				page: this.state.page + 1,
				pages: res.total_page,
			})
		})
		
	}
		
	handleAddPost(content, createdAt) {
		const newPost = [{
			id: this.state.dataNewPosts.length,
			avatar: this.props.profile.avatar,
			user_id: this.props.profile.user_id,
			username: this.props.profile.username,
			created_at: createdAt,
			content: content
		}]
		this.setState ({
			dataNewPosts: newPost.concat(this.state.dataNewPosts),
		})
	}

  render() {
		const newPosts = this.state.dataNewPosts.map(post => {	
			const postTemplate = {
				id: post.id,
				avatar: post.avatar,
				user_id: post.user_id,
				username: post.username,
				authorize: "Shared publicly",
				created_on: post.created_at,
				likes: 100,
				isLike: false,
				content: post.content,
				comments: []
			}
			return (
				<Post key={postTemplate.id} post={postTemplate}/>
			);
		});	
		
		const posts = this.state.dataPosts.map(post => {	
			const postTemplate = {
				id: post.id,
				avatar: post.User.avatar,
				user_id: post.user_id,
				username: post.User.username,
				authorize: "Shared publicly",
				created_on: post.created_at,
				likes: 100,
				isLike: false,
				content: post.content,
				comments: []
			}
			return (
				<Post key={postTemplate.id} post={postTemplate}/>
			);
		});	
    return (
			<div className="animated fadeIn" key={this.props.key}>
				<PostBox handleAdd={this.handleAddPost.bind(this)}/>
					{newPosts}
				<div>
					<InfiniteScroll
						pageStart={0}
						loadMore={this.loadData.bind(this)}
						hasMore={this.state.page <= this.state.pages}>
							{posts}
					</InfiniteScroll>
				</div>
			</div>                    
    );
  }
}

export default connect(mapStateToProps)(PostsWall);
