import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { deployZkSync } from "../utils/deployment";
import { Registry } from "../typechain-types";

const deploy_function: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  await deployZkSync(hre, "Registry", {
    from: "deployer",
  });

  const Registry = await hre.ethers.getContract<Registry>("Registry");

  const tx = await Registry.createPaymaster(0);
  const r = await tx.wait();
  const createdEvent = r.events?.filter(
    (e) => e.event === "CreatePaymaster"
  )?.[0];

  const paymasterAddress = (createdEvent?.args as any).paymaster;

  console.log(`Paymaster address: ${paymasterAddress}`);
};

export default deploy_function;

deploy_function.tags = ["Registry", "testing"];
// deploy_function.dependencies = ["ERC20"];
