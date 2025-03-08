import { FC, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createCommentsRequest } from "../../api/comment";
import { BiSmile, BiSolidSend } from "react-icons/bi";
import { Spinner } from "@heroui/react";
import { Comment } from "../../types";

interface PostFormCommentProps {
  postId: string;
  addComment: (comment: Comment) => void;
}

const PostFormComment: FC<PostFormCommentProps> = ({ postId, addComment }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const input = elements.namedItem("commentInput") as RadioNodeList;

    if (input.value === "" || input.value === " ") {
      return;
    }

    try {
      setLoading(true);

      const newComment = await createCommentsRequest(postId, input.value);

      addComment(newComment.data);
    } catch (error) {
      console.log(error);
    } finally {
      input.value = "";
      setLoading(false);
    }
  };
  return (
    <div className="py-2 px-4 pt-0">
      <div className="flex space-x-2">
        <img
          src={user?.avatar}
          alt="Profile picture"
          className="w-9 h-9 rounded-full"
        />
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex bg-gray-100 hover:dark:bg-neutral-800 dark:bg-neutral-900 rounded-full items-center justify-between px-3"
        >
          <input
            type="text"
            name="commentInput"
            placeholder="Write a comment..."
            className="outline-none w-1/3 bg-transparent flex-1 "
          />
          <div className="flex space-x-0 items-center justify-center">
            <span className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-slate-300 dark:hover:bg-neutral-700 text-xl">
              <BiSmile />
            </span>
            {loading ? (
              <Spinner size="sm" color="success"/>
            ) : (
              <button className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-emerald-500 dark:text-emerald-400 dark:hover:bg-neutral-700 text-xl">
                <BiSolidSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostFormComment;
