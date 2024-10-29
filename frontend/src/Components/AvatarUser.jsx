import React from "react";
import {Link} from 'react-router-dom'
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  BiEditAlt,
  BiHelpCircle,
  BiPowerOff,
  BiSolidInbox,
  BiUserCircle,
} from "react-icons/bi";
import { useAuth } from "../content/AuthContext";

export default function AvatarWithUserDropdown() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { logout, user } = useAuth();

  const handlerClick = () => {
    logout();
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <button
          variant="text"
          className="flex w-auto bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600  items-center  rounded-full p-0 pr-2"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="h-8 w-8 p-0.5 m-1"
            src={user.avatar}
          />
          <div className="flex w-full justify-center items-center">
            <span className="mx-3 text-center font-semibold text-gray-800 dark:text-slate-300">
              {user.username}
            </span>
          </div>
        </button>
      </MenuHandler>
      <MenuList className="p-2 dark:bg-neutral-700 border-none mt-2">
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-neutral-600">
        <Link to={`/profile?q=${user.userId}`} className="flex justify-center items-center ">
          <BiUserCircle className="text-2xl text-gray-500" />
          <Typography
            as="h1"
            variant="small"
            className="mx-1 font-bold dark:text-slate-300 ml-2"
          >
            My profile
          </Typography>
          </Link>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-neutral-600">
          <BiEditAlt className="text-2xl text-gray-500" />
          <span className="font-normal dark:text-slate-300">Edit Profile</span>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-neutral-600">
          <BiSolidInbox className="text-2xl text-gray-500" />
          <span className="font-normal dark:text-slate-300">Inbox</span>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-neutral-600">
          <BiHelpCircle className="text-2xl text-gray-500" />
          <span className="font-normal dark:text-slate-300">Help</span>
        </MenuItem>
        <MenuItem
          onClick={handlerClick}
          className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-red-200 hover:text-red-600"
        >
          <BiPowerOff className="text-2xl  text-red-400" />
          <span className="font-normal text-red-400">Sign Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
