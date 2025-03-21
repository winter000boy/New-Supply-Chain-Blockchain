import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save JWT token
      setMessage("Login successful!");
      navigate("/"); // Redirect to the home page
    } catch (err) {
      setMessage(`Error logging in: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="form-input"
          />
        </div>
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;