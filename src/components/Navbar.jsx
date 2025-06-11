import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RepoTemplateIcon } from "@primer/octicons-react";

export default function Navbar() {
  const navigation = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("userID"); // Remove the user from localStorage
    setTimeout(() => {
      navigation("/auth");
    }, 500);
  };

  const logoutHandler = () => {
    handleLogout();
    setIsLoggedIn(false); // immediately update UI
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md navBar bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-1 ">
        {/* Logo */}
        <Link to="/">
          <div className="text-3xl font-extrabold flex items-center">
            <img
              src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
              alt="GitHub Logo"
              className="w-5"
            />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-gray-600 to-black text-transparent bg-clip-text ml-1">
              GitForge
            </span>
          </div>
        </Link>

        {/* ********** Desktop NavLinks ********** */}
        <div className="hidden md:flex items-center gap-2 text-m">
          <>
            {!isLoggedIn && (
              <>
                <Link to="/create">
                  <p className="hover:text-blue-700 transition-colors duration-200   p-2 navLink flex gap-1">
                    <RepoTemplateIcon size={16} /> Repository
                  </p>
                </Link>
                <Link to="/profile">
                  <p className="bg-white hover:bg-black hover:text-white px-3 py-2 text-black font-bold rounded-md text-sm transition-colors duration-200">
                    Profile
                  </p>
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/create">
                  <p className="justify-content-center hover:text-blue-700 transition-colors duration-200  p-1 navLink flex gap-1">
                    <RepoTemplateIcon size={16} className="mt-0.5" /> Repository
                  </p>
                </Link>
                <Link to="/profile">
                  <p className="justify-content-center hover:text-blue-700 transition-colors duration-200  p-1 navLink">
                    Profile
                  </p>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white hover:bg-black hover:text-white hover:border-white p-1 border-2 border-gray-400 text-black font-bold rounded-md text-sm transition-colors duration-200"
                >
                  Logout
                </button>
                {/* <NavUser /> */}
              </>
            )}
          </>
        </div>

        {/* ********** Mobile NavLinks ********** */}
        <div className="md:hidden flex">
          {!isLoggedIn && (
            <>
              <Link to="/create">
                <p className="hover:text-blue-700 transition-colors duration-200  border-2 rounded-md border-gray-400 px-2 py-2 me-1">
                  <RepoTemplateIcon size={16} className="mt-0.5" /> Repository
                </p>
              </Link>
              <Link to="/auth">
                <p className="bg-white hover:bg-black hover:text-white hover:border-white px-2 py-2 border-2 border-gray-500 text-black rounded-md transition-colors duration-200 me-1">
                  Login
                </p>
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/create">
                <p className="hover:text-blue-700 transition-colors duration-200  border-2 rounded-md border-gray-400 p-1 me-1 flex gap-1">
                  <RepoTemplateIcon size={16} className="mt-0.5" /> Repository
                </p>
              </Link>
              <Link to="/profile">
                <p className="bg-white hover:bg-black hover:text-white hover:border-white p-1 border-2 border-gray-500 text-black rounded-md transition-colors duration-200 me-1">
                  Profile
                </p>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
