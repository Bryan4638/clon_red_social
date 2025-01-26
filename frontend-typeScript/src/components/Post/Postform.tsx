import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Textarea,
  useDisclosure,
} from "@heroui/react";

function Postform() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const { elements } = event.currentTarget;
    const input = elements.namedItem("textArea") as RadioNodeList;
    const inputFile = elements.namedItem("fileInput") as RadioNodeList;

    const post = { content: input.value, image: inputFile.values };

    console.log(inputFile)
    console.log(post);
    /* 
    try {
      await createPost(post);
    } catch (error) {
      console.log(error);
    } finally {
      input.value = "";
      inputFile.value = "";
      setLoading(false);
      setOpen(!open);
    } */
  };

  return (
    <>
      <div className="max-w-full px-4 pt-2 shadow rounded-lg bg-white dark:bg-neutral-950">
        <div className="p-2 border-b border-gray-300 dark:border-neutral-900 flex space-x-4">
          <img
            src={user?.avatar}
            alt="Profile picture"
            className="w-10 h-10 rounded-full"
          />
          <div
            onClick={onOpen}
            className="flex-1 bg-gray-100 rounded-full flex items-center justify-start pl-4 cursor-pointer dark:bg-neutral-900 text-gray-500 text-lg dark:text-slate-300"
          >
            <span>What's on your mind, {user?.username}</span>
          </div>
        </div>
        <div className="p-2 flex">
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-900 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-red-500">
            <i className="bx bxs-video-plus"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-900 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-green-500">
            <i className="bx bx-images"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
          <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 hover:dark:bg-neutral-900 text-xl sm:text-3xl py-2 rounded-lg cursor-pointer text-yellow-500">
            <i className="bx bx-smile"></i>
            <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
              Live video
            </span>
          </div>
        </div>
        <Modal isOpen={isOpen} size={"5xl"} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex space-x-2 items-center">
                    <div className="relative">
                      <img
                        src={user?.avatar}
                        alt="picture"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div>
                      <Link to="/">
                        <div className="font-semibold dark:text-gray-200">
                          {user?.username}
                        </div>
                      </Link>
                    </div>
                  </div>
                  <h1 className="mt-1 font-normal text-gray-600 dark:text-gray-400">
                    Add post from images.
                  </h1>
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <Textarea
                      rows={2}
                      name="textArea"
                      placeholder="Escribe un contenido para el post"
                    />

                    <div className="flex items-center justify-center w-full py-3">
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          name="fileInput"
                          accept=".png, .jpg"
                          className="hidden"
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? <Spinner /> : <span>Add Post</span>}
                    </button>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default Postform;
