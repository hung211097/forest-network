import axios from 'axios';
import { config } from '../config'

export default () => {
  let { baseURL } = config
  let services = {
    getUsers: (page = 1, limit = 10) => {
      return axios.get(baseURL + `users?page=${page}&limit=${limit}`).then((data) => {
        return data
      })
    },
    getTransactions: (page = 1, limit = 10, params = {}) => {
      let url = baseURL + `transactions?page=${page}&limit=${limit}`
      if(params.order && params.type){
        url += `&order=${params.order}&type=${params.type}`
      }
      return axios.get(url).then((data) => {
        return data
      }).catch(e => console.log("ERROR", e))
    }
  }

  return services
}
