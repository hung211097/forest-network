import { config } from '../config'
import axiosGet, { axiosPost } from './axios-fetch'

export default () => {
  let { baseURL } = config
  let services = {
    getUsers: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getInfoUser: (user_id) => {
      return axiosGet(baseURL + `users/${user_id}`).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getTransactionsOfUser: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/me/transactions?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getTransactions: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `transactions?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    createAccount: (hex) => {
      return axiosPost(baseURL + 'create-account', {hex: hex}).then((res) => {
        return res.data.status
      })
    },
    login: (public_key) => {
      return axiosPost(baseURL + 'login', {
        public_key: public_key
      }).then((res) => {
        if(res.data.status === 'success'){
          return res.data.info_user
        }
        return null
      })
    },
    logout: () => {
      return axiosPost(baseURL + 'logout')
    },
    getCurrentProfile: () => {
      return axiosGet(baseURL + `users/me`).then((res) => {
        if(res.data.status === 'success'){
          return res.data.info_user
        }
        return null
      })
    },
    conductTransaction: (hex) => {
      return axiosPost(baseURL + `transactions/conduct`, {hex: hex}).then((res) => {
        return res.data.status
      })
    },
		createPost: (TxEncode) => {
      return axiosPost(baseURL + 'posts', {TxEncode: TxEncode}).then((res) => {
        return res.data.status
      })
    },
    updateProfile: (data) => {
      return axiosPost(baseURL + `users/update-profile`, {data: data}).then((res) => {
        if(res.data.status === 'success'){
          return res.data.result
        }
        return null
      })
    },
    getUnfollowedUsers: (user_id, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${user_id}/unfolloweds?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getFollowers: (user_id, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${user_id}/followers?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getFollowing: (user_id, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${user_id}/followings?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    updateListFollow: (hex) => {
      return axiosPost(baseURL + `follow`, {hex: hex}).then((res) => {
        return res.data.status
      })
    },
    getPubkeysFollowing: (user_id, arrID) => {
      return axiosPost(baseURL + `users/${user_id}/followings/public-key`, {data: arrID}).then((res) => {
        return res.data.pubkeys
      })
    },
    getMyPosts: (user_id, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${user_id}/my-posts?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getPostOnHome: (user_id, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${user_id}/posts-wall?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
	getSearchUsers: (type, info) => {
      let url = baseURL + `users/search?type=${type}&info=${info}`
      return axiosPost(url).then((res) => {
				//console.log(res)
		if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getPostComments: (post_id, page = 1, limit = 5, params = {}) => {
      let url = baseURL + `posts/${post_id}/comments?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getPostReacts: (post_id) => {
      let url = baseURL + `posts/${post_id}/reacts`
      return axiosGet(url).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getUsersByUsername: (username) => {
      return axiosPost(baseURL + `users/public-key`, {data: username}).then((res) => {
        return res.data
      })
    },
		postComment: (TxEncode) => {
			return axiosPost(baseURL + 'posts/createcomment', {TxEncode: TxEncode}).then((res) => {
        return res.data.status
      })
		},
		postReact: (TxEncode) => {
			return axiosPost(baseURL + 'posts/createreact', {TxEncode: TxEncode}).then((res) => {
        return res.data.status
      })
		}
  }

  return services
}
