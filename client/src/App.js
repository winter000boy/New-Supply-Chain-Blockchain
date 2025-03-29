import './App.css';
import Dashboard from './pages/Dashboard';
import RolesPage from './pages/RolesPage';
import MedicinePage from './pages/MedicinePage';
import SupplyChain from './pages/SupplyChain';
import TrackingPage from './pages/TrackingPage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound'; // New 404 Page Component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar for navigation */}
        <Navbar />

        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/roles"
            element={
              <ProtectedRoute>
                <RolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-medicine"
            element={
              <ProtectedRoute>
                <MedicinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/supply-chain"
            element={
              <ProtectedRoute>
                <SupplyChain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-product"
            element={
              <ProtectedRoute>
                <TrackingPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {/* Footer for additional information */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;