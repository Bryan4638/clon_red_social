import { useState } from "react";
import useLike from "../../customHook/useLike";
import { useAuth } from "../../content/AuthContext";
import { BiLike, BiShare, BiBookmark } from "react-icons/bi";
import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function PostAction({ post }) {
  const { addLike, deleteLike } = useLike();
  const { user } = useAuth();
  const [countReactions, setCountReactions] = useState(post._count.reactions);

  const [isLiked, setIsLiked] = useState(user.userReactions.includes(post.id));

  const handleLiked = () => {
    if (!isLiked) {
      setCountReactions(countReactions + 1);
      user.userReactions = user.userReactions.concat(post.id);
      addLike(post.id);
    } else {
      setCountReactions(countReactions - 1);
      user.userReactions = user.userReactions.filter(
        (reaction) => reaction !== post.id
      );
      deleteLike(post.id);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      {countReactions >= 1 && post.reactions.length !== 0 && (
        <div className="px-4 pt-1 pb-1">
          <div className="flex items-center justify-start">
            <div className="flex items-center -space-x-4">
              {post.reactions
                .slice(-5, post.reactions.length)
                .map((reaction) => {
                  return (
                    <Link
                      to={`/profile?q=${reaction.userId}`}
                      key={reaction.id}
                    >
                      <Avatar
                        variant="circular"
                        alt="user 1"
                        className="border-2 h-7 w-7 border-white dark:border-zinc-800 hover:z-10 focus:z-10"
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
        </div>
      )}

      <div className="py-2 px-4">
        <div className="border border-gray-200 dark:border-zinc-700 border-l-0 border-r-0 py-1">
          <div className="flex space-x-2 justify-between px-16">
            <button
              onClick={handleLiked}
              className="w-2/5 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300"
            >
              <BiLike className={isLiked ? "text-emerald-400" : ""} />
              <span className="text-sm font-semibold cursor-pointer">Like</span>
            </button>
            <div className="w-2/5 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300">
              <BiBookmark />
              <span className="text-sm font-semibold cursor-pointer">
                Bookmark
              </span>
            </div>
            <div className="w-2/5 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl py-2 rounded-lg cursor-pointer text-gray-500 dark:text-slate-300">
              <BiShare />
              <span className="text-sm font-semibold cursor-pointer">
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostAction;
