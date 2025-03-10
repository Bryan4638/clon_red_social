import { useEffect, useState } from "react";
import { getPostRequest } from "../../api/post";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../config";
import HumanizedDate from "../../components/HumanizedDate";
import {
  BiArrowBack,
  BiBookmark,
  BiComment,
  BiLike,
  BiShare,
} from "react-icons/bi";
import Comment from "../../components/Comment";
import useLike from "../../customHook/useLike";
import { useAuth } from "../../context/AuthContext";
import PostMenu from "../../components/Post/PostMenu";
import { Post } from "../../types";
import { Avatar, Spinner } from "@heroui/react";

function PostDetail() {
  const { addLike, deleteLike } = useLike();
  const { user } = useAuth();

  const [idPost, setIdPots] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("post") ?? "";
  });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState(null);
  const [isComments, setIsComments] = useState(false);

  const [countReactions, setCountReactions] = useState(0);
  const [countComments, setCountComments] = useState();
  const [isLiked, setIsLiked] = useState(user?.userReactions.includes(idPost));

  useEffect(() => {
    setLoading(true);
    getPostRequest(idPost)
      .then((res) => {
        setPost(res.data.data);
        setCountComments(res.data.data._count.comments);
        setCountReactions(res.data.data._count.reactions);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [countReactions, idPost]);

  const handleCLickComment = () => {
    setIsComments(!isComments);
  };

  const handleLiked = () => {
    if (post) {
      if (!isLiked) {
        setCountReactions(countReactions + 1);
        //user?.userReactions = user?.userReactions.concat(idPost);
        addLike(post.id);
      } else {
        setCountReactions(countReactions - 1);
        /* user?.userReactions = user?.userReactions.filter(
          (reaction) => reaction !== idPost
        ); */
        deleteLike(post.id);
      }
    }
    setIsLiked(!isLiked);
  };

  const handleClickBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="bg-white dark:bg-neutral-950 dark:text-slate-300 dark:border-neutral-800 max-w-full px-4 py-5 border-b rounded-lg mb-2 border-gray-200 sm:px-6">
        <div className="flex justify-between pb-3">
          <h3 className="text-xl leading-6 cursor-default  prose rounded font-bold text-gray-900 dark:text-slate-100">
            Post Details
          </h3>
          <button
            onClick={handleClickBack}
            className="rounded-full w-8 h-8 hover:bg-gray-200 bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-900 flex justify-center items-center"
          >
            <BiArrowBack className="w-5 h-5 text-emerald-500" />
          </button>
        </div>
        <p className="mt-1 text-sm cursor-default  text-gray-500">
          This is a post detail view, you can see the content, comment and share
          your thoughts on this topic. Hint: Add a comment by clicking in the
          button below that says <span className="font-bold">Comment</span>
        </p>
      </div>
      {loading && post == null && (
        <div className="flex justify-center items-center pt-16">
          <Spinner color="success" />
        </div>
      )}
      {!loading && error && <h1>Ha avido un error</h1>}
      {!error && post !== null && (
        <>
          <div className="bg-gray-50 dark:bg-neutral-950 dark:text-slate-100 max-w-full max-h-max shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5">
            <div className="flex justify-end">
              <PostMenu
                isOpenDropDown={post.userId === user?.id}
                postId={post.id}
                //deletePost={() => console.log("first")}
              />
            </div>
            {/*  <!-- POST IMAGE --> */}
            <div className="py-2">
              <div
                className={
                  post.image.length === 1
                    ? ""
                    : post.image.length > 4
                    ? "grid grid-cols-3 gap-1"
                    : "grid grid-cols-2 gap-1"
                }
              >
                {post.image.map((ima) => (
                  <Link to={`#`} key={ima}>
                    <img
                      src={`${SERVER_URL}/public/users/${ima}`}
                      alt="Post image"
                      className="rounded-md"
                    />
                  </Link>
                ))}
              </div>
            </div>
            {/* {% endif %} */}

            {/* <!-- END POST IMAGE --> */}

            {/* <!-- POST AUTHOR --> */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex space-x-2 items-center">
                <Link to="#" className="relative">
                  <img
                    src={post.user.avatar}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                </Link>
                <div>
                  <div className="font-semibold  hover:text-indigo-500">
                    <Link to="#">{post.user.username}</Link>
                  </div>
                  <span className="text-sm text-gray-500">
                    <HumanizedDate date={post.createdAt} />
                  </span>
                </div>
              </div>
              {/* POST MENU ACTION */}
            </div>
            {/* <!-- END POST AUTHOR --> */}

            {/* <!-- POST CONTENT --> */}
            <div className="body text-justify px-4 py-2 pb-3 ">
              <h3 className="text-lg leading-6 font-medium  text-gray-900 dark:text-gray-100">
                {post.content}
              </h3>
            </div>
            {/* <!-- END POST CONTENT --> */}

            {/* <!-- POST REACT --> */}

            <div className="px-4 pt-2 pb-1 h-12">
              <div
                className={
                  post.comments.length > 0
                    ? " block border border-gray-200 dark:border-neutral-900 border-l-0 border-r-0 py-2"
                    : ""
                }
              >
                {countReactions >= 1 && post.reactions.length !== 0 && (
                  <div className="flex items-center justify-start">
                    <div className="flex items-center -space-x-4">
                      {post.reactions.map((reaction) => {
                        return (
                          <Link
                            to={`/profile?q=${reaction.userId}`}
                            key={reaction.id}
                          >
                            <Avatar
                              key={reaction.id}
                              alt="user 1"
                              className="border-2 h-7 w-7 border-white dark:border-neutral-900 hover:z-10 focus:z-10"
                              src={reaction.user.avatar}
                            />
                          </Link>
                        );
                      })}
                    </div>
                    <span className="pl-1 font-semibold text-gray-500">
                      {countReactions > 1
                        ? `Le gusta a ${post.reactions[0].user.username} y ${
                            countReactions - 1
                          } más`
                        : `Le gusta a ${post.reactions[0].user.username}`}
                    </span>
                  </div>
                )}
                {countReactions === 0 && (
                  <span className="pl-1 font-semibold text-gray-500">
                    Nadie ha reaccionado a este Post
                  </span>
                )}
              </div>
            </div>

            {/* <!-- END POST REACT --> */}

            {post.comments.length > 0 && (
              <div className="py-2 px-4 max-h-96  h-screen hide-scrollbar overflow-y-scroll ">
                {post.comments.map((comment) => (
                  <Comment commnet={comment} key={comment.id} />
                ))}
              </div>
            )}

            <div className=" px-4">
              <div className="border border-gray-200 dark:border-neutral-900 border-l-0 border-r-0 py-1">
                <div className="flex space-x-2">
                  <button
                    onClick={handleLiked}
                    className="w-1/3  space-x-2 block hover:bg-gray-100 dark:hover:bg-neutral-900 text-xl py-1 rounded-lg cursor-pointer text-gray-500 "
                  >
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiLike className={isLiked ? "text-emerald-500" : ""} />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">
                        {countReactions}
                      </span>
                    </div>
                  </button>

                  <div className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-900 text-xl py-2 rounded-lg cursor-pointer text-gray-500 ">
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiBookmark />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">42</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCLickComment}
                    className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-900 text-xl py-2 rounded-lg cursor-pointer text-gray-500 "
                  >
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiComment />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">{countComments}</span>
                    </div>
                  </button>

                  <div className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-neutral-900 text-xl py-2 rounded-lg cursor-pointer text-gray-500 ">
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiShare />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">99</span>
                    </div>
                  </div>
                  {/* <!--COMMENT --> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PostDetail;
