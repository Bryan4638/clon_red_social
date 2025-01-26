import { addLikeRequest, deleteLikeRequest } from "../api/post";

function useLike() {
  const addLike = async (postID: string) => {
    await addLikeRequest(postID);
  };

  const deleteLike = async (idPost: string) => {
    await deleteLikeRequest(idPost);
  };

  return { addLike, deleteLike };
}

export default useLike;
