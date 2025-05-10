import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => setShowSidebar(false);

  const { status } = useSession();

  if (status === "loading") return null;

  const logOutHandler = () => {
    signOut();
  };
  return (
    <div className="">
      <header className="bg-primary max-sm:h-25  h-[150px] text-white text-2xl font-bold py-5 max-sm:px-2 px-3 flex justify-between max-sm:items-center">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setShowSidebar(true)}
          className="sm:hidden text-white text-3xl"
        >
          <FiMenu />
        </button>

        <h4>Todo App</h4>

        {status === "authenticated" && (
          <button
            onClick={logOutHandler}
            className="h-fit text-white text-2xl py-[5px] px-[10px] cursor-pointer"
          >
            <FiLogOut />
          </button>
        )}
      </header>
      <div className="flex min-h-[calc(100vh-150px)]">
        <aside
          className={`bg-white w-64 sm:w-60 mt-[-80px] text-lightGray rounded-tr-[20px] pt-7 pl-7 transition-transform duration-300 fixed sm:static z-50 h-full max-sm:-mt-5 ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        >
          {/* Close button (only visible on mobile) */}
          <div className="flex justify-end pr-4 sm:hidden">
            <button onClick={closeSidebar} className="text-2xl">
              <FiX />
            </button>
          </div>
          <p className="text-[#494a52] text-md  sm:text-xl font-bold mb-10">
            Welcome👋
          </p>
          <ul>
            <li
              className="text-md sm:text-lg font-medium mx-0 my-[15px] flex items-center"
              onClick={closeSidebar}
            >
              <VscListSelection />
              <Link className="ml-3" href="/">
                Todos
              </Link>
            </li>
            <li
              className="text-md sm:text-lg font-medium mx-0 my-[15px] flex items-center"
              onClick={closeSidebar}
            >
              <BiMessageSquareAdd />
              <Link className="ml-3" href="/add-todo">
                Add Todo
              </Link>
            </li>
            <li
              className="text-md sm:text-lg font-medium mx-0 my-[15px] flex items-center"
              onClick={closeSidebar}
            >
              <RxDashboard />
              <Link className="ml-3" href="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </aside>
        <section className="bg-[#f4f5fa]  overflow-x-hidden p-3 grow">
          {children}
        </section>
      </div>
    </div>
  );
}

export default Layout;
