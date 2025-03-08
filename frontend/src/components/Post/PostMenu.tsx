import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FC, Key, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface PostMenuProps {
  isOpenDropDown: boolean;
  postId: string;
  deletePost: (postId: string) => Promise<void>;
}

const PostMenu: FC<PostMenuProps> = ({
  isOpenDropDown,
  postId,
  deletePost,
}) => {
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading(true);
      await deletePost(postId);
      toast.success(`Deleted post success`);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting post");
    } finally {
      setLoading(false);
      onClose()
    }
  };

  const handleAction = (key: Key) => {
    if (key === "delete") {
      onOpen();
    } else {
      navigate("/post-edit");
    }
  };

  return (
    <>
      {isOpenDropDown && (
        <Dropdown>
          <DropdownTrigger>
            <div className="w-8 h-8 grid place-items-center text-xl bg-gray-200 text-gray-600 hover:bg-gray-300 dark:text-slate-300 hover:dark:bg-neutral-800 dark:bg-neutral-900 rounded-full cursor-pointer">
              <BiDotsVerticalRounded className="text-emerald-500" />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions" onAction={handleAction}>
            <DropdownItem key="edit">Edit</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}

      <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="md:col-span-1">
                  <h1 className="text-2xl font-medium leading-6 dark:text-slate-100 text-gray-900">
                    Delete post
                  </h1>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="mt-1 text-sm dark:text-slate-200 text-gray-500">
                  Deleting this post means theres is no going back!
                </p>{" "}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={loading}
                  color="success"
                  variant="light"
                  onPress={handleClick}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostMenu;
