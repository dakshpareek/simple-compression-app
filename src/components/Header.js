import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      {/* Replace the logo with your actual logo */}
      <img src="logo.png" alt="Logo" className="logo" />
      <nav>
        <Link to="/blog">Blogs</Link>
        <Link to="/faq">FAQ</Link>
        {/* <a href="/contact">Contact</a> */}
      </nav>
    </header>
  );
};

export default Header;
