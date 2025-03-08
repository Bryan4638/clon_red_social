import { useState, useEffect } from "react";
import { createPostRequest, deletePostRequest } from "../api/post";
import { Post, PreviewFile } from "../types";

function usePost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
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
        setPosts((prev) => prev.concat(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, [currentPage]);

  const deletePost = async (postId: string) => {
    try {
      await deletePostRequest(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async ({content, image}: {content: string, image: PreviewFile[]}) => {
    try {
      const formData = new FormData();
      formData.append("content", content);

      image.map((file)=>{
        formData.append("image", file.file)
      })

      const newPost = await createPostRequest(formData);

      setPosts([newPost.data.data, ...posts]);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return {
    posts,
    loading,
    error,
    isNextPage,
    currentPage,
    nextPage,
    setCurrentPage,
    createPost,
    deletePost,
  };
}

export default usePost;
