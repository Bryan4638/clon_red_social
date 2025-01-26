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

export default function SearchNav() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(false);
  const { loading: LoadingFolow, follow } = useFollow();

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

  return (
    <Autocomplete
      aria-label="Select an employee"
      classNames={{
        base: "max-w-xs",
        listboxWrapper: "max-h-[320px]",
        selectorButton: "text-default-500",
      }}
      defaultItems={users}
      onInputChange={onInputChange}
      inputProps={{
        classNames: {
          input: "ml-1",
          inputWrapper: "h-[48px]",
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
      placeholder="Enter employee name"
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
      variant="bordered"
    >
      {(item) => (
        <AutocompleteItem key={item.id} textValue={item.username}>
          <div className="flex justify-between items-center">
            {loading && <Spinner color="success" />}
            {!loading && (
              <>
                <Link
                  to={`/profile?q=${item?.id}`}
                  className="flex gap-2 items-center"
                >
                  <Avatar
                    alt={item.username}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{item.username}</span>
                    <span className="text-tiny text-default-400">
                      {item.email}
                    </span>
                  </div>
                </Link>
                <Button
                  isLoading={LoadingFolow}
                  className="border-small mr-0.5 font-medium shadow-small"
                  radius="full"
                  size="sm"
                  onPress={()=> follow(item.id)}
                  variant="bordered"
                >
                  Follow
                </Button>
              </>
            )}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
