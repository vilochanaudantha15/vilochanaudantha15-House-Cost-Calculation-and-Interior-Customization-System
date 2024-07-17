import React, { useState } from "react";
import "../styles/navi.scss";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbarBox">
        <div className="navbarItem">
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/">Room Design</a>
          <a href="/">Furniture</a>
          <a href="/uploader">Cost Prediction</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div className="hamburgerIcon" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        </div>
        {isMenuOpen && (
          <div className="menu">
            {/* Add your menu items here */}
            <a href="/">Room Customizer</a>
            <a href="/">Furniture Customizer</a>
            <a href="/">Menu Item 3</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
