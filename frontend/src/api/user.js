import axios from './axios'

export const getUserRequest = (id, page = 1, pageSize = 25) =>{
  return axios.get(`/user/${id}?page=${page}&pageSize=${pageSize}`)
}