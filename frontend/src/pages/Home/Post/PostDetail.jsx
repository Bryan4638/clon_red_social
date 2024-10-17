import { useEffect, useState } from "react";
import { getPostRequest } from "../../../api/post";
import { Avatar, Spinner } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../conf";
import HumanizedDate from "../../../Components/HumanizedDate";
import {
  BiArrowBack,
  BiBookmark,
  BiComment,
  BiLike,
  BiShare,
} from "react-icons/bi";
import Comment from "../../../Components/Comment";
import useLike from "../../../customHook/useLike";
import { useAuth } from "../../../content/AuthContext";
import PostMenu from "../../../Components/Post/PostMenu";

function PostDetail() {
  const { addLike, deleteLike } = useLike();
  const { user } = useAuth();

  const [idPost, setIdPots] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("post") ?? "";
  });
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isComments, setIsComments] = useState(false);

  const [countReactions, setCountReactions] = useState();
  const [countComments, setCountComments] = useState();
  const [isLiked, setIsLiked] = useState(user.userReactions.includes(idPost));

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
  }, []);

  const handleCLickComment = (event) => {
    setIsComments(!isComments);
  };

  const handleLiked = () => {
    if (!isLiked) {
      setCountReactions(countReactions + 1);
      user.userReactions = user.userReactions.concat(idPost);
      addLike(post.id);
    } else {
      setCountReactions(countReactions - 1);
      user.userReactions = user.userReactions.filter(
        (reaction) => reaction !== idPost
      );
      deleteLike(post.id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="bg-white dark:bg-dark-third max-w-full px-4 py-5 border-b rounded-lg mb-2 dark:border-dark-second border-gray-200 sm:px-6">
        <div className="flex justify-between pb-3">
          <h3 className="text-xl leading-6 cursor-default dark:text-dark-txt prose rounded font-bold text-gray-900">
            Post Details
          </h3>
          <button
            onClick={(event) => {
              window.history.back();
            }}
            className="rounded-full w-8 h-8 hover:bg-gray-200 bg-gray-100 flex justify-center items-center"
          >
            <BiArrowBack className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-sm cursor-default dark:text-dark-txt text-gray-500">
          This is a post detail view, you can see the content, comment and share
          your thoughts on this topic. Hint: Add a comment by clicking in the
          button below that says <span className="font-bold">Comment</span>
        </p>
      </div>
      {loading && (
        <div className="flex justify-center items-center pt-16">
          <Spinner className=" h-8 w-8" />
        </div>
      )}
      {!loading && error && <h1>Ha avido un error</h1>}
      {!loading && !error && post !== null && (
        <>
          <div className="bg-gray-50 max-w-full max-h-max dark:bg-dark-second shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="flex justify-end">
              <PostMenu
                isOpen={post.userId === user.userId}
                postId={post.id}
                deletePost={() => console.log("first")}
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
                <Link href="#" className="relative">
                  <img
                    src={post.user.avatar}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
                </Link>
                <div>
                  <div className="font-semibold dark:text-dark-txt hover:text-indigo-500">
                    <Link href="#">{post.user.username}</Link>
                  </div>
                  <span className="text-sm text-gray-500">
                    <HumanizedDate date={post.createdAt} />
                  </span>
                </div>
              </div>
              {/* POST MENU ACTION */}
            </div>
            {/* <!-- END POST AUTHOR --> */}

            {/* <!-- POST REACT --> */}
            {post.reactions.length >= 1 && (
              <div className="px-4 pt-2 pb-1">
                <div className=" block border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-2">
                  <div className="flex items-center justify-start">
                    <div className="flex items-center -space-x-4">
                      {post.reactions.map((reaction) => {
                        return (
                          <Avatar
                            key={reaction.id}
                            variant="circular"
                            alt="user 1"
                            className="border-2 h-7 w-7 border-white hover:z-10 focus:z-10"
                            src={reaction.user.avatar}
                          />
                        );
                      })}
                    </div>
                    <span className="pl-1 font-semibold text-gray-500">
                      {
                        post.reactions.length > 1 ?`Le gusta a ${post.reactions[0].user.username} y ${countReactions-1} más` : `Le gusta a ${post.reactions[0].user.username}`
                      }
                      
                    </span>
                  </div>
                </div>
              </div>
            )}
            {/* <!-- END POST REACT --> */}

            {/* <!-- POST CONTENT --> */}
            <div className="body text-justify px-4 py-2 pb-3 dark:text-dark-txt">
              <h3 className="text-lg leading-6 font-medium dark:text-dark-txt text-gray-900">
                {post.content}
              </h3>
            </div>
            {/* <!-- END POST CONTENT --> */}

            <div className="py-2 px-4 max-h-96 overflow-scroll">
              {post.comments.map((comment) => (
                <Comment commnet={comment} key={comment.id} />
              ))}
            </div>

            <div className=" px-4">
              <div className="border border-gray-200 dark:border-dark-third border-l-0 border-r-0 py-1">
                <div className="flex space-x-2">
                  <button
                    onClick={handleLiked}
                    className="w-1/3  space-x-2 block hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-1 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                  >
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiLike className={isLiked ? "text-cyan-500" : ""} />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">
                        {countReactions}
                      </span>
                    </div>
                  </button>

                  <div className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt">
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiBookmark />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">42</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCLickComment}
                    className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                  >
                    <div className="flex justify-center items-center text-2xl pl-2">
                      <BiComment />
                    </div>
                    <div className="flex justify-center items-center">
                      <span className="text-xs font-bold">{countComments}</span>
                    </div>
                  </button>

                  <div
                    to={"#"}
                    className="w-1/3 block space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-dark-txt"
                  >
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
