import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Wallet } from "zksync-web3";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments } = hre;

  const { getOrNull } = deployments;

  const isDeployed = await getOrNull("Paymaster");

  if (isDeployed?.address) {
    console.log(
      "Reusing: Paymaster contract is already deployed at: ",
      isDeployed.address
    );
    return;
  }

  const erc20 = await deployments.get("ERC20");

  const wallet = new Wallet(process.env.DEPLOYER_PRIVATE_KEY ?? "");
  const deployer = new Deployer(hre, wallet);

  const paymasterArtifact = await deployer.loadArtifact("MyPaymaster");
  const paymaster = await deployer.deploy(paymasterArtifact, [erc20.address]);

  await deployments.save("PayMaster", {
    abi: paymasterArtifact.abi,
    address: paymaster.address,
    args: [erc20.address],
  });

  console.log(`Paymaster address: ${paymaster.address}`);
};

export default deploy_function;

deploy_function.tags = ["Paymaster"];
deploy_function.dependencies = ["ERC20"];
