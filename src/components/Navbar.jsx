import React from 'react';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav__left">
        <img
          src="https://global-uploads.webflow.com/5d42ce595e4c2ede9efec7cc/5d6e4e81141661c438ea8292_circles.png"
          alt="logo"
          className="nav__img"
        />
        <a href="https://www.lumen.me/" target="_blank" rel="noreferrer" className="nav__logo">
          Lumen API
        </a>
      </div>
      <ul className="nav__links">
        <li>Home</li>
        <li>About</li>
        <li>Account</li>
      </ul>
    </nav>
  );
};

export default Navbar;
