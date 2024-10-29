import { addLikeRequest, deleteLikeRequest } from "../api/post";
import { useAuth } from "../content/AuthContext";

function useLike() {
  const { user } = useAuth();

  
  const addLike = async (postID) => {
    await addLikeRequest(postID);

  }


  const deleteLike = async (idPost) => {
    await deleteLikeRequest(idPost);
  };
  
  return {addLike, deleteLike}
}

export default useLike