import Post from "../../components/Post/Post";
import usePost from "../../customHook/usePost";
import Postform from "../../components/Post/Postform";
import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner } from "@heroui/react";
import { useRef } from "react";
import { toast } from "sonner";

function ListPost() {
  const {
    posts,
    currentPage,
    error,
    isNextPage,
    setCurrentPage,
    createPost,
    deletePost,
  } = usePost();

  const ref = useRef();

  return (
    <>
      <div>
        <Postform createPost={createPost}/>

        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            setCurrentPage(currentPage + 1);
          }}
          loader={
            <div className="w-full flex justify-center py-4">
              <Spinner color="success"/>
            </div>
          }
          hasMore={isNextPage}
          scrollableTarget={ref.current}
          endMessage={
            <div className="w-full flex justify-center py-5">
              {Post.length !== 0 && (
                <span className="text-lg text-gray-600 font-bold">
                  No hay más Post para cargar
                </span>
              )}
            </div>
          }
        >
          {posts.map((post) => {
            return <Post post={post} key={post.id} deletePost={deletePost}/>
          })}
        </InfiniteScroll>
        {error && toast.error(error)}
      </div>

      <div ref={ref.current}></div>
    </>
  );
}

export default ListPost;
