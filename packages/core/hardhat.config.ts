import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
// dynamically changes endpoints for local tests
const zkSyncTestnet =
  process.env.NODE_ENV == "test"
    ? {
        url: "http://192.168.29.82:3050",
        ethNetwork: "http://192.168.29.82:8545",
        zksync: true,
      }
    : {
        url: "https://zksync2-testnet.zksync.dev",
        ethNetwork: "goerli",
        zksync: true,
        // contract verification endpoint
        verifyURL:
          "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
      };
const config: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      isSystem: true, // make sure to include this line
    },
  },
  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      zksync: false,
    },
    zkSyncTestnet,
  },
  solidity: {
    version: "0.8.17",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    admin: {
      default: 1,
    },
  },
};

export default config;
