import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";
import { deployZkSync } from "../utils/deployment";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  await deployZkSync(hre, "MyERC20", {
    from: "deployer",
    args: ["MyToken", "MyToken", 18],
  });
};

export default deploy_function;

deploy_function.tags = ["ERC20", "testing"];
