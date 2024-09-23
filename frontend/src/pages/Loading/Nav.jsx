import { BiMessageRoundedDetail } from "react-icons/bi";
import {
  FaPlus,
  FaBell,
  FaMoon,
  FaHome,
  FaStore,
  FaSearch,
} from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { PiMonitorPlayFill } from "react-icons/pi";
import { FiLayout } from "react-icons/fi";

function Nav() {
  return (
    <>
      <nav className="bg-white dark:bg-zinc-800 h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-neutral-700">
        {/*<!-- LEFT NAV -->*/}
        <div className="flex items-center justify-between w-full md:w-max px-4 py-2">
          <div className="mr-2 hidden md:inline-block">
            <div className="w-10 h-10 sm:w-7 sm:h-7 lg:w-10 lg:h-10 bg-gray-200 dark:bg-neutral-700 rounded-full" />
          </div>
          <div className="inline-block md:hidden">
            <div className="w-52 h-7 bg-neutral-700 rounded-full" />
          </div>
          <div className="flex items-center justify-between space-x-1">
            <div className="relative bg-gray-100 dark:bg-neutral-700 px-2 py-2 w-7 h-7 sm:w-7 sm:h-7 lg:h-5 lg:w-52 xl:w-52 xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center"></div>
            <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-neutral-700 rounded-full w-7 h-7"></div>
            <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-neutral-700 rounded-full w-7 h-7"></div>
          </div>
        </div>
        {/*<!-- END LEFT NAV -->*/}

        {/*<!-- MAIN NAV -->*/}
        <ul className="flex w-full lg:w-max items-center justify-center">
          <li className="w-1/5 md:w-max mt-2 mr-3">
            <div
              className="w-full py-2 px-3 xl:px-12 md:h-7 inline-block dark:bg-neutral-700 h-8 rounded bg-gray-200 relative"
            >
            </div>
          </li>
          <li className="w-1/5 md:w-max mt-2 mr-3">
            <div
              className="w-full py-2 px-3 xl:px-12 md:h-7 inline-block dark:bg-neutral-700 h-8 rounded bg-gray-200 relative"
            >
            </div>
          </li>
          <li className="w-1/5 md:w-max mt-2 mr-3">
            <div
              className="w-full py-2 px-3 xl:px-12 md:h-7 inline-block dark:bg-neutral-700 h-8 rounded bg-gray-200 relative"
            >
            </div>
          </li>
          <li className="w-1/5 md:w-max mt-2 mr-3">
            <div
              className="w-full py-2 px-3 xl:px-12 md:h-7 inline-block dark:bg-neutral-700 h-8 rounded bg-gray-200 relative"
            >
            </div>
          </li>
          <li className="w-1/5 md:w-max mt-2 mr-3">
            <div
              className="w-full py-2 px-3 xl:px-12 md:h-7 inline-block dark:bg-neutral-700 h-8 rounded bg-gray-200 relative"
            >
            </div>
          </li>
          
        </ul>
        {/* END MAIN NAV */}

        {/* RIGHT NAV */}
        <ul className="hidden md:flex mx-4 items-center justify-center">
          <div className="h-full xl:flex">
            <div className=" inline-flex items-center justify-center py-2 px-1 rounded-full mx-1">
              <div className=" rounded-full h-7 w-7 bg-gray-200 dark:bg-neutral-700" />
              <div className="mx-2 w-14 h-3 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
            </div>
          </div>
          <li>
            <div className="text-xl hidden xl:grid h-7 w-7 place-items-center bg-gray-200 dark:bg-neutral-700 rounded-full mx-1 p-2 relative">
            </div>
          </li>
          <li>
            <div className="text-xl grid h-7 w-7 place-items-center bg-gray-200 dark:bg-neutral-700 rounded-full mx-1 p-2 relative">
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
