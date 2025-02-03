import axios from './axios'

export const getUserRequest = (id: string, page = 1, pageSize = 25) =>{
  return axios.get(`/user/${id}?page=${page}&pageSize=${pageSize}`)
}

export const userFollowRequest = ( id : number) =>{
  return axios.post(`/user/follow/${id}`)
} 

export const userUnFollowRequest = ( id : number) =>{
  return axios.post(`/user/unfollow/${id}`)
} 