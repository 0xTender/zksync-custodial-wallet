import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { getWalletFromAddress } from "../../utils/deployment";
import { Wallet } from "zksync-web3";
import { HttpNetworkConfig } from "hardhat/types";
import * as zk from "zksync-web3";

export async function setupUsers<
  T extends { [contractName: string]: Contract }
>(
  addresses: string[],
  contracts: T
): Promise<({ address: string; wallet: Wallet } & T)[]> {
  const users: ({ address: string; wallet: Wallet } & T)[] = [];
  for (const address of addresses) {
    users.push(await setupUser(address, contracts));
  }
  return users;
}

export async function setupUser<T extends { [contractName: string]: Contract }>(
  address: string,
  contracts: T
): Promise<{ address: string; wallet: Wallet } & T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: any = { address };
  for (const key of Object.keys(contracts)) {
    user[key] = contracts[key].connect(await ethers.getSigner(address));
  }
  const zkWeb3Provider = new zk.Provider(
    (network.config as HttpNetworkConfig).url
  );
  user.wallet = await getWalletFromAddress(user.address, zkWeb3Provider);

  return user as { address: string; wallet: Wallet } & T;
}

export type PromiseType<T> = T extends Promise<infer U> ? U : T;
