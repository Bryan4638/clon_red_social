import { ChangeEvent, FC, useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { PreviewFile } from "../../types";
import { BiSolidImageAdd } from "react-icons/bi";

interface PostFormProps {
  createPost: ({
    content,
    image,
  }: {
    content: string;
    image: PreviewFile[];
  }) => Promise<void>;
}

const Postform: FC<PostFormProps> = ({ createPost }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFiles, setSelectedFiles] = useState<PreviewFile[]>([]);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((previewFile) => {
        URL.revokeObjectURL(previewFile.previewUrl);
      });
    };
  }, [selectedFiles]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // Convertimos FileList a un array de Files
    const filesArray = Array.from(e.target.files);

    // Mapeamos cada File para crear un objeto con su URL temporal
    const previewFiles: PreviewFile[] = filesArray.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    // Ajustamos el estado con los nuevos archivos (se podrían concatenar si se desea)
    setSelectedFiles((prev) => [...prev, ...previewFiles]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (!selectedFiles) return;

    const { elements } = event.currentTarget;
    const input = elements.namedItem("textArea") as RadioNodeList;

    try {
      await createPost({ content: input.value, image: selectedFiles });
    } catch (error) {
      console.log(error);
    } finally {
      input.value = "";
      setSelectedFiles([]);
      setLoading(false);
      onClose();
    }
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
        <Modal isOpen={isOpen} size={"3xl"} onClose={onClose}>
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
                  <form
                    onSubmit={handleSubmit}
                    className=" flex flex-col justify-end"
                  >
                    <Textarea
                      rows={2}
                      name="textArea"
                      placeholder="Escribe un contenido para el post"
                    />

                    <div className="flex items-center justify-center w-full py-3">
                      <div
                        className={
                          selectedFiles.length === 0
                            ? ""
                            : "grid grid-cols-2 gap-1 "
                        }
                      >
                        {selectedFiles.map((previewFile, index) => (
                          <div
                            className="cursor-pointer flex justify-center items-center"
                            key={index}
                          >
                            <img
                              className="w-60 h-[250px]"
                              src={previewFile.previewUrl}
                              alt={`preview-${index}`}
                            />
                          </div>
                        ))}

                        <label className="sm:w-60 h-[250px] cursor-pointer bg-neutral-800 rounded-lg flex flex-col justify-center items-center">
                          <h1 className="ms:text-2xl">Add to Image</h1>
                          <BiSolidImageAdd className="size-16 pt-2" />
                          <input
                            type="file"
                            multiple
                            name="fileInput"
                            accept=".png, .jpg"
                            className="hidden"
                            id="fileInput"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className=" flex justify-end items-center pt-2 w-full">
                      <Button
                        className="ml-3 h-9  py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onPress={() => {
                          setSelectedFiles([]);
                          onClose();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        isLoading={loading}
                        type="submit"
                        className="ml-3 h-9 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white dark:bg-dark-third  bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Add Post
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default Postform;
