import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments } = hre;
  const { getOrNull } = deployments;

  const isDeployed = await getOrNull("ERC20");

  if (isDeployed?.address) {
    console.log(
      "Reusing: ERC20 contract is already deployed at: ",
      isDeployed.address
    );
    return;
  }

  const wallet = new Wallet(process.env.DEPLOYER_PRIVATE_KEY ?? "");
  const deployer = new Deployer(hre, wallet);

  const erc20Artifact = await deployer.loadArtifact("MyERC20");
  const erc20 = await deployer.deploy(erc20Artifact, [
    "MyToken",
    "MyToken",
    18,
  ]);
  console.log(`ERC20 address: ${erc20.address}`);
};

export default deploy_function;

deploy_function.tags = ["ERC20"];
