import { useAuth } from "../../context/AuthContext";
import Comment from "../Comment";
import HumanizedDate from "../HumanizedDate";

import PostMenu from "./PostMenu";
import PostAction from "./PostAction";
import PostFormComment from "./PostFormComment";
import PostImage from "./PostImage";
import { Link } from "react-router-dom";
import { Comment as CommentType, Post as PostType } from "../../types";
import { useState } from "react";

function Post({
  post,
  deletePost,
}: {
  post: PostType;
  deletePost: (postId: string) => Promise<void>;
}) {
  const { user } = useAuth();
  const [comments, setComments] = useState(post.comments);
  const [countComments, setCountComments] = useState(post._count.comments);

  const addComment = (comment: CommentType) => {
    setComments([comment, ...comments]);
    setCountComments(countComments + 1);
  };

  return (
    <>
      <div className="shadow bg-neutral-50 border-b- border-gray-300 dark:bg-neutral-950 dark:text-slate-300 mt-4 rounded-lg">
        {/* <!-- POST AUTHOR --> */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex space-x-2 items-center">
            <div className="relative">
              <Link to={`/profile?q=${post.userId}`}>
                <img
                  src={post.user.avatar}
                  alt="picture"
                  className="w-10 h-10 rounded-full"
                />
                <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
              </Link>
            </div>
            <div>
              <Link to={`/profile?q=${post.userId}`}>
                <div className="font-semibold">{post.user.username}</div>
              </Link>
              <span className="text-sm text-gray-500 dark:text-slate-400">
                <HumanizedDate date={post.createdAt} />
              </span>
            </div>
          </div>
          <PostMenu
            isOpenDropDown={post.userId === user?.id}
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
        <div>
          {post.tags &&
            post.tags.map((tag, index) => {
              console.log(tag);
              return <strong key={index}>#{tag}</strong>;
            })}
        </div>
        {/* <!-- END POST CONTENT --> */}

        {/* <!-- POST IMAGE --> */}
        <PostImage postImage={post.image} id={post.id} />
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
            <Link
              to={`/post-detail?post=${post.id}`}
              className="text-sm cursor-pointer hover:border-b-2 hover:border-gray-600 font-semibold text-gray-600"
            >
              Ver los {countComments} comentarios
            </Link>
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
