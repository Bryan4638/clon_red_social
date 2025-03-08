import HumanizedDate from "./HumanizedDate";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Comment as CommnetType } from "../types";

const Comment = ({ commnet }: { commnet: CommnetType }) => {
  const { user } = useAuth();

  return (
    <div className="flex max-h-screen space-x-2 space-y-4">
      <Link to={`/profile?q=${commnet.userId}`}>
        <img
          src={commnet.user.avatar}
          alt="Profile picture"
          className="w-9 h-9 rounded-full"
        />
      </Link>
      <div>
        <div className="bg-gray-100 dark:bg-neutral-900 p-2 rounded-2xl text-sm">
          <span className="font-semibold block">{commnet.user.username}</span>
          <span>{commnet.content}</span>
        </div>

        <div className="pt-1 mx-3 text-xs text-gray-500 dark:text-slate-300 flex justify-between">
          <div className="flex justify-center">
            <div className="rounded-md bg-gray-200 dark:bg-neutral-900 hover:dark:bg-neutral-800 w-9 h-4 cursor-pointer flex justify-center">
              <span
                className={
                  user?.userReactions.includes(commnet.id)
                    ? "text-sky-600 font-semibold cursor-pointer"
                    : "font-semibold cursor-pointer"
                }
              >
                Like
              </span>
            </div>
            <span className="cursor-default">.</span>
            <div className="rounded-md bg-gray-200 dark:bg-neutral-900 hover:dark:bg-neutral-800 w-11 h-4 cursor-pointer flex justify-center">
              <span className="font-semibold  cursor-pointer">Reply</span>
            </div>
          </div>
          <span className="text-xs ml-3 font-bold text-gray-600 mt-0 dark:text-slate-400">
            <HumanizedDate date={commnet.createdAt} />
          </span>
        </div>
        {/* <!-- COMMENT --> */}
        {/* <div className="flex space-x-2">
            <img
              src="./images/avt-7.jpg"
              alt="Profile picture"
              className="w-9 h-9 rounded-full"
            />
            <div>
              <div className="bg-gray-100 dark:bg-neutral-700 p-2 rounded-2xl text-sm">
                <span className="font-semibold block">John Doe</span>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </span>
              </div>
              <div className="p-2 text-xs text-gray-500 dark:text-slate-300">
                <span className="font-semibold cursor-pointer">Like</span>
                <span>.</span>
                <span className="font-semibold cursor-pointer">Reply</span>
                <span>.</span>
                10m
              </div>
            </div>
          </div> */}
        {/* <!-- END COMMENT --> */}
      </div>
    </div>
  );
};

export default Comment;
