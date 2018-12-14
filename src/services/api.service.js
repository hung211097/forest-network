import axios from 'axios';
import { config } from '../config'

export default () => {
  let { baseURL } = config
  let services = {
    getUsers: (page = 1, limit = 10) => {
      return axios.get(baseURL + `users?page=${page}&limit=${limit}`).then((res) => {
        return res.data
      })
    },
    getInfoUser: (public_key) => {
      return axios.get(baseURL + `users/${public_key}`).then((res) => {
        return res.data
      })
    },
    getTransactionsOfUser: (public_key, page = 1, limit = 10, params = {}) => {
      let url = baseURL + `users/${public_key}/transactions?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axios.get(url).then((res) => {
        return res.data
      })
    },
    getTransactions: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `transactions?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axios.get(url).then((res) => {
        return res.data
      })
    },
    register: () => {
      return axios.post(baseURL + 'register').then((res) => {
        if(res.data.status === 'success'){
          return res.data.keypair
        }
        return null
      })
    }
  }

  return services
}
