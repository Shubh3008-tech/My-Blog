import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeBtn from "./ThemeBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Left Column: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>

          {/* Center Column: Username - NOW A LINK */}
          {authStatus && userData && (
            <div>
              <Link
                to="/profile"
                className="text-xl font-bold text-blue-700 dark:text-blue-400 hover:opacity-80 transition-opacity"
                title="View Profile" // Add a helpful tooltip
              >
                Hi, {userData.name}
              </Link>
            </div>
          )}

          {/* Right Column: Nav Links and Buttons */}
          <ul className="flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 duration-200 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li className="ml-4">
              <ThemeBtn />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
