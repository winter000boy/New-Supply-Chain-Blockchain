import React from "react";
import MedicineForm from "../components/MedicineForm";
import MedicineList from "../components/MedicineList";

const MedicinePage = () => {
  return (
    <div>
      <h1>Medicine Management</h1>
      <p>
        Add new medicines to the supply chain and view the list of existing medicines. Use the form below to add medicines and the table to view details.
      </p>

      {/* Medicine Form for adding new medicines */}
      <div style={{ marginBottom: "40px" }}>
        <h2>Add Medicine</h2>
        <MedicineForm />
      </div>

      {/* Medicine List for viewing existing medicines */}
      <div>
        <h2>Medicine List</h2>
        <MedicineList />
      </div>
    </div>
  );
};

export default MedicinePage;