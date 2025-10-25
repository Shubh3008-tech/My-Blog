import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeBtn from "./ThemeBtn";
// 1. Import the menu icons
import { FiMenu, FiX } from "react-icons/fi";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  // 2. Add state to manage the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  // Helper function to handle navigation and close the menu
  const navigateAndClose = (slug) => {
    navigate(slug);
    setIsMenuOpen(false);
  };

  return (
    <header className="py-3 shadow bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 sticky top-0 z-50">
      <Container>
        {/* 3. This is the main nav bar */}
        <nav className="flex items-center justify-between">
          {/* Left Column: Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Logo width="100px" />
            </Link>
          </div>

          {/* 4. Center Column: Username (HIDDEN on mobile) */}
          {authStatus && userData && (
            <div className="hidden md:block">
              <Link
                to="/profile"
                className="text-xl font-bold text-blue-700 dark:text-blue-400 hover:opacity-80 transition-opacity"
                title="View Profile"
              >
                {userData.name}
              </Link>
            </div>
          )}

          {/* 5. Right Column: Nav Links and Buttons (HIDDEN on mobile) */}
          <ul className="hidden md:flex items-center space-x-4">
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

          {/* 6. Mobile Menu Button (ONLY visible on mobile) */}
          <div className="md:hidden flex items-center">
            <ThemeBtn />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-2xl dark:text-white"
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </nav>

        {/* 7. The Full-Screen Mobile Menu */}
        {/* This menu slides in from the top when 'isMenuOpen' is true */}
        <div
          className={`
                    md:hidden fixed top-[68px] left-0 w-full h-[calc(100vh-68px)] bg-white dark:bg-gray-950 
                    transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
                    flex flex-col items-center justify-center z-40
                `}
        >
          {/* Username (at the top of the mobile menu) */}
          {authStatus && userData && (
            <div className="mb-8">
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-blue-700 dark:text-blue-400"
              >
                {userData.name}
              </Link>
            </div>
          )}

          {/* Mobile Nav Links */}
          <ul className="flex flex-col items-center space-y-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigateAndClose(item.slug)}
                    className="text-2xl dark:text-gray-200"
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
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
