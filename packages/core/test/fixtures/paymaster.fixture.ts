import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { setupUser, setupUsers } from "./utils";

import { TestERC20, TestERC20__factory, Registry } from "../../typechain-types";

export const deployment_fixture = deployments.createFixture(async (hre) => {
  // if (true) {
  //   const erc20Factory = await hre.ethers.getContractFactory<TestERC20__factory>(
  //     "TestERC20"
  //   );
  //   console.log(erc20Factory.interface.getSighash("approve(address,uint256)"));
  //   // let selector = alice.ERC20.interface.functions["approve(address,uint256)"];
  //   process.exit(0);
  // }

  await hre.deployments.fixture(["testing"]);

  const ERC20 = await hre.ethers.getContract<TestERC20>("TestERC20");
  const Registry = await hre.ethers.getContract<Registry>("Registry");

  const contracts = { ERC20, Registry };

  const { deployer } = await getNamedAccounts();
  const users = await getUnnamedAccounts();

  return {
    ...contracts,
    deployer: await setupUser(deployer, contracts),
    users: await setupUsers(users, contracts),
  };
});
