import { useState, useEffect } from "react";
import { createPostRequest, deletePostRequest } from "../api/post";

function usePost() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isNextPage, setisNextPage] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/posts?page=${currentPage}&pageSize=5`, {
      method: "GET", // PUT, DELETE, POST
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("ha avido un error con la peticion");
        }
        return res.json();
      })
      .then((res) => {
        if (currentPage >= res.meta.totalPages) {
          setisNextPage(false);
        }
        setPosts(posts.concat(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, [currentPage]);

  const deletePost = async (postId) => {
    try {
      await deletePostRequest(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async (post) => {
    try {
      const formData = new FormData();
      console.log(post)
      formData.append("content", post.content);

      for (let index = 0; index < post.image.length; index++) {
       formData.append("image", post.image[index])
      }

      const newPost = await createPostRequest(formData)

      setPosts([newPost.data.data, ...posts])
   
    } catch (error) {
      console.log(error);
    }
  };

  return {
    posts,
    loading,
    error,
    isNextPage,
    currentPage,
    setCurrentPage,
    createPost,
    deletePost,
  };
}

export default usePost;
