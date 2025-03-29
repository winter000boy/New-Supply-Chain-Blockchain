import React from "react";
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";
import "./MedicinePage.css"; // Import the CSS file for styling

const MedicinePage = () => {
  return (
    <div className="medicine-page-container">
      <h1 className="medicine-page-title">Medicine Management</h1>
      <p className="medicine-page-description">
        Add new medicines to the supply chain and view the list of existing medicines. Use the form below to add medicines and the table to view details.
      </p>

      {/* Medicine Form for adding new medicines */}
      <div className="medicine-form-section">
        <h2 className="section-title">Add Medicine</h2>
        <MedicineForm />
      </div>

      {/* Medicine List for viewing existing medicines */}
      <div className="medicine-list-section">
        <h2 className="section-title">Medicine List</h2>
        <MedicineList />
      </div>
    </div>
  );
};

export default MedicinePage;