import axios from './axios'

export const createCommentsRequest = (idPost, content) =>{
  return axios.post(`/post/${idPost}/comment`, {content})
}