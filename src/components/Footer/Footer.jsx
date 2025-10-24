import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";
import { Container } from "../index";

function Footer() {
  return (
    <footer className="py-10 bg-gray-100 dark:bg-gray-900 border-t-2 border-t-gray-200 dark:border-t-gray-700 mt-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Logo width="100px" />
          </div>
          <div className="text-center md:text-left text-gray-600 dark:text-gray-400">
            <p className="text-sm font-semibold">
              &copy; {new Date().getFullYear()} Blogit. All Rights Reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
