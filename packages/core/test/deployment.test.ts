import { expect } from "chai";
import { deployment_fixture } from "./fixtures/paymaster.fixture";
import { PromiseType } from "./fixtures/utils";

import { ethers } from "hardhat";
import { Paymaster__factory } from "../typechain-types";
import { utils } from "zksync-web3";
describe("deploy", () => {
  type Fixture = PromiseType<ReturnType<typeof deployment_fixture>>;

  let deployer: Fixture["deployer"];
  let alice: Fixture["users"][number];
  let bob: Fixture["users"][number];

  before(async () => {
    ({
      deployer,
      users: [alice, bob],
    } = await deployment_fixture());
  });

  it("test deploy", async () => {
    const tx = await deployer.Registry.createPaymaster(0);
    const r = await tx.wait();
    const provider = deployer.Registry.provider;

    const createdEvent = r.events?.filter(
      (e) => e.event === "CreatePaymaster"
    )?.[0];

    expect(createdEvent).to.not.be.undefined;
    const paymasterAddress = (createdEvent?.args as any).paymaster;

    console.log(`Paymaster address: ${paymasterAddress}`);
    let paymasterBalance = await provider.getBalance(paymasterAddress);
    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

    console.log("Funding paymaster with ETH");

    await (
      await alice.wallet.sendTransaction({
        to: paymasterAddress,
        value: ethers.utils.parseEther("0.1"),
      })
    ).wait();

    paymasterBalance = await provider.getBalance(paymasterAddress);
    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);

    const Paymaster = (
      await ethers.getContractFactory<Paymaster__factory>("Paymaster")
    ).attach(paymasterAddress);

    const selector = alice.ERC20.interface.getSighash(
      alice.ERC20.interface.functions["mint(address,uint256)"]
    );
    console.log(selector);
    const tx_1 = await Paymaster.setAllowedContracts(
      [alice.ERC20.address],
      [selector],
      [true]
    );
    const r_1 = await tx_1.wait();
    console.log(r_1);
    console.log(JSON.stringify(r_1));

    const paymasterParams = utils.getPaymasterParams(paymasterAddress, {
      type: "General",
      // token: alice.ERC20.address,
      // set minimalAllowance as we defined in the paymaster contract
      // minimalAllowance: ethers.BigNumber.from(1),
      // empty bytes as testnet paymaster does not use innerInput
      innerInput: new Uint8Array(),
    });

    const gasLimit = await bob.ERC20.connect(bob.wallet).estimateGas.mint(
      bob.address,
      5,
      {
        customData: {
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
          paymasterParams: paymasterParams,
        },
      }
    );

    const gasPrice = await provider.getGasPrice();
    const fee = gasPrice.mul(gasLimit.toString());
    console.log("Transaction fee estimation is :>> ", fee.toString());

    const r_2 = await (
      await bob.ERC20.connect(bob.wallet).mint(bob.address, 5, {
        // paymaster info
        customData: {
          paymasterParams: paymasterParams,
          gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        },
      })
    ).wait();
    console.log(r_2);
    console.log(JSON.stringify(r_2));

    paymasterBalance = await provider.getBalance(paymasterAddress);
    console.log(`Paymaster ETH balance is now ${paymasterBalance.toString()}`);
  });
});
