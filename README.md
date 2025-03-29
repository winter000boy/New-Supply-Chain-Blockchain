<h1 align="center">
  <br>
  <a><img src="https://www.mdpi.com/logistics/logistics-03-00005/article_deploy/html/images/logistics-03-00005-g001.png" width="200"></a>
  <br>  
  New Supply Chain Blockchain
  <br>
</h1>

<p align="center">
  A Blockchain-based Pharma Supply Chain Management System
</p>

<p align="center">
  <a href="https://soliditylang.org/">
    <img src="https://github.com/rishav4101/eth-supplychain-dapp/blob/main/images/Solidity.svg" width="80">       
  </a>
  <a href="https://reactjs.org/"><img src="https://github.com/rishav4101/eth-supplychain-dapp/blob/main/images/react.png" width="80"></a>
  <a href="https://www.trufflesuite.com/">
    <img src="https://github.com/rishav4101/eth-supplychain-dapp/blob/main/images/trufflenew.png" width="50">
  </a>
  <a href="https://www.npmjs.com/package/web3">
    <img src="https://github.com/rishav4101/eth-supplychain-dapp/blob/main/images/web3.jpg" width="60">
  </a>
</p>

---

## 📖 Overview

This project is a **Blockchain-based Pharma Supply Chain Management System** that leverages smart contracts to ensure transparency, security, and efficiency in the supply chain. It tracks the journey of pharmaceutical products from raw material suppliers to retailers, ensuring accountability and trust.

🔗 **GitHub Repository:** [New-Supply-Chain-Blockchain](https://github.com/winter000boy/New-Supply-Chain-Blockchain.git)

---

## 🚀 Features

- **Role Management**: Assign roles like Raw Material Supplier, Manufacturer, Distributor, and Retailer.
- **Medicine Tracking**: Track the history and current status of medicines in the supply chain.
- **Blockchain Transparency**: Ensure secure and immutable records using the Ethereum blockchain.
- **Smart Contracts**: Manage supply chain operations with Solidity-based smart contracts.
- **User-Friendly Interface**: React-based frontend for seamless interaction with the blockchain.

---

## 🛠️ Installation & Setup

### Step 1: Install Prerequisites

1. **VS Code** → [Download](https://code.visualstudio.com/)  
2. **Node.js** → [Download](https://nodejs.org/) → Check version: `node -v`  
3. **Git** → [Download](https://git-scm.com/downloads) → Check version: `git --version`  
4. **Ganache** → [Download](https://trufflesuite.com/ganache/)  
5. **MetaMask** → Install as a [browser extension](https://metamask.io/)  

### Step 2: Clone the Repository
```sh
git clone https://github.com/winter000boy/New-Supply-Chain-Blockchain.git
cd New-Supply-Chain-Blockchain
```

### Step 3: Install Dependencies
```sh
npm install -g truffle
npm install
cd client && npm install
cd ../server && npm install
```

### Step 4: Compile & Deploy Smart Contracts
```sh
truffle compile
truffle migrate
```

---

## 🏃‍♂️ Running the DApp

### Start Backend
```sh
cd server
npm start
```

### Start Frontend
```sh
cd client
npm start
```
The app will run at **http://localhost:3000**.

---

## 🔗 Connect MetaMask with Ganache

1. **Start Ganache** and copy the **RPC URL**.
2. **Open MetaMask**, go to **Networks**, and add a **Custom RPC**.
3. **Paste the Ganache RPC URL** and save.
4. **Import an Account**:
   - Copy a **Private Key** from Ganache.
   - In MetaMask, go to **Import Account** and paste the key.

---

## 📜 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 📚 Documentation

- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.4/)
- [React Docs](https://reactjs.org/docs/getting-started.html)
- [Truffle Docs](https://trufflesuite.com/docs/truffle/)
- [Ganache Docs](https://trufflesuite.com/docs/ganache/overview/)

