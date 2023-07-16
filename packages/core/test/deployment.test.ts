import { expect } from "chai";
import { deployment_fixture } from "./fixtures/paymaster.fixture";
import { PromiseType } from "./fixtures/utils";

import { ethers } from "hardhat";
import { Paymaster__factory } from "../typechain-types";
describe("deploy", () => {
  type Fixture = PromiseType<ReturnType<typeof deployment_fixture>>;

  let deployer: Fixture["deployer"];
  let alice: Fixture["users"][number];

  before(async () => {
    ({
      deployer,
      users: [alice],
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
      alice.ERC20.interface.functions["approve(address,uint256)"]
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
  });
});
