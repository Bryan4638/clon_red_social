import { useAuth } from "../../content/AuthContext";
import Comment from "../Comment";
import HumanizedDate from "../HumanizedDate";

import PostMenu from "./PostMenu";
import PostAction from "./PostAction";
import PostFormComment from "./PostFormComment";
import { useState } from "react";
import PostImage from "./PostImage";
import { Link } from "react-router-dom";

function Post({ post, deletePost }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(post.comments);

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <>
      <div className="shadow bg-white dark:bg-zinc-800 dark:text-slate-300 mt-4 rounded-lg">
        {/* <!-- POST AUTHOR --> */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <img
                src={post.user.avatar}
                alt="picture"
                className="w-10 h-10 rounded-full"
              />
              <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
            </div>
            <div>
              <a href="#">
                <div className="font-semibold">{post.user.username}</div>
              </a>
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <HumanizedDate date={post.createdAt} />
              </span>
            </div>
          </div>
          <PostMenu
            isOpen={post.userId === user.userId}
            postId={post.id}
            deletePost={deletePost}
          />
        </div>
        {/* <!-- END POST AUTHOR --> */}

        {/* <!-- POST CONTENT --> */}
        <div className="text-justify px-4 py-2">
          <Link to={`post-detail?post=${post.id}`}>
            <span>{post.content}</span>
          </Link>
        </div>
        {/* <!-- END POST CONTENT --> */}

        {/* <!-- POST IMAGE --> */}
        <PostImage postImage={post.image} user={post.user} />
        {/* <!-- END POST IMAGE --> */}

        {/* <!-- POST ACTION AND REACTION--> */}
        <PostAction post={post} />
        {/* <!-- END POST ACTION AND REACTION --> */}

        {/* <!-- LIST COMMENT --> */}
        <div className="py-2 px-4">
          {comments.map((comment) => (
            <Comment commnet={comment} key={comment.id} />
          ))}
        </div>
        {post._count.comments > 3 && (
          <div className="py-2 px-6 pb-2">
            <span className="text-sm cursor-pointer hover:border-b-2 hover:border-gray-600 font-semibold text-gray-600">
              Ver los {post._count.comments} comentarios
            </span>
          </div>
        )}

        {/* <!-- END LIST COMMENT --> */}

        {/* <!-- COMMENT FORM --> */}
        <PostFormComment postId={post.id} addComment={addComment} />
        {/* <!-- END COMMENT FORM -->  */}
      </div>
      {/* <!-- END POST --> */}
    </>
  );
}

export default Post;
