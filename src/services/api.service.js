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
      return axiosGet(baseURL + `users/${public_key}`).then((res) => {
        if(res.data.status === 'success'){
          return res.data
        }
        return null
      })
    },
    getTransactionsOfUser: (public_key, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${public_key}/transactions?page=${page}&limit=${limit}`
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
    register: () => {
      return axiosPost(baseURL + 'register').then((res) => {
        if(res.data.status === 'success'){
          return res.data.keypair
        }
        return null
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
  }

  return services
}
