import { BiMessageRoundedDetail, BiMoon, BiSun } from "react-icons/bi";
import { FaBell, FaHome, FaStore, FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { PiMonitorPlayFill } from "react-icons/pi";

import { Link, Outlet } from "react-router-dom";
import AvatarUser from "./AvatarUser";
import { useEffect, useState } from "react";


function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const setdarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <nav className="bg-white dark:bg-zinc-800 h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-neutral-700">
        {/*<!-- LEFT NAV -->*/}
        <div className="flex items-center justify-between w-full md:w-max px-4 py-2">
          <Link to={"/"} className="mr-2 hidden md:inline-block">
            <img
              src="images/logoSocial.jpg"
              alt="Facebook logo"
              className="w-24 sm:w-20 lg:w-10 h-auto rounded-full"
            />
          </Link>
          <Link to={"/"} className="inline-block md:hidden">
            <img src="images/logoSocial.jpg" alt="" className="w-9 h-9 rounded-full" />
          </Link>
          <div className="flex items-center justify-between space-x-1">
            <div className="relative bg-gray-100 dark:bg-neutral-700 px-2 py-2 w-10 h-10 sm:w-11 sm:h-11 lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center cursor-pointer">
              <FaSearch className="bx bx-search-alt-2 text-xl xl:mr-2 dark:text-emerald-400 text-emerald-400" />
              <input
                type="text"
                placeholder="Search"
                className="outline-none bg-transparent hidden xl:inline-block text-slate-100"
              />
            </div>
            <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-neutral-700 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-300 dark:text-slate-300 hover:dark:bg-neutral-600">
              <BiMessageRoundedDetail />
            </div>
          </div>
        </div>
        {/*<!-- END LEFT NAV -->*/}

        {/*<!-- MAIN NAV -->*/}
        <ul className="flex w-full lg:w-max items-center justify-center">
          <li className="w-1/5 md:w-max text-center">
            <Link
              to={"/"}
              className="w-full text-2xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block text-emerald-400 border-b-4 border-emerald-400"
            >
              <div className="flex justify-center items-center">
                <FaHome />
              </div>
            </Link>
          </li>
          <li className="w-1/5 md:w-max text-center">
            <a
              href="#"
              className="w-full text-2xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-slate-300 relative"
            >
              <div className="flex justify-center items-center">
                <PiMonitorPlayFill />
              </div>

              <span className="text-xs absolute top-0 right-1/4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
                9+
              </span>
            </a>
          </li>
          <li className="w-1/5 md:w-max text-center">
            <a
              href="#"
              className="w-full text-2xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-slate-300 relative"
            >
              <div className="flex justify-center items-center">
                <FaStore />
              </div>
            </a>
          </li>
          <li className="w-1/5 md:w-max text-center">
            <a
              href="#"
              className="w-full text-2xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-slate-300 relative"
            >
              <div className="flex justify-center items-center">
                <FaUserGroup />
              </div>
            </a>
          </li>

          <li className="w-1/5 md:w-max text-center inline-block md:hidden">
            <a
              href="#"
              className="w-full text-2xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-slate-300 relative"
            >
              <div className="flex justify-center items-center">
                <IoMenu />
              </div>
            </a>
          </li>
        </ul>
        {/* END MAIN NAV */}

        {/* RIGHT NAV */}
        <ul className="hidden md:flex mx-4 items-center justify-center">
          <AvatarUser />
          <li>
            <button
              onClick={setdarkMode}
              className="text-xl grid place-items-center bg-gray-200 dark:bg-neutral-700 dark:text-slate-300 rounded-full mx-1 p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-neutral-600 relative"
            >
              {darkMode ? <BiSun /> : <BiMoon />}
            </button>
          </li>

          <li>
            <div 
              className="text-xl hidden xl:grid place-items-center bg-gray-200 dark:bg-neutral-700 dark:text-slate-300 rounded-full mx-1 p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-neutral-600 relative">
              <BiMessageRoundedDetail />
            </div>
          </li>
          <li>
            <div className="text-xl grid place-items-center bg-gray-200 dark:bg-neutral-700 dark:text-slate-300 rounded-full mx-1 p-2 cursor-pointer hover:bg-gray-300 hover:dark:bg-neutral-600 relative">
              <FaBell />
              <span className="text-xs absolute top-0 right-0 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
                9
              </span>
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
