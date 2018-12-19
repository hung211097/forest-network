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
    getInfoUser: (public_key) => {
      return axiosGet(baseURL + `users/id/${public_key}`).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getTransactionsOfUser: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/transactions?page=${page}&limit=${limit}`
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
    }
  }

  return services
}
