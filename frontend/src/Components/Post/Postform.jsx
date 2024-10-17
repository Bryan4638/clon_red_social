import { useState } from "react";
import {
  Input,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useAuth } from "../../content/AuthContext";
import { Link } from "react-router-dom";

function Postform({ createPost }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("textArea");
    const inputFile = elements.namedItem("fileInput");
    //console.log(input.value);
    console.log(inputFile.files);

    const post = { content: input.value, image: inputFile.files };

    try {
      await createPost(post);
    } catch (error) {
      console.log(error);
    } finally {
      input.value = "";
      inputFile.value = "";
      setLoading(false);
      setOpen(!open)
    }
  };

  return (
    <>
      <div className="max-w-full px-4 pt-2 shadow rounded-lg bg-white dark:bg-zinc-800">
        <div className="p-2 border-b border-gray-300 dark:border-zinc-700 flex space-x-4">
          <img
            src={user.avatar}
            alt="Profile picture"
            className="w-10 h-10 rounded-full"
          />
          <div
            onClick={handleOpen}
            className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-neutral-700 text-gray-500 text-lg dark:text-slate-300"
          >
            <span>What's on your mind, {user.username}</span>
          </div>
        </div>
        <div className="p-2 flex">
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500">
            <i className="bx bxs-video-plus"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500">
            <i className="bx bx-images"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-700 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500">
            <i className="bx bx-smile"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
        </div>
        <Dialog size="sm" open={open} handler={handleOpen} className="p-4 dark:bg-neutral-800">
          <DialogHeader className="relative m-0 p-1 block ">
            <div className="flex space-x-2 items-center">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="picture"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div>
                <Link href="/">
                  <div className="font-semibold dark:text-gray-200">{user.username}</div>
                </Link>
              </div>
            </div>
            <Typography className="mt-1 font-normal text-gray-600 dark:text-gray-400">
              Add post from images.
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5 hover:dark:bg-neutral-600 dark:bg-neutral-700"
              onClick={handleOpen}
            >
              <h1 className="font-extrabold text-lg text-gray-700 dark:text-gray-200">x</h1>
            </IconButton>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogBody className="space-y-4 pb-6">
              <Textarea
                rows={2}
                name="textArea"
                placeholder="Escribe un contenido para el post"
                className="!w-full !border-[1.5px] dark:!border-gray-700 dark:bg-neutral-700 dark:text-gray-100 !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                  className: "hidden",
                }}
              />
              <Input type="file" multiple name="fileInput" accept=".png, .jpg" className="dark:bg-neutral-700 dark:text-gray-200 dark:!border-gray-700 dark:!border-t-gray-700"></Input>
            </DialogBody>
            <DialogFooter className="flex justify-between mx-5">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleOpen}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {loading ? <Spinner /> : <span>Add Post</span>}
              </button>
            </DialogFooter>
          </form>
        </Dialog>
      </div>
    </>
  );
}

export default Postform;
