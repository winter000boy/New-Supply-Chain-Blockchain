import React, { useState } from "react";
import { addMedicine } from "../services/medicineService";

const MedicineForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [RMSid, setRMSid] = useState("");
  const [message, setMessage] = useState("");

  const handleAddMedicine = async () => {
    try {
      const response = await addMedicine({
        name,
        description,
        batchNumber: parseInt(batchNumber),
        expirationDate: parseInt(expirationDate),
        RMSid: parseInt(RMSid),
      });
      setMessage(`Medicine added successfully: ${response.data.message}`);
    } catch (err) {
      setMessage(`Error adding medicine: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter medicine name"
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>
      <div>
        <label>Batch Number:</label>
        <input
          type="number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          placeholder="Enter batch number"
        />
      </div>
      <div>
        <label>Expiration Date (YYYYMMDD):</label>
        <input
          type="number"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          placeholder="Enter expiration date"
        />
      </div>
      <div>
        <label>RMS ID:</label>
        <input
          type="number"
          value={RMSid}
          onChange={(e) => setRMSid(e.target.value)}
          placeholder="Enter RMS ID"
        />
      </div>
      <button onClick={handleAddMedicine}>Add Medicine</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MedicineForm;