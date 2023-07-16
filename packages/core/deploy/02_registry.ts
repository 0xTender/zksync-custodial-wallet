import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";
import {
  isDeployed,
  getWalletFromNamedAccount,
  deployZkSync,
} from "../utils/deployment";
import { deployments } from "hardhat";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  await deployZkSync(hre, "Registry", {
    from: "deployer",
  });
};

export default deploy_function;

deploy_function.tags = ["Registry"];
// deploy_function.dependencies = ["ERC20"];
