import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css"; // Import the CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save JWT token
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1000); // Redirect to the home page after a delay
    } catch (err) {
      setMessage(`Error logging in: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-input"
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="form-input"
            aria-label="Password"
          />
        </div>
        <button
          onClick={handleLogin}
          className="login-button"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;