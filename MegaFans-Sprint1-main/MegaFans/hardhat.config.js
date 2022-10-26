require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

const PV_KEY =
  "f925c36b6f4f44422e3bc8d91c068975fe5e53e37b62e24d8cc3c0fb8f6ac6ee";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.7",

  gasReporter: {
    currency: "USD",
    token: "MATIC", // Default value: ETH
    gasPrice: 30,
    ethPrice: 1.65, // 1 MATIC = 1.65 USD
  },

  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai_testnet: {
      url: "https://speedy-nodes-nyc.moralis.io/6cf78680e887ec9dc0a48400/polygon/mumbai",
      accounts: [],
    },
    polygon_mainnet: {
      url: "",
      accounts: [],
    },
  },
  etherscan: {
    apiKey: "",
  },
};
