import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "images/logo1.png";
const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="navbar sticky-top navbar-dark bg-dark" id="nav-header">
        <Link to="/" className="navbar-brand" href="#" id="ul-heading-img">
          <img className="img-header" src={Logo} alt="images" />
        </Link>

        <ul className="navbar-nav" id="ul-heading">
          <li className="nav-item" id="nav-title">
            <h2 className="nav-link text-dark" href="#">
              Time Table Management System
            </h2>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
