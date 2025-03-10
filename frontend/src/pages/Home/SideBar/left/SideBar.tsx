import { FaChevronDown } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useAuth } from "../../../../context/AuthContext";

function SideBar() {

  const {user} = useAuth()

  return (
    <>
      <ul className="p-4">
        <li>
          <Link
            to={`/profile?q=${user?.id}`}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 hover:dark:bg-neutral-900 rounded-lg transition-all dark:text-slate-300 "
          >
            <img
              src={user?.avatar}
              alt="Profile picture"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold">{user?.username}</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/#"}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-slate-300 hover:dark:bg-neutral-900 dark:focus:bg-neutral-900"
          >
            <FaUserGroup className="w-10 h-10 text-gray-500"></FaUserGroup>
            <span className="font-semibold">Friends</span>
          </Link>
        </li>

        <li>
          <Link
            to={"/#"}
            className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-slate-300 hover:dark:bg-neutral-900"
          >
            <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-neutral-800">
              <FaChevronDown />
            </span>
            <span className="font-semibold">See more</span>
          </Link>
        </li>
        <li className="border-b border-gray-200 dark:border-neutral-900 mt-6"></li>
      </ul>
      <Footer/>
    </>
  );
}

export default SideBar;
