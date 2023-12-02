// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"; // Import the CSS file for the navbar

const Navbar = () => {
  return (
    <nav className="navbar-container">
          <NavLink to="/home" className="navbar-link">
        Home
      </NavLink>
      <NavLink to="/reclamation" className="navbar-link">
        Reclamations
      </NavLink>
    
      <NavLink to="/users" className="navbar-link">
        Users
      </NavLink>
      <NavLink to="/" className="navbar-link">
        Logout
      </NavLink>
    </nav>
  );
};

export default Navbar;
