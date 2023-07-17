import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployZkSync, getWalletFromNamedAccount } from "../utils/deployment";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { utils } from "zksync-web3";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const wallet = await getWalletFromNamedAccount("deployer");
  const deployer = new Deployer(hre, wallet);
  const aaArtifact = await deployer.loadArtifact("Account");
  //   const factory = await deployer.deploy(factoryArtifact, );

  await deployZkSync(hre, "AAFactory", {
    from: "deployer",
    args: [
      [utils.hashBytecode(aaArtifact.bytecode)],
      undefined,
      [aaArtifact.bytecode],
    ],
  });
};

export default deploy_function;

deploy_function.tags = ["AAFactory", "testing"];
