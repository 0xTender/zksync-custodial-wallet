import { deployments } from "hardhat";

export const hello_fixture = deployments.createFixture(async (hre) => {
  await hre.deployments.fixture(["ERC20"]);

  const ERC20 = await hre.ethers.getContract("ERC20");

  const contracts = { ERC20 };

  return {
    ...contracts,
  };
});
