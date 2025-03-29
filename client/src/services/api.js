import axios from "axios";

// Create an Axios instance with a base URL
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
    // Log the request error for debugging
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses and errors globally
API.interceptors.response.use(
  (response) => {
    // Return the response data directly for convenience
    return response;
  },
  (error) => {
    // Handle specific HTTP status codes
    if (error.response) {
      const { status } = error.response;

      // Handle unauthorized errors (e.g., token expiration)
      if (status === 401) {
        localStorage.removeItem("token"); // Remove the token if unauthorized
        window.location.href = "/login"; // Redirect to the login page
      }

      // Handle forbidden errors
      if (status === 403) {
        console.error("Access forbidden: You do not have permission to perform this action.");
        alert("You do not have permission to perform this action.");
      }

      // Handle server errors
      if (status === 500) {
        console.error("Server error: Please try again later.");
        alert("An error occurred on the server. Please try again later.");
      }
    } else {
      // Handle network or other errors
      console.error("Network error:", error.message);
      alert("A network error occurred. Please check your internet connection.");
    }

    return Promise.reject(error); // Reject the promise to propagate the error
  }
);

export default API;