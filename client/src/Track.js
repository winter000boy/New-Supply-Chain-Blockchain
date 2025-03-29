import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated for React Router v6
import Web3 from 'web3';
import SupplyChainABI from './artifacts/SupplyChain.json';
import { QRCodeCanvas } from 'qrcode.react';

function Track() {
  const navigate = useNavigate(); // Replaces useHistory
  const [currentAccount, setCurrentAccount] = useState('');
  const [loader, setLoader] = useState(true);
  const [supplyChain, setSupplyChain] = useState(null);
  const [medicines, setMedicines] = useState({});
  const [medStages, setMedStages] = useState({});
  const [id, setId] = useState('');
  const [stage, setStage] = useState(null);
  const [qrData, setQrData] = useState(null);

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
      alert('Non-Ethereum browser detected. Please install MetaMask!');
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
        const supplyChainInstance = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
        setSupplyChain(supplyChainInstance);

        const medicineCount = await supplyChainInstance.methods.medicineCtr().call();
        const medicinesData = {};
        const stagesData = {};

        for (let i = 1; i <= medicineCount; i++) {
          medicinesData[i] = await supplyChainInstance.methods.MedicineStock(i).call();
          stagesData[i] = await supplyChainInstance.methods.showStage(i).call();
        }

        setMedicines(medicinesData);
        setMedStages(stagesData);
      } else {
        alert('Smart contract not deployed to the detected network.');
      }
    } catch (error) {
      console.error('Error loading blockchain data:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleTrack = async (event) => {
    event.preventDefault();
    if (!id || !medicines[id]) {
      alert('Invalid Battery ID!');
      return;
    }

    const currentStage = medicines[id].stage;
    setStage(currentStage);

    const qrData = {
      id: medicines[id].id,
      name: medicines[id].name,
      description: medicines[id].description,
      currentStage,
    };
    setQrData(JSON.stringify(qrData));
  };

  const renderStageDetails = () => {
    if (!stage) return null;

    const stages = [
      { label: 'Raw Materials Supplied by', data: medicines[id]?.RMSid },
      { label: 'Manufactured by', data: medicines[id]?.MANid },
      { label: 'Distributed by', data: medicines[id]?.DISid },
      { label: 'Retailed by', data: medicines[id]?.RETid },
      { label: 'Sold', data: null },
    ];

    return (
      <div className="container-xl">
        <h3>Battery Details</h3>
        <p><b>ID:</b> {medicines[id]?.id}</p>
        <p><b>Name:</b> {medicines[id]?.name}</p>
        <p><b>Description:</b> {medicines[id]?.description}</p>
        <p><b>Current Stage:</b> {medStages[id]}</p>

        <hr />
        <h4>Tracking Details</h4>
        {stages.slice(0, stage).map((stageDetail, index) => (
          <div key={index}>
            <h5>{stageDetail.label}</h5>
            {stageDetail.data ? (
              <>
                <p><b>ID:</b> {stageDetail.data}</p>
                <p><b>Name:</b> {medicines[stageDetail.data]?.name}</p>
                <p><b>Place:</b> {medicines[stageDetail.data]?.place}</p>
              </>
            ) : (
              <p>Completed</p>
            )}
            {index < stage - 1 && <span>&#10132;</span>}
          </div>
        ))}

        <div className="qr-code-container">
          <h4>QR Code:</h4>
          {qrData && <QRCodeCanvas value={qrData} />}
        </div>

        <button onClick={() => setStage(null)} className="btn btn-outline-success btn-sm">Track Another Item</button>
        <button onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">Home</button>
      </div>
    );
  };

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h3>Current Account: {currentAccount}</h3>
      <button onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">Home</button>

      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(medicines).map((key) => (
            <tr key={key}>
              <td>{medicines[key].id}</td>
              <td>{medicines[key].name}</td>
              <td>{medicines[key].description}</td>
              <td>{medStages[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleTrack}>
        <input
          type="text"
          className="form-control-sm"
          placeholder="Enter Battery ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-outline-success btn-sm">Track</button>
      </form>

      {renderStageDetails()}
    </div>
  );
}

export default Track;