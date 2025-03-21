import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'; // Ensure global styles are imported

// Create the root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

