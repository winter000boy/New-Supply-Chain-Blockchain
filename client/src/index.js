import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { BrowserRouter } from 'react-router-dom'; // React Router for routing
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import './App.css'; // Global styles

// Create the root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);