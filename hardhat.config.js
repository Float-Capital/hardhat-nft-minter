require("hardhat-spdx-license-identifier");
require("@tenderly/hardhat-tenderly"); // https://hardhat.org/plugins/tenderly-hardhat-tenderly.html
require("solidity-coverage");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-docgen");

let config;
try {
  config = require("./secretsManager.js");
} catch (e) {
  console.error(
    "You are using the example secrets manager, please copy this file if you want to use it"
  );
  config = require("./secretsManager.example.js");
}

const {
  mnemonic,
  etherscanApiKey,
  polygonscanApiKey,
  mumbaiProviderUrl,
  polygonProviderUrl,
} = config;

let runCoverage =
  !process.env.DONT_RUN_REPORT_SUMMARY ||
  process.env.DONT_RUN_REPORT_SUMMARY.toUpperCase() != "TRUE";
if (runCoverage) {
  require("hardhat-abi-exporter");
  require("hardhat-gas-reporter");
}

module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      // process.env.HARDHAT_FORK will specify the network that the fork is made from.
      // this line ensure the use of the corresponding accounts
      forking: process.env.HARDHAT_FORK
        ? {
            url:
              process.env.HARDHAT_FORK == "polygon"
                ? polygonProviderUrl
                : mumbaiProviderUrl || "https://rpc-mumbai.maticvigil.com/v1",
          }
        : undefined,
      accounts: process.env.HARDHAT_FORK
        ? {
            mnemonic,
          }
        : undefined,
    },
    ganache: {
      url: "http://localhost:8545",
    },
    polygon: {
      chainId: 137,
      // "https://matic-mainnet-full-rpc.bwarelabs.com/",
      // "https://rpc-mainnet.matic.network",
      // "https://matic-mainnet.chainstacklabs.com",
      url:
        polygonProviderUrl || "https://matic-mainnet-full-rpc.bwarelabs.com/",
      accounts: { mnemonic },
      gasPrice: 60000000000, // 60 gwei
      gas: 10000000,
    },
    mumbai: {
      chainId: 80001,
      url: mumbaiProviderUrl || "https://rpc-mumbai.maticvigil.com/v1",
      accounts: { mnemonic },
      // gasPrice: 1000000000,
      // gas: 15000000,
    },
  },
  paths: {},
  namedAccounts: {
    deployer: 0,
    admin: 1,
    user1: 2,
    user2: 3,
    user3: 4,
    user4: 5,
  },
  gasReporter: {
    // Disabled by default for faster running of tests
    enabled: true,
    currency: "USD",
    gasPrice: 80,
    coinmarketcap: "9aacee3e-7c04-4978-8f93-63198c0fbfef",
  },
  spdxLicenseIdentifier: {
    // Set these to true if you ever want to change the licence on all of the contracts (by changing it in package.json)
    overwrite: false,
    runOnCompile: false,
  },
  abiExporter: {
    path: "./abis",
    clear: true,
    flat: true,
    only: [":ERC1155PresetMinterPauser$"],
    spacing: 2,
  },
  etherscan: {
    apiKey: polygonscanApiKey,
  },
};
