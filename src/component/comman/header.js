import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 comman-blue-font">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img className="cursor" onClick={() => navigate("/home")} src="/images/loftslogo 2.png" alt="Flowbite Logo" />
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg
           bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white 
           dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <NavLink
                to={"/home"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/home")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/about"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/about")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/property"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/property")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Property
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/gallary"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/gallary")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/blog"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/blog")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/animites"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/animites")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Amenities
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact"}
                className={`block py-2 px-3 ${
                  isActiveRoute("/contact")
                    ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                    : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                }`}
                aria-current="page"
              >
                Contact us
              </NavLink>
            </li>
            <li>
              {!token ? (
                <NavLink
                  to={"/login"}
                  className={`block py-2 px-3 ${
                    isActiveRoute("/login")
                      ? "text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                      : "text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent "
                  }`}
                  aria-current="page"
                >
                  Login
                </NavLink>
              ) : (
                <img
                  src="/images/profile.jpeg"
                  alt="No Image"
                  className="header-profile cursor"
                  onClick={() => {
                    navigate("/edit-profile");
                  }}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
