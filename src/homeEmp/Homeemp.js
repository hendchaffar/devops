import React from "react";
import { NavLink } from "react-router-dom";
import './homeemp.css'; // Assurez-vous d'importer votre fichier de styles CSS

const Homeemp = () => {
  return (
    <div>
      <nav className="navbar-container">
        <NavLink to="/homeemp" className="navbar-link">
          Home
        </NavLink>
        <NavLink to="/epreclamation" className="navbar-link">
          Reclamations
        </NavLink>
        <NavLink to="/" className="navbar-link">
          Logout
        </NavLink>
      </nav>
      
      <div className="home-container">
      
        <h2 className="welcome-message">Welcome to the Employee Page</h2>
        <p className="page-description">
          This is the home page for employees. Explore the options in the navigation bar above.
        </p>
      </div>
      <img width="100" 
          src="/image/a.png"  // Replace with the actual path to your image
          alt="Welcome Image"
          className="welcome-image"
        />
      
    </div>
    
  );
};

export default Homeemp;
