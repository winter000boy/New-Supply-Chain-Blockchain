module.exports = {
  contracts_build_directory: './client/src/artifacts', // Directory for compiled contract ABIs
  networks: {
    // Development network configured for Ganache or other local blockchain
    development: {
      host: "127.0.0.1",     // Localhost, matching Ganache default
      port: 7545,            // Port for Ganache RPC server
      network_id: "*",       // Match any network ID (use "*" for flexibility)
    },
    // Uncomment and configure additional networks if needed
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
    //   network_id: 3,       // Ropsten's network ID
    //   gas: 5500000,        // Gas limit
    //   confirmations: 2,    // Number of confirmations to wait between deployments
    //   timeoutBlocks: 200,  // Number of blocks before deployment times out
    //   skipDryRun: true     // Skip dry run before migrations
    // },
  },

  mocha: {
    // timeout: 100000 // Uncomment and set a timeout if needed
  },

  compilers: {
    solc: {
      version: "0.8.20", // Updated Solidity version to match the contracts
      settings: {
        optimizer: {
          enabled: true, // Enable the optimizer for better gas efficiency
          runs: 200      // Optimize for how many times you intend to run the code
        }
      }
    }
  },

  db: {
    enabled: false // Disable Truffle DB (optional)
  }
};