import React, { useContext } from "react";
import GoogleSignInButton from "./GoogleSignInButton";
import { AuthContext } from "../contexts/AuthContext";
import { googleLogout } from "@react-oauth/google";

export function Header() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="svgviewer-png-output.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              User Data
            </span>
          </a>
        </div>
        <div>
          {user ? (
            <>
              <img
                src={user.picture}
                alt={user.name}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                }}
              />
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}

export default Header;
