import './App.css';
import Dashboard from './pages/Dashboard';
import RolesPage from './pages/RolesPage';
import MedicinePage from './pages/MedicinePage';
import SupplyChain from './pages/SupplyChain';
import TrackingPage from './pages/TrackingPage';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
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
          <Route path="/roles" element={<ProtectedRoute element={<RolesPage />} />} />
          <Route path="/add-medicine" element={<ProtectedRoute element={<MedicinePage />} />} />
          <Route path="/supply-chain" element={<ProtectedRoute element={<SupplyChain />} />} />
          <Route path="/track-product" element={<ProtectedRoute element={<TrackingPage />} />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>

        {/* Footer for additional information */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
