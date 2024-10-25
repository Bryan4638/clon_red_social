import axios from './axios'

export const getUserRequest = (id) =>{
  return axios.get(`/user/${id}`)
}