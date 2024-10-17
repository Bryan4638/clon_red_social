import axios from './axios'

export const getPostsRequest = (page, pageSize) =>{
  return axios.get(`posts?page=${page}&pageSize=${pageSize}`)
}

export const getPostRequest = (idPost) => {
  return axios.get(`post?id=${idPost}`)
}

export const deletePostRequest = (postId) =>{
  return axios.delete(`post/${postId}`)
}

export const createPostRequest = (post) => {
  return axios.post(`post/`,post)
}



export const addLikeRequest = (idPost) => {
  return axios.post(`post/${idPost}/like`)
}

export const deleteLikeRequest = (idPost) => {
  return axios.delete(`post/${idPost}/like`)
}