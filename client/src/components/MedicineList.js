import React, { useState, useEffect } from "react";
import { getMedicines } from "../services/medicineService";
import "./MedicineList.css"; // Import the CSS file for styling

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true); // Start loading
      setMessage(""); // Clear previous messages

      try {
        const response = await getMedicines();
        setMedicines(response.data.medicines);
      } catch (err) {
        setMessage(`Error fetching medicines: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div className="medicine-list-container">
      <h2 className="medicine-list-title">Medicine List</h2>
      {loading && <p className="loading-message">Loading medicines...</p>}
      {message && <p className="error-message">{message}</p>}
      {medicines.length > 0 ? (
        <table className="medicine-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Batch Number</th>
              <th>Expiration Date</th>
              <th>RMS ID</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>{medicine.batchNumber}</td>
                <td>{medicine.expirationDate}</td>
                <td>{medicine.RMSid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="no-data-message">No medicines found.</p>
      )}
    </div>
  );
};

export default MedicineList;