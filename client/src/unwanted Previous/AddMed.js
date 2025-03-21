import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddMed() {
  const navigate = useNavigate();

  // State variables
  const [currentAccount, setCurrentAccount] = useState("");
  const [loader, setLoader] = useState(true);
  const [supplyChain, setSupplyChain] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medStages, setMedStages] = useState([]);
  const [medName, setMedName] = useState("");
  const [medDescription, setMedDescription] = useState("");

  // Load Web3 and blockchain data
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    try {
      setLoader(true);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = SupplyChainABI.networks[networkId];

      if (networkData) {
        const supplyChainInstance = new web3.eth.Contract(
          SupplyChainABI.abi,
          networkData.address
        );
        setSupplyChain(supplyChainInstance);

        const medicineCount = await supplyChainInstance.methods
          .medicineCtr()
          .call();

        const medicinesData = [];
        const stagesData = [];
        for (let i = 0; i < medicineCount; i++) {
          const medicine = await supplyChainInstance.methods
            .MedicineStock(i + 1)
            .call();
          const stage = await supplyChainInstance.methods
            .showStage(i + 1)
            .call();
          medicinesData.push(medicine);
          stagesData.push(stage);
        }

        setMedicines(medicinesData);
        setMedStages(stagesData);
      } else {
        alert("Smart contract not deployed to the detected network.");
      }
    } catch (error) {
      console.error("Error loading blockchain data:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    if (!medName || !medDescription) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoader(true);
      await supplyChain.methods
        .addMedicine(medName, medDescription)
        .send({ from: currentAccount });
      alert("Medicine added successfully!");
      loadBlockchainData();
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("An error occurred while adding the medicine.");
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return (
      <div style={styles.container}>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <span>
            <b>Current Account Address:</b> {currentAccount}
          </span>
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline-danger btn-sm"
            style={styles.homeButton}
          >
            HOME
          </button>
        </div>
        <br />
        <h5>Add Medicine:</h5>
        <form onSubmit={handleAddMedicine} style={styles.form}>
          <input
            className="form-control-sm"
            type="text"
            value={medName}
            onChange={(e) => setMedName(e.target.value)}
            placeholder="Medicine Name"
            required
          />
          <input
            className="form-control-sm"
            type="text"
            value={medDescription}
            onChange={(e) => setMedDescription(e.target.value)}
            placeholder="Medicine Description"
            required
          />
          <button
            className="btn btn-outline-success btn-sm"
            style={styles.submitButton}
          >
            Add Medicine
          </button>
        </form>
        <br />
        <h5>Medicine List:</h5>
        <table className="table table-bordered" style={styles.table}>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Current Stage</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={index}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>{medStages[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4c3 30%, #c5e1a5 90%)",
    padding: "20px",
  },
  content: {
    backgroundColor: "#ffffffcc",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "700px",
    width: "100%",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  homeButton: {
    cursor: "pointer",
  },
  form: {
    marginBottom: "20px",
  },
  submitButton: {
    marginTop: "10px",
  },
  table: {
    marginTop: "20px",
  },
};

export default AddMed;