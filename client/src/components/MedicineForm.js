import React, { useState } from "react";
import { addMedicine } from "../services/medicineService";
import "./MedicineForm.css"; // Import the CSS file for styling

const MedicineForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [RMSid, setRMSid] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddMedicine = async () => {
    if (!name || !description || !batchNumber || !expirationDate || !RMSid) {
      setMessage("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading
    setMessage(""); // Clear previous messages

    try {
      const response = await addMedicine({
        name,
        description,
        batchNumber: parseInt(batchNumber),
        expirationDate: parseInt(expirationDate),
        RMSid: parseInt(RMSid),
      });
      setMessage(`Medicine added successfully: ${response.data.message}`);
      // Clear form fields after successful submission
      setName("");
      setDescription("");
      setBatchNumber("");
      setExpirationDate("");
      setRMSid("");
    } catch (err) {
      setMessage(`Error adding medicine: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="medicine-form-container">
      <h2 className="medicine-form-title">Add Medicine</h2>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter medicine name"
          className="form-input"
          aria-label="Medicine Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="form-input"
          aria-label="Medicine Description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="batchNumber">Batch Number:</label>
        <input
          id="batchNumber"
          type="number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          placeholder="Enter batch number"
          className="form-input"
          aria-label="Batch Number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="expirationDate">Expiration Date (YYYYMMDD):</label>
        <input
          id="expirationDate"
          type="number"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          placeholder="Enter expiration date"
          className="form-input"
          aria-label="Expiration Date"
        />
      </div>
      <div className="form-group">
        <label htmlFor="RMSid">RMS ID:</label>
        <input
          id="RMSid"
          type="number"
          value={RMSid}
          onChange={(e) => setRMSid(e.target.value)}
          placeholder="Enter RMS ID"
          className="form-input"
          aria-label="RMS ID"
        />
      </div>
      <button
        onClick={handleAddMedicine}
        className="medicine-form-button"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Adding..." : "Add Medicine"}
      </button>
      {message && <p className="medicine-form-message">{message}</p>}
    </div>
  );
};

export default MedicineForm;