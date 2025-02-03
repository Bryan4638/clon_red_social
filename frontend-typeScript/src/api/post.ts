import axios from "./axios";

export const getPostsRequest = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`posts?page=${pageParam}`);

  return {
    nextCursor: response.data.nextCursor,
    post: response.data.post,
  };
};

export const getPostRequest = (idPost: string) => {
  return axios.get(`post?id=${idPost}`);
};

export const deletePostRequest = (idPost: string) => {
  return axios.delete(`post/${idPost}`);
};

export const createPostRequest = (post: FormData) => {
  return axios.post(`post/`, post);
};

export const addLikeRequest = (idPost: string) => {
  return axios.post(`post/${idPost}/like`);
};

export const deleteLikeRequest = (idPost: string) => {
  return axios.delete(`post/${idPost}/like`);
};
