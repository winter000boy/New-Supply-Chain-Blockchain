import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Pharma SCM</Link>
      </div>
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Dashboard</Link></li>
        <li><Link to="/roles" className="navbar-link">Roles</Link></li>
        <li><Link to="/add-medicine" className="navbar-link">Add Medicine</Link></li>
        <li><Link to="/track-product" className="navbar-link">Track Product</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;