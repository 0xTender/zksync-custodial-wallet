import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-chai-matchers";

import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@matterlabs/hardhat-zksync-verify";
// dynamically changes endpoints for local tests
import { config } from "dotenv";

config({
  path: `.env`,
});

const zkSyncLocalNode = {
  url: "http://192.168.29.82:3050",
  ethNetwork: "http://192.168.29.82:8545",
  zksync: true,
  accounts: [process.env.DEPLOYER_PRIVATE_KEY ?? ""],
};

const zkSyncTestnet = {
  url: "https://zksync2-testnet.zksync.dev",
  ethNetwork: "goerli",
  zksync: true,
  // contract verification endpoint
  verifyURL:
    "https://zksync2-testnet-explorer.zksync.dev/contract_verification",
};

const hardhatConfig: HardhatUserConfig = {
  zksolc: {
    version: "latest",
    settings: {
      isSystem: true, // make sure to include this line
    },
  },
  networks: {
    hardhat: {
      zksync: false,
    },
    zkSyncLocalNode,
    zkSyncTestnet,
  },
  solidity: {
    version: "0.8.17",
  },
  namedAccounts: {
    deployer: {
      default: "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049",
    },
    admin: {
      default: 1,
    },
  },
};

export default hardhatConfig;
