import { useState } from "react";
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

function AvatarUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout, user } = useAuth();

  const handlerClick = () => {
    logout();
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler className="px-0 rounded-full">
        <Button variant="text" className="h-full xl:flex">
          <div className=" inline-flex items-center justify-center py-2 px-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 mx-1">
            <Avatar
              alt="User image"
              className=" rounded-full h-7 w-7"
              src="./images/tuat.jpg"
            />
            <Typography
              as="span"
              variant="small"
              className="mx-2 font-bold dark:text-slate-300"
            >
              {user.username}
            </Typography>
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="p-2 dark:bg-zinc-700 border-none mt-2">
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-zinc-600">
          <BiUserCircle className="text-2xl" />
          <span className="font-normal dark:text-slate-200">My Profile</span>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-zinc-600">
          <BiEditAlt className="text-2xl" />
          <span className="font-normal dark:text-slate-200">Edit Profile</span>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-zinc-600">
          <BiSolidInbox className="text-2xl" />
          <span className="font-normal dark:text-slate-200">Inbox</span>
        </MenuItem>
        <MenuItem className=" flex items-center pt-2 gap-2 rounded dark:hover:bg-zinc-600">
          <BiHelpCircle className="text-2xl" />
          <span className="font-normal dark:text-slate-200">Help</span>
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

export default AvatarUser;
