import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // Base URL for the backend API
});

// Add a request interceptor to include the authentication token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors (e.g., token expiration)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Remove the token if unauthorized
      window.location.href = "/login"; // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default API;