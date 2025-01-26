import Avatar from "./Avatar";
import Item from "./Item";
import Search from "./Search";

function Nav() {
  return (
    <>
      <nav className="bg-white dark:bg-zinc-800 h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-neutral-700">
        {/*<!-- LEFT NAV -->*/}
        <Search/>
        {/*<!-- END LEFT NAV -->*/}

        {/*<!-- MAIN NAV -->*/}
        <Item/>
        {/* END MAIN NAV */}

        {/* RIGHT NAV */}
        <Avatar/>
      </nav>
    </>
  );
}

export default Nav;
