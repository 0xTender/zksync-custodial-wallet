import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import { config, deployments, ethers, network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { Wallet } from "zksync-web3";

export const isDeployed = async (name: string) => {
  const { getOrNull } = deployments;

  const deployment = await getOrNull(name);

  if (deployment?.address) {
    console.log(
      `Reusing: ${name} contract is already deployed at: `,
      deployment.address
    );
    return true;
  }

  return false;
};

export const deployZkSync = async (
  hre: HardhatRuntimeEnvironment,
  name: string,
  {
    args,
    from,
    skipIfAlreadyDeployed = true,
  }: { args?: any[]; from: string; skipIfAlreadyDeployed?: boolean }
) => {
  if ((await isDeployed(name)) && skipIfAlreadyDeployed === true) {
    return;
  }

  const wallet = await getWalletFromNamedAccount(from);
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact(name);
  const contract = await deployer.deploy(artifact, args ?? []);

  await deployments.save(name, {
    abi: artifact.abi,
    address: contract.address,
    args: args ?? [],
  });
  console.log(`${name} address: ${contract.address}`);
};

export const getWalletFromNamedAccount = async (accountName: string) => {
  let account = config.namedAccounts[accountName];

  if (!account) {
    throw new Error("Account not found");
  }
  const networkName = network.name;

  account = account[networkName] ?? account["default"];

  const accounts = await ethers.getSigners();

  if (account.toString().startsWith("0x")) {
    let index = 0;
    for (const accountWithAddress of accounts) {
      if (accountWithAddress.address === account) {
        return new Wallet(config.networks[networkName].accounts[index]);
      }
      index++;
    }
    throw new Error("Invalid account: " + account.toString());
  }

  const accountIndex = parseInt(account.toString());
  if (accountIndex < accounts.length) {
    return new Wallet(config.networks[networkName].accounts[accountIndex]);
  }

  throw new Error("Invalid account: " + account.toString());
};
