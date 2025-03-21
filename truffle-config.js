module.exports = {
  contracts_build_directory: './client/src/artifacts',
  networks: {
    // Development network configured for Ganache or other local blockchain
    development: {
      host: "127.0.0.1",     // Localhost, matching Ganache default
      port: 7545,            // Port for Ganache RPC server
      network_id: "*",       // Match any network ID (use "*" for flexibility)
      // Alternatively, explicitly set the network ID if known:
      // network_id: "1742531285800",
    },
    // Other network configurations remain commented out or unchanged
    // advanced: { ... },
    // ropsten: { ... },
    // private: { ... }
  },

  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.5.16", // Specify the Solidity version to match your contracts
      // docker: true,
      // settings: { ... }
    }
  },

  db: {
    enabled: false
  }
};