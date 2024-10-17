import { useState } from "react";
import { useAuth } from "../../content/AuthContext";
import { createCommentsRequest } from "../../api/comment";
import { Spinner } from "@material-tailwind/react";
import { BiSmile, BiSolidSend } from "react-icons/bi";

function PostFormComment({ postId, addComment }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { elements } = event.currentTarget;

    const input = elements.namedItem("commentInput");

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
          src={user.avatar}
          alt="Profile picture"
          className="w-9 h-9 rounded-full"
        />
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex bg-gray-100 hover:dark:bg-neutral-600 dark:bg-neutral-700 rounded-full items-center justify-between px-3"
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
              <Spinner className="w-5 h-5" />
            ) : (
              <button className="w-7 h-7 grid place-items-center rounded-full hover:bg-gray-200 cursor-pointer text-gray-500 dark:text-slate-300 dark:hover:bg-neutral-700 text-xl">
                <BiSolidSend />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostFormComment;
