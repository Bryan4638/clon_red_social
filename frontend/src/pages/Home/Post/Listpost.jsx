import Post from "../../../Components/Post/Post";
import { useEffect, useState } from "react";
import usePost from "../../../customHook/usePost";
import Postform from "../../../Components/Post/Postform";
import { Spinner } from "@material-tailwind/react";

function Listpost() {
  const {
    posts,
    currentPage,
    loading,
    error,
    isNextPage,
    setCurrentPage,
    createPost,
    deletePost,
  } = usePost();

  return (
    <>
      <Postform createPost={createPost}/>

      {posts.length >= 1 &&
        posts.map((post) => {
          return (
            <Post post={post} key={post.id} deletePost={deletePost}></Post>
          );
        })}

      {loading && (
        <div className="flex justify-center items-center mt-3 mb-1">
          <Spinner />
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <h1 className="font-bold text-xl text-zinc-400">
              No hay Post en este momento
            </h1>
          </div>
        </div>
      )}

      <div className="flex justify-center pb-2">
        {error && !loading && <div>Ha avido un error</div>}
        {!isNextPage && !loading && posts.length !== 0 &&(
          <h1 className="font-medium text-zinc-400 mt-3 mb-1">
            No hay más post para cargar
          </h1>
        )}
        {isNextPage && posts.length >= 1 && !loading && (
          <button
            className="bg-emerald-500 h-10 w-52 rounded-md text-white font-medium mt-3 mb-1"
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          >
            Cargar más resultados
          </button>
        )}
      </div>
    </>
  );
}

export default Listpost;
