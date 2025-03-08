import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Spinner,
} from "@heroui/react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "../api/axios";
import { useDebouncedCallback } from "use-debounce";
import { User } from "../types";
import { Link } from "react-router-dom";
import useFollow from "../customHook/useFollow";
import { useFollowStore } from "../store/useFollowStore";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function SearchNav() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { loading: LoadingFolow, follow, unFollow } = useFollow();
  const followingList = useFollowStore((store) => store.followingList);
  const { user: userAuth } = useAuth();

  const fetchUsers = async (query: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/search?q=${query}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const debounced = useDebouncedCallback((value: string) => {
    fetchUsers(value);
  }, 500);

  const onInputChange = (value: string) => {
    if (value.length > 2) {
      debounced(value);
    }
  };

  const handleUnfollow = (id: number) => () => {
    unFollow(id);
    toast.success("User unfollowed.");
  };
  const handleFollow = (id: number) => () => {
    follow(id);
    toast.success("User followed.");
  };
  return (
    <Autocomplete
      aria-label="Select an employee"
      classNames={{
        base: "max-w-62",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500",
      }}
      defaultItems={users}
      onInputChange={onInputChange}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[25px]",
        },
      }}
      listboxProps={{
        hideSelectedIcon: true,
        itemClasses: {
          base: [
            "rounded-medium",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "dark:data-[hover=true]:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[hover=true]:bg-default-200",
            "data-[selectable=true]:focus:bg-default-100",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      placeholder="Search user"
      popoverProps={{
        offset: 10,
        classNames: {
          base: "rounded-large",
          content: "p-1 border-small border-default-100 bg-background",
        },
      }}
      radius="full"
      startContent={
        <FaSearch className="text-default-400" size={20} strokeWidth={2.5} />
      }
    >
      {(user) => (
        <AutocompleteItem key={user.id} textValue={user.username}>
          <div className="flex justify-between items-center">
            {loading && <Spinner color="success" />}
            {!loading && (
              <>
                <Link
                  to={`/profile?q=${user?.id}`}
                  className="flex gap-2 items-center"
                >
                  <Avatar
                    alt={user.username}
                    className="flex-shrink-0"
                    size="sm"
                    src={user.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.username}</span>
                    <span className="text-tiny text-default-400">
                      {user.email}
                    </span>
                  </div>
                </Link>
                {user.id !== userAuth?.id && (
                  <>
                    {followingList.includes(user.id) && (
                      <Button
                        isLoading={LoadingFolow}
                        className="border-small mr-0.5 font-medium shadow-small"
                        radius="full"
                        size="sm"
                        onPress={handleUnfollow(user.id)}
                        variant="bordered"
                      >
                        Unfollow
                      </Button>
                    )}
                    {!followingList.includes(user.id) && (
                      <Button
                        isLoading={LoadingFolow}
                        className="border-small mr-0.5 font-medium shadow-small"
                        radius="full"
                        size="sm"
                        onPress={handleFollow(user.id)}
                        variant="bordered"
                      >
                        Follow
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
