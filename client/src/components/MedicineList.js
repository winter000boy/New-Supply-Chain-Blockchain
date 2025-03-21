import React, { useState, useEffect } from "react";
import { getMedicines } from "../services/medicineService";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getMedicines();
        setMedicines(response.data.medicines);
      } catch (err) {
        setMessage(`Error fetching medicines: ${err.response?.data?.error || err.message}`);
      }
    };

    fetchMedicines();
  }, []);

  return (
    <div>
      <h2>Medicine List</h2>
      {message && <p>{message}</p>}
      {medicines.length > 0 ? (
        <table>
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
        <p>No medicines found.</p>
      )}
    </div>
  );
};

export default MedicineList;