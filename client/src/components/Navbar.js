import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#007bff", color: "#fff" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
        <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link></li>
        <li><Link to="/roles" style={{ color: "#fff", textDecoration: "none" }}>Roles</Link></li>
        <li><Link to="/add-medicine" style={{ color: "#fff", textDecoration: "none" }}>Add Medicine</Link></li>
        <li><Link to="/track-product" style={{ color: "#fff", textDecoration: "none" }}>Track Product</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;