import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Menu,
  MenuHandler,
  MenuList,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function PostMenu({ isOpen, postId, deletePost }) {
  const [IsOpenDelete, setIsOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(null);

  const modalClose = () => {
    setIsOpenDelete(!IsOpenDelete);
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      await deletePost(postId);
    } catch (error) {
      console.log(error);
      seterror(error);
    } finally {
      setLoading(false);
      setIsOpenDelete(!IsOpenDelete)
    }
  };

  return (
    <>
      {isOpen && (
        <Menu
          placement="bottom-end"
          animate={{
            mount: { y: 8 },
            unmount: { y: 0 },
          }}
        >
          <MenuHandler>
            <div className="w-8 h-8 grid place-items-center text-xl bg-gray-200 text-gray-600 hover:bg-gray-300 dark:text-slate-300 hover:dark:bg-neutral-600 dark:bg-neutral-700 rounded-full cursor-pointer">
              <BiDotsVerticalRounded />
            </div>
          </MenuHandler>
          <MenuList className="origin-top-right border-transparent absolute right-0 mt-2 w-56 rounded-md shadow-lg dark:bg-neutral-700 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Link to={"/post-edit"} className="text-gray-700 hover:bg-gray-200 border-gray-300 rounded-md dark:text-slate-300 dark:hover:bg-neutral-600 block px-4 py-2 text-sm">
              Edit
            </Link>
            <button
              className="text-gray-700 hover:bg-gray-200 border-gray-300 block rounded-md dark:text-slate-300 dark:hover:bg-neutral-600 px-4 w-full text-left py-2 text-sm"
              onClick={modalClose}
            >
              Delete
            </button>
          </MenuList>
        </Menu>
      )}

      <Dialog open={IsOpenDelete} handler={modalClose} className="dark:bg-neutral-800">
        <DialogHeader>
          <div className="md:col-span-1">
            <h1 className="text-2xl font-medium leading-6 dark:text-slate-100 text-gray-900">
              Delete post
            </h1>
          </div>
        </DialogHeader>
        <DialogBody>
          <p className="mt-1 text-sm dark:text-slate-200 text-gray-500">
            Deleting this post means theres is no going back!
          </p>{" "}
        </DialogBody>
        <DialogFooter>
          <button
            onClick={modalClose}
            className="bg-slate-300 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleClick}
          >
            {loading ? <Spinner /> : <span>Delete</span>}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default PostMenu;
